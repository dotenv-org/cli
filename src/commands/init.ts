import {Command, flags} from '@oclif/command'
import {vars} from '../vars'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'

export default class Init extends Command {
  static description = 'initialize .env.me and .env.project'

  static flags = {}
  static args = []

  async run() {
    const {args, flags} = this.parse(Init)

    const fs = require('fs')
    const path = require('path')
    const axios = require('axios')
    const dotenv = require('dotenv')
    const crypto = require('crypto')
    const signale = require('signale')
    const prompts = require('prompts')

    const dir = process.cwd()

    const dotenvFilename = '.env'
    const dotenvData = 'KEY=value'

    const meUid = crypto.randomBytes(32).toString('hex') // 64 length
    const meFilename = '.env.me'
    const meData = 'DOTENV_ME=me_' + meUid

    const projectUid = crypto.randomBytes(32).toString('hex') // 64 length
    const projectFilename = '.env.project'
    const projectName = dir.split("/")[dir.split("/").length-1]
    const projectData = 'DOTENV_PROJECT=prj_' + projectUid + "\n" + 'DOTENV_PROJECT_NAME=' + projectName

    function logExisting(filename) {
      signale.complete(filename + ' exists')
    }

    function logCreating(filename) {
      signale.complete(filename + ' created')
    }

		// 1. create gitignore
		new AppendToGitignoreService().run()

    if (fs.existsSync(dotenvFilename)) {
      logExisting(dotenvFilename)
    } else {
      fs.writeFileSync(dotenvFilename, dotenvData)
      logCreating(dotenvFilename)
    }

    if (fs.existsSync(meFilename)) {
      logExisting(meFilename)
    } else {
      fs.writeFileSync(meFilename, meData)
      logCreating(meFilename)
    }

    if (fs.existsSync(projectFilename)) {
      logExisting(projectFilename)
    } else {
      fs.writeFileSync(projectFilename, projectData)
      logCreating(projectFilename)
    }


    const promptForShortCode = async () => {
      const response = await prompts({
        type: 'text',
        name: 'value',
        message: 'What is the code?',
      })

      signale.await('verifying that code.')

      // submit shortCode for verification
      const envMe = dotenv.config({ path: '.env.me' })
      const envProject = dotenv.config({ path: '.env.project' })

      const url = vars.apiUrl + '/v1/verify'
      const data = {
        'shortCode': response.value,
        'projectUid': envProject.parsed['DOTENV_PROJECT'],
        'meUid': envMe.parsed['DOTENV_ME']
      }
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: data,
        url
      }
      axios(options)
      .then(function (response) {
        signale.complete('verified code.')
      })
      .catch(function (error) {
        if (error.response) {
          signale.fatal(error.response.data)
        } else {
          signale.fatal(error)
        }
      })
    }

    const promptForEmail = async () => {
      const response = await prompts({
        type: 'text',
        name: 'value',
        message: 'What is your email address?'
      })

      signale.await('sending a code.')

      const envMe = dotenv.config({ path: '.env.me' })
      const envProject = dotenv.config({ path: '.env.project' })

      // submit email for identification
      const url = vars.apiUrl + '/v1/init'
      const data = {
        'email': response.value,
        'projectUid': envProject.parsed['DOTENV_PROJECT'],
        'meUid': envMe.parsed['DOTENV_ME'],
        'projectName': envProject.parsed['DOTENV_PROJECT_NAME'] // optional
      }
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: data,
        url
      }
      axios(options)
      .then(function (response) {
        signale.complete('sent. check your email.')

        promptForShortCode()
      })
      .catch(function (error) {
        if (error.response) {
          signale.fatal(error.response.data)
        } else {
          signale.fatal(error)
        }
      })
    }

    // prompt for email
    promptForEmail()
  }
}

import {Command, flags} from '@oclif/command'

export default class Pull extends Command {
  static description = 'pull .env'

  static flags = {}
  static args = []

  async run() {
    const {args, flags} = this.parse(Pull)

    const dotenvUrl = process.env.DOTENV_URL || 'https://cli.dotenv.org'

    const fs = require('fs')
    const axios = require('axios')
    const dotenv = require('dotenv')
    const signale = require('signale')
    const gitDiff = require('git-diff')

    signale.wait('pulling…')

    const envProject = dotenv.config({ path: '.env.project' })
    const envMe = dotenv.config({ path: '.env.me' })

    const url = dotenvUrl + '/v1/pull'
    const data = {
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
      if (response.data.data.dotenv) {
        const oldData = fs.readFileSync('.env', 'UTF-8')
        const newData = response.data.data.dotenv

        fs.writeFileSync('.env', newData)

        const diff = gitDiff(oldData, newData)
        if (diff) {
          signale.success("pulled changes.\n\n" + diff)
        } else {
          signale.success('no changes.')
        }
      }
    })
    .catch(function (error) {
      if (error.response) {
        signale.fatal(error.response.data)
      } else {
        signale.fatal(error)
      }
    })

  }
}

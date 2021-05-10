import {Command, flags} from '@oclif/command'
import {vars} from '../vars'

export default class Push extends Command {
  static description = 'push .env'

  static flags = {}
  static args = []

  async run() {
    const {args, flags} = this.parse(Push)

    const fs = require('fs')
    const axios = require('axios')
    const dotenv = require('dotenv')
    const signale = require('signale')

    signale.wait('pushing…')

    const envProject = dotenv.config({ path: '.env.project' })
    const envMe = dotenv.config({ path: '.env.me' })

    const url = vars.apiUrl + '/v1/push'
    const data = {
      'projectUid': envProject.parsed['DOTENV_PROJECT'],
      'meUid': envMe.parsed['DOTENV_ME'],
      'dotenv': fs.readFileSync('.env', 'UTF-8')
    }
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: data,
      url
    }
    axios(options)
    .then(function (response) {
      signale.success('pushed.')
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

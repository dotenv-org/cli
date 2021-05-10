import * as fs from 'fs'
import * as dotenv from 'dotenv'
import * as signale from 'signale'
const axios = require('axios')

import {vars} from '../vars'

class PushService {
  async run() {
    signale.wait('pushing…')

    axios(this._pushOptions)
    .then(_response => {
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

  get _pushOptions() {
    const url = vars.apiUrl + '/v1/push'
    const data = {
      projectUid: this._DOTENV_PROJECT,
      meUid: this._DOTENV_ME,
      dotenv: fs.readFileSync('.env', 'UTF-8'),
    }
    const options = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: data,
      url,
    }

    return options
  }

  get _envMe() {
    return dotenv.config({path: '.env.me'})
  }

  get _envProject() {
    return dotenv.config({path: '.env.project'})
  }

  get _DOTENV_ME() {
    return (this._envMe.parsed || {}).DOTENV_ME
  }

  get _DOTENV_PROJECT() {
    return (this._envProject.parsed || {}).DOTENV_PROJECT
  }
}

export {PushService}

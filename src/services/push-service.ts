import * as fs from 'fs'
import * as dotenv from 'dotenv'
import * as prompts from 'prompts'
import * as signale from 'signale'
const axios = require('axios')

import {vars} from '../vars'
import {WriteEnvMeService} from '../services/write-env-me-service'

class PushService {
  filename: string

  dotenv_me: string

  constructor(filename: string, dotenv_me: string) {
    this.filename = filename
    this.dotenv_me = dotenv_me
  }

  async run() {
    if (this._missingMeFile) {
      await new WriteEnvMeService().run()

      this._auth()
    } else {
      this._push()
    }
  }

  async _push() {
    console.log('remote:')
    console.log(`remote: Securely pushing ${this._smartPushMessage}`)
    console.log('remote:')

    axios(this._pushOptions)
    .then(_response => {
      console.log('Changes pushed.')
    })
    .catch(function (error) {
      if (error.response) {
        signale.fatal(error.response.data.errors[0].message)
      } else {
        signale.fatal(error)
      }
    })
  }

  async _auth() {
    const response = await prompts({
      type: 'text',
      name: 'value',
      message: 'What is your email address?',
    })

    signale.await('sending a code.')

    // submit email for identification
    axios(this._authOptions(response.value))
    .then(_response => {
      signale.complete('sent. check your email.')

      this._promptForShortCode()
    })
    .catch(function (error) {
      if (error.response) {
        signale.fatal(error.response.data)
      } else {
        signale.fatal(error)
      }
    })
  }

  async _promptForShortCode() {
    const response = await prompts({
      type: 'text',
      name: 'value',
      message: 'What is the code?',
    })

    signale.await('verifying that code.')

    // submit shortCode for verification
    axios(this._verifyOptions(response.value))
    .then(_response => {
      signale.success('verified code.')

      this._push()
    })
    .catch(function (error) {
      if (error.response) {
        signale.fatal(error.response.data)
      } else {
        signale.fatal(error)
      }
    })
  }

  _authOptions(email) {
    const url = vars.apiUrl + '/v1/auth'
    const data = {
      email: email,
      projectUid: this._DOTENV_PROJECT,
      meUid: this._DOTENV_ME,
      projectName: this._DOTENV_PROJECT_NAME, // optional
    }
    const options = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: data,
      url,
    }

    return options
  }

  _verifyOptions(shortCode) {
    const url = vars.apiUrl + '/v1/verify'
    const data = {
      shortCode: shortCode,
      projectUid: this._DOTENV_PROJECT,
      meUid: this._DOTENV_ME,
    }
    const options = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: data,
      url,
    }

    return options
  }

  get _pushOptions() {
    const url = vars.apiUrl + '/v1/push'
    const data = {
      projectUid: this._DOTENV_PROJECT,
      meUid: this._DOTENV_ME,
      dotenv: fs.readFileSync(this._envFileName, 'UTF-8'),
    }
    const options = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      data: data,
      url,
    }

    return options
  }

  get _envFileName() {
    return this._envInputFileName
  }

  get _envInputFileName() {
    // if user has set a filename for input then use that
    if (this.filename) {
      return this.filename
    }

    return '.env'
  }

  get _envMe() {
    return dotenv.config({path: '.env.me'})
  }

  get _envProject() {
    return dotenv.config({path: '.env.project'})
  }

  get _DOTENV_ME() {
    if (this.dotenv_me && this.dotenv_me.length > 0) {
      return this.dotenv_me
    }

    return (this._envMe.parsed || {}).DOTENV_ME
  }

  get _DOTENV_PROJECT() {
    return (this._envProject.parsed || {}).DOTENV_PROJECT
  }

  get _DOTENV_PROJECT_NAME() {
    return (this._envProject.parsed || {}).DOTENV_PROJECT_NAME
  }

  get _smartPushMessage() {
    if (this.filename) {
      return `${this._envFileName}`
    }

    return this._envFileName
  }

  get _missingMeFile() {
    // dont' require .env.me if passing dotenv_me as flag
    if (this.dotenv_me && this.dotenv_me.length > 0) {
      return false
    }

    return !fs.existsSync('.env.me')
  }
}

export {PushService}

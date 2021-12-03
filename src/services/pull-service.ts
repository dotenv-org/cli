import * as fs from 'fs'
import * as dotenv from 'dotenv'
import * as prompts from 'prompts'
import * as signale from 'signale'
import * as gitDiff from 'git-diff'
const axios = require('axios')

import {vars} from '../vars'
import {WriteEnvMeService} from '../services/write-env-me-service'
import {WriteEnvService} from '../services/write-env-service'

class PullService {
  async run() {
    const meFile = '.env.me'

    if (fs.existsSync(meFile)) {
      this._pull()
    } else {
      await new WriteEnvMeService().run()

      this._auth()
    }
  }

  async _pull() {
    // eslint-disable-next-line no-console
    console.log('remote:')
    // eslint-disable-next-line no-console
    console.log('remote: Securely pulling .env')
    // eslint-disable-next-line no-console
    console.log('remote:')

    axios(this._pullOptions)
    .then(response => {
      if (response.data.data.dotenv) {
        new WriteEnvService({quiet: true}).run()

        const oldData = fs.readFileSync('.env', 'UTF-8')
        const newData = response.data.data.dotenv

        fs.writeFileSync('.env', newData)

        const diff = gitDiff(oldData, newData)
        if (diff) {
          // eslint-disable-next-line no-console
          console.log('Updated.\n\n' + diff)
        } else {
          // eslint-disable-next-line no-console
          console.log('Already up to date.')
        }
      }

      // eslint-disable-next-line no-console
      console.log('Done.')
    })
    .catch(function (error) {
      if (error.response) {
        signale.fatal(error.response.data)
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

      this._pull()
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

  get _pullOptions() {
    const url = vars.apiUrl + '/v1/pull'
    const data = {
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

  get _DOTENV_PROJECT_NAME() {
    return (this._envProject.parsed || {}).DOTENV_PROJECT_NAME
  }
}

export {PullService}

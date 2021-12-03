import * as fs from 'fs'
import * as prompts from 'prompts'
import * as signale from 'signale'
import * as dotenv from 'dotenv'
const axios = require('axios')

import {vars} from '../vars'
import {WriteEnvMeService} from '../services/write-env-me-service'

class VerifyIfMissingEnvMeService {
  async run() {
    const meFile = '.env.me'

    if (!fs.existsSync(meFile)) {
      await new WriteEnvMeService().run()

      const response = await prompts({
        type: 'text',
        name: 'value',
        message: 'What is your email address?',
      })

      signale.await('sending a code.')

      // submit email for identification
      axios(this._initOptions(response.value))
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
    .then(response => {
      signale.success('verified code.')
      signale.log(`\nYou can view your project at ${response.data.data.loginUrl} (url expires in 5 minutes)`)
    })
    .catch(function (error) {
      if (error.response) {
        signale.fatal(error.response.data)
      } else {
        signale.fatal(error)
      }
    })
  }

  _initOptions(email) {
    const url = vars.apiUrl + '/v1/init'
    const data = {
      organizationSlug: this.organizationSlug,
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

export {VerifyIfMissingEnvMeService}

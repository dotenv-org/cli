import * as fs from 'fs'
import * as dotenv from 'dotenv'
import * as signale from 'signale'
import * as gitDiff from 'git-diff'
const axios = require('axios')

import {vars} from '../vars'

class PullService {
  async run() {
    signale.wait('pulling…')

    axios(this._pullOptions)
    .then(response => {
      if (response.data.data.dotenv) {
        const oldData = fs.readFileSync('.env', 'UTF-8')
        const newData = response.data.data.dotenv

        fs.writeFileSync('.env', newData)

        const diff = gitDiff(oldData, newData)
        if (diff) {
          signale.success('pulled changes.\n\n' + diff)
        } else {
          signale.success('no changes.')
        }
      }

      signale.success('pulled.')
    })
    .catch(function (error) {
      if (error.response) {
        signale.fatal(error.response.data)
      } else {
        signale.fatal(error)
      }
    })
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
    return this._envMe.parsed.DOTENV_ME
  }

  get _DOTENV_PROJECT() {
    return this._envProject.parsed.DOTENV_PROJECT
  }
}

export {PullService}

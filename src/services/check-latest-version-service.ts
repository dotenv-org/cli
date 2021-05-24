import * as signale from 'signale'
const axios = require('axios')
const packageJson = require('../../package.json')

import {vars} from '../vars'

class CheckLatestVersionService {
  async run() {
    let res = await axios(this._versionOptions)

    if (res.status == 200) {
      if (packageJson.version != res.data) {
        signale.note('New version available. Run npm install @dotenv/cli')
      }
    }
  }

  get _versionOptions() {
    const url = vars.apiUrl + '/v1/version'

    const options = {
      method: 'GET',
      data: {},
      url,
    }

    return options
  }
}

export {CheckLatestVersionService}

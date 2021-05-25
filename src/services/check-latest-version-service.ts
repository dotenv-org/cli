import * as compareVersions from 'compare-versions'
const axios = require('axios')
const packageJson = require('../../package.json')

import {vars} from '../vars'

class CheckLatestVersionService {
  async run() {
    const resp = await axios(this._versionOptions)

    if (resp.status === 200) {
      if (compareVersions.compare(resp.data, packageJson.version, '>')) {
        // eslint-disable-next-line no-console
        console.log('New version of dotenv-cli now available')
        // eslint-disable-next-line no-console
        console.log('    Run `npm install @dotenv/cli -g` to install')
        // eslint-disable-next-line no-console
        console.log('')
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

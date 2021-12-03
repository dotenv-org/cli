import * as fs from 'fs'
import * as signale from 'signale'

interface WarnIfEnvProjectDoesNotExistServiceParams {
  _this;
}

class WarnIfEnvProjectDoesNotExistService {
  public _this;

  constructor(params: WarnIfEnvProjectDoesNotExistServiceParams = {} as WarnIfEnvProjectDoesNotExistServiceParams) {
    this._this = params._this
  }

  async run() {
    const projectFile = '.env.project'

    // 1. write .env.project
    if (!fs.existsSync(projectFile)) {
      signale.fatal('Missing .env.project. To create it, run the command: dotenv-cli init')

      this._this.exit(1)
    }
  }
}

export {WarnIfEnvProjectDoesNotExistService}

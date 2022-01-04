import * as fs from 'fs'
import * as signale from 'signale'

interface WarnIfEnvDoesNotExistServiceParams {
  _this;
}

class WarnIfEnvDoesNotExistService {
  public _this;

  constructor(params: WarnIfEnvDoesNotExistServiceParams = {} as WarnIfEnvDoesNotExistServiceParams) {
    this._this = params._this
  }

  async run() {
    const envFile = '.env'

    // 1. write .env.project
    if (!fs.existsSync(envFile)) {
      signale.fatal('Missing .env. To create it, run \'echo "KEY=VALUE" > .env\' (or maybe you meant to run dotenv-cli pull?)')

      this._this.exit(1)
    }
  }
}

export {WarnIfEnvDoesNotExistService}

import * as fs from 'fs'
import * as signale from 'signale'

interface WarnIfEnvDoesNotExistServiceParams {
  _this;
  filename;
}

class WarnIfEnvDoesNotExistService {
  public _this;

  public filename;

  constructor(params: WarnIfEnvDoesNotExistServiceParams = {} as WarnIfEnvDoesNotExistServiceParams) {
    this._this = params._this
    this.filename = params.filename
  }

  async run() {
    const envFile = this._envFileName

    if (!fs.existsSync(envFile)) {
      signale.fatal(`Missing ${envFile}. To create it, run 'echo "KEY=VALUE" > .env' (or maybe you meant to run dotenv-cli pull?)`)

      this._this.exit(1)
    }
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
}

export {WarnIfEnvDoesNotExistService}

import * as fs from 'fs'
import * as signale from 'signale'

interface WriteEnvServiceParams {
  quiet?: boolean;
}

class WriteEnvService {
  public quiet?: boolean;

  constructor(params: WriteEnvServiceParams = {} as WriteEnvServiceParams) {
    const {quiet = false} = params

    this.quiet = quiet
  }

  run() {
    const dotenvFile = '.env'
    const dotenvData = `# added by dotenv - do not commit this file to code
KEY=value`

    // 1. write .env
    if (fs.existsSync(dotenvFile)) {
      if (!this.quiet) {
        signale.success('Existing .env.')
      }
    } else {
      fs.writeFileSync(dotenvFile, dotenvData)
      signale.success('Created .env.')
    }
  }
}

export {WriteEnvService}

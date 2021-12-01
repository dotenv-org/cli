import * as fs from 'fs'
import * as crypto from 'crypto'
import * as signale from 'signale'

interface WriteEnvMeServiceParams {
  quiet?: boolean;
}

class WriteEnvMeService {
  public quiet?: boolean;

  constructor(params: WriteEnvMeServiceParams = {} as WriteEnvMeServiceParams) {
    const {quiet = false} = params

    this.quiet = quiet
  }

  run() {
    const meUid = crypto.randomBytes(32).toString('hex') // 64 length
    const meFile = '.env.me'
    const meData = `# added by dotenv - do not commit this file to code
# this file uniquely identifies you for this project
# keep it safe, but if you lose it or expose it publicly, you can always generate a new one at dotenv.org
DOTENV_ME=me_${meUid}`

    // 1. write .env.me
    if (fs.existsSync(meFile)) {
      if (!this.quiet) {
        signale.success('Existing .env.me.')
      }
    } else {
      fs.writeFileSync(meFile, meData)
      signale.success('Created .env.me.')
    }
  }
}

export {WriteEnvMeService}

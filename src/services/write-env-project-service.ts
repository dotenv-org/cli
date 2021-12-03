import * as fs from 'fs'
import * as crypto from 'crypto'
import * as signale from 'signale'

interface WriteEnvProjectServiceParams {
  quiet?: boolean;
}

class WriteEnvProjectService {
  public quiet?: boolean;

  constructor(params: WriteEnvProjectServiceParams = {} as WriteEnvProjectServiceParams) {
    const {quiet = false} = params

    this.quiet = quiet
  }

  run() {
    const dir = process.cwd()

    const projectUid = crypto.randomBytes(32).toString('hex') // 64 length
    const projectFile = '.env.project'

    const splitDir = dir.split('\\').join('/').split('/') // handle windows and unix paths
    const projectName = splitDir[splitDir.length - 1]
    const projectData = `# added by dotenv - you SHOULD commit this file to code
# this file uniquely identifies your project at dotenv.org
DOTENV_PROJECT=prj_${projectUid}
DOTENV_PROJECT_NAME=${projectName}`

    // 1. write .env.project
    if (fs.existsSync(projectFile)) {
      if (!this.quiet) {
        signale.success('Existing .env.project.')
      }
    } else {
      fs.writeFileSync(projectFile, projectData)
      signale.success('Created .env.project.')
    }
  }
}

export {WriteEnvProjectService}

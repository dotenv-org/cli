import {Command} from '@oclif/command'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {WriteEnvsService} from '../services/write-envs-service'
import {VerifyService} from '../services/verify-service'
import {CheckLatestVersionService} from '../services/check-latest-version-service'

export default class Init extends Command {
  static description = 'initialize .env.me and .env.project'

  async run() {
    // 0. check latest version
    await new CheckLatestVersionService().run()

    // 1. create gitignore
    new AppendToGitignoreService().run()

    // 2. create envs
    new WriteEnvsService().run()

    // 3. verify
    new VerifyService().run()
  }
}

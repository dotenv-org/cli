import {Command} from '@oclif/command'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {WriteEnvsService} from '../services/write-envs-service'
import {VerifyService} from '../services/verify-service'
import {CheckLatestVersionService} from '../services/check-latest-version-service'

export default class Init extends Command {
  static description = 'DEPRECATED: initialize .env.me and .env.project'

  static args = [
    {name: 'organizationSlug'},
  ]

  async run() {
    const {args} = this.parse(Init)

    // 0. check latest version
    await new CheckLatestVersionService().run()

    // Deprecation notice
    console.log('DEPRECATION NOTICE: \'dotenv-cli init\' is deprecated. Going forward, run \'dotenv-cli new\' instead.')

    // 1. create gitignore
    new AppendToGitignoreService().run()

    // 2. create envs
    new WriteEnvsService().run()

    // 3. verify
    new VerifyService(args.organizationSlug).run()
  }
}

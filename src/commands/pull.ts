import {Command} from '@oclif/command'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {WarnIfEnvProjectDoesNotExistService} from '../services/warn-if-env-project-does-not-exist-service'
import {PullService} from '../services/pull-service'
import {CheckLatestVersionService} from '../services/check-latest-version-service'

export default class Pull extends Command {
  static description = 'pull .env'

  static args = [
    {
      name: 'environment',
      required: false,
      description: 'Pull .env.ci, .env.staging, and .env.production',
      hidden: false,
      default: 'development',
      options: ['development', 'ci', 'staging', 'production']
    },
    {
      name: 'filename',
      required: false,
      description: 'Set output filename. Defaults to .env for development and .env.${environment} for other environments',
      hidden: false
    }
  ]

  async run() {
    const {argv} = this.parse(Pull)

    // 0. check latest version
    await new CheckLatestVersionService().run()

    // 1. create gitignore
    await new AppendToGitignoreService().run()

    // 2. check if .env.project file exists
    await new WarnIfEnvProjectDoesNotExistService({_this: this}).run()

    // 3. pull
    await new PullService(argv[0], argv[1]).run()
  }
}

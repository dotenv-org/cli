import {Command, flags} from '@oclif/command'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {WarnIfEnvProjectDoesNotExistService} from '../services/warn-if-env-project-does-not-exist-service'
import {WarnIfEnvDoesNotExistService} from '../services/warn-if-env-does-not-exist-service'
import {PushService} from '../services/push-service'
import {CheckLatestVersionService} from '../services/check-latest-version-service'

export default class Push extends Command {
  static description = 'push .env'

  static args = [
    {
      name: 'filename',
      required: false,
      description: 'Set input filename. Defaults to .env for development and .env.{environment} for other environments',
      hidden: false,
    },
  ]

  static flags = {
    dotenv_me: flags.string({
      char: 'm',
      description: 'pass value for .env.me rather than reading from .env.me file',
      hidden: false,
      multiple: false,
      env: 'DOTENV_ME',
      required: false,
    }),
  }

  async run() {
    const {argv, flags} = this.parse(Push)

    // 0. check latest version
    await new CheckLatestVersionService().run()

    // 1. create gitignore
    await new AppendToGitignoreService().run()

    // 2. check if .env.project & .env files exists
    await new WarnIfEnvProjectDoesNotExistService({_this: this}).run()
    await new WarnIfEnvDoesNotExistService({_this: this, filename: argv[0]}).run()

    // 3. push
    await new PushService(argv[0], flags.dotenv_me || '').run()
  }
}

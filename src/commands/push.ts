import {Command} from '@oclif/command'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {WriteEnvsService} from '../services/write-envs-service'
import {WarnIfEnvProjectDoesNotExistService} from '../services/warn-if-env-project-does-not-exist-service'
import {PushService} from '../services/push-service'
import {CheckLatestVersionService} from '../services/check-latest-version-service'

export default class Push extends Command {
  static description = 'push .env'

  async run() {
    // 0. check latest version
    await new CheckLatestVersionService().run()

    // 1. create gitignore
    new AppendToGitignoreService().run()

    // 2. check if .env.project file exists
    new WarnIfEnvProjectDoesNotExistService({_this: this}).run()

    // 3. create envs
    new WriteEnvsService({quiet: true}).run()

    // 4. push
    new PushService().run()
  }
}

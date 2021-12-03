import {Command} from '@oclif/command'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {WarnIfEnvProjectDoesNotExistService} from '../services/warn-if-env-project-does-not-exist-service'
import {PullService} from '../services/pull-service'
import {CheckLatestVersionService} from '../services/check-latest-version-service'

export default class Pull extends Command {
  static description = 'pull .env'

  async run() {
    // 0. check latest version
    await new CheckLatestVersionService().run()

    // 1. create gitignore
    await new AppendToGitignoreService().run()

    // 2. check if .env.project file exists
    await new WarnIfEnvProjectDoesNotExistService({_this: this}).run()

    // 3. pull
    await new PullService().run()
  }
}

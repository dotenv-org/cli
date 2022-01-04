import {Command} from '@oclif/command'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {WriteEnvsService} from '../services/write-envs-service'
import {CheckLatestVersionService} from '../services/check-latest-version-service'
import {OutputNewProjectLinkService} from '../services/output-new-project-link-service'

export default class New extends Command {
  static description = 'create .env.project file'

  async run() {
    // 0. check latest version
    await new CheckLatestVersionService().run()

    // 1. create gitignore
    new AppendToGitignoreService().run()

    // 2. Output new link
    new OutputNewProjectLinkService().run()
  }
}

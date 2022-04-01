import {Command} from '@oclif/command'
import {AppendToGitignoreService} from '../services/append-to-gitignore-service'
import {OutputNewProjectLinkService} from '../services/output-new-project-link-service'
import {DeprecationService} from '../services/deprecation-service'

export default class New extends Command {
  static description = 'create .env.project file'

  async run() {
    new DeprecationService().run('new')

    // 1. create gitignore
    new AppendToGitignoreService().run()

    // 2. Output new link
    new OutputNewProjectLinkService().run()
  }
}

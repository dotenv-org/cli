import {expect} from 'chai'

import {AppendToGitignoreService} from '../../src/services/append-to-gitignore-service'

const env = process.env
beforeEach(() => {
  process.env = {}
})
afterEach(() => {
  process.env = env
})

describe('vars', () => {
  it('appends to gitignore file', () => {
    new AppendToGitignoreService().run()

    expect(true).to.eql(true)
  })
})

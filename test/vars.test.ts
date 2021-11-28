import {expect} from 'chai'
import process from 'process'
import {vars} from '../src/vars'

const env = process.env
beforeEach(() => {
  process.env = {}
})
afterEach(() => {
  process.env = env
})

describe('vars', () => {
  it('sets vars by default', () => {
    expect(vars.apiUrl).to.equal('https://cli.dotenv.org')
  })

  it('respects DOTENV_API_URL', () => {
    process.env.DOTENV_API_URL = 'https://cli.dotenv.development'
    expect(vars.apiUrl).to.equal('https://cli.dotenv.development')
  })
})

import process from 'process'

export class Vars {
  get apiUrl(): string {
    return process.env.DOTENV_API_URL || 'https://cli.dotenv.org'
  }
}

export const vars = new Vars()

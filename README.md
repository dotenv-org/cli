# @dotenv/cli

<img src="https://raw.githubusercontent.com/dotenv-org/cli/master/dotenv-cli.png" alt="@dotenv/cli" align="right" />

Dotenv cli is a command line tool that syncs your `.env` files across machines and between your team members. It's like 1Password, but for developers. Designed by the same people that brought you [dotenv](https://github.com/motdotla/dotenv), it's a recommended plugin for [dotenv](https://github.com/motdotla/dotenv).

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@dotenv/cli.svg)](https://npmjs.org/package/@dotenv/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@dotenv/cli.svg)](https://npmjs.org/package/@dotenv/cli)
[![License](https://img.shields.io/npm/l/@dotenv/cli.svg)](https://github.com/dotenv-org/cli/blob/master/package.json)

## Install

```bash
# install globally (recommended)
npm install @dotenv/cli -g # optionally run with sudo npm install @dotenv/cli -g
```

or

```bash
# install locally
npm install @dotenv/cli --save-dev
```

## Usage

Usage is easy! Run the command:

```bash
dotenv-cli new
```

Follow those instructions and then run:

```bash
dotenv-cli push
```

And if you need to pull changes that another teammate made, run:

```bash
dotenv-cli pull
```

That's it!

## Commands

### `dotenv-cli help [COMMAND]`

display help for dotenv-cli

```
USAGE
  $ dotenv-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

### `dotenv-cli pull [ENVIRONMENT] [FILENAME]`

By default `dotenv-cli pull` will pull your development environment to `.env`.

Want to pull your staging secrets? Run..

```bash
dotenv-cli pull staging
```

Want to pull your production secrets but output them to `.env`. Run..

```bash
dotenv-cli pull production .env
```

## Development

```
NODE_TLS_REJECT_UNAUTHORIZED=0 DOTENV_API_URL=https://cli.dotenv.development ./bin/run
```

### Testing

```
yarn test
```

### Publishing

Only for those with permission.

```
npm publish
```

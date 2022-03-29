<p align="center">
<strong>Warning ⚠️</strong><br/>This CLI is deprecated. Please use the new and improved <a href="https://github.com/dotenv-org/dotenv-vault">dotenv-vault cli</a>.</a>
</p>

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

### `dotenv-cli new`

Create your `.env.project` file.

Example:

```bash
$ dotenv-cli new
```

### `dotenv-cli push [FILENAME]`

Push your `.env` file to development environment.

Example:

```bash
$ dotenv-cli push
# pushes local .env to remote development
```

#### Arguments

##### [FILENAME]

Set input filename. Defaults to .env.

Example:

```bash
$ dotenv-cli push .env.development
# pushes .env.development to remote development environment
```

#### Options

##### --dotenv_me

Directly pass your `DOTENV_ME` value to the command line, instead of reading from a `.env.me` file.

Examples:

```bash
$ dotenv-cli push .env.development --dotenv_me=me_1234
# pushes local .env.development to remote development
```

### `dotenv-cli pull [ENVIRONMENT] [FILENAME]`

Pulls your development|staging|ci|production environment(s) to your machine.

Example:

```bash
$ dotenv-cli pull
# pulls remote development envs to .env
```

For more information run..

```bash
$ dotenv-cli help pull
```

#### Arguments

##### [ENVIRONMENT]

Pull .env.ci, .env.staging, and .env.production

Example:

```bash
$ dotenv-cli pull staging
# pulls remote staging envs to .env.staging
```

##### [FILENAME]

Set output filename. Defaults to .env for development and .env.{environment} for other environments

Example:

```bash
$ dotenv-cli pull production .env
# pulls remote production envs to .env
```

#### Options

##### --dotenv_me

Directly pass your `DOTENV_ME` value to the command line, instead of reading from a `.env.me` file.

Examples:

```bash
$ dotenv-cli pull staging --dotenv_me=me_1234
# pulls remote staging envs to .env.staging

$ dotenv-cli pull production .env --dotenv_me=me_1234
# pulls remote production envs to .env
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

## Contributing Guide

See [CONTRIBUTING.md](CONTRIBUTING.md)

## CHANGELOG

See [CHANGELOG.md](CHANGELOG.md)

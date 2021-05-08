# dotenv-me

<img src="https://raw.githubusercontent.com/motdotla/dotenv-me/master/dotenv-me.png" alt="dotenv-me" align="right" />

Dotenv Me is a command line tool that syncs your `.env` files across machines and between your team members. It's like GitHub for developer secrets. Designed by the same people that brought you [dotenv](https://github.com/motdotla/dotenv), it's a completely optional (but recommended) plugin for [dotenv](https://github.com/motdotla/dotenv).

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dotenv-me.svg)](https://npmjs.org/package/dotenv-me)
[![CircleCI](https://circleci.com/gh/motdotla/dotenv-me/tree/master.svg?style=shield)](https://circleci.com/gh/motdotla/dotenv-me/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/dotenv-me.svg)](https://npmjs.org/package/dotenv-me)
[![License](https://img.shields.io/npm/l/dotenv-me.svg)](https://github.com/motdotla/dotenv-me/blob/master/package.json)

## Install

```bash
# install globally
npm install dotenv-me -g # optionally run with sudo npm install dotenv-me -g
```

## Usage

In your terminal, initialize dotenv-me the same way you initialized
git.

```bash
dotenv-me init
```

This will create a `.env` file (if it doesn't already exists), a 
`.env.project`, and `.env.me` file.

Make changes to your `.env` file and when you do, run:

```bash
dotenv-me push
```

If you need to pull changes that another teammate made, run:

```bash
dotenv-me pull
```

That's it!

## Commands

### `dotenv-me help [COMMAND]`

display help for dotenv-me

```
USAGE
  $ dotenv-me help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

### `dotenv-me init`

initialize .env.me and .env.project

```
USAGE
  $ dotenv-me init
```

_See code: [src/commands/init.ts](https://github.com/motdotla/dotenv-me/blob/v0.2.0/src/commands/init.ts)_

### `dotenv-me pull`

pull .env

```
USAGE
  $ dotenv-me pull
```

_See code: [src/commands/pull.ts](https://github.com/motdotla/dotenv-me/blob/v0.2.0/src/commands/pull.ts)_

### `dotenv-me push`

push .env

```
USAGE
  $ dotenv-me push
```

_See code: [src/commands/push.ts](https://github.com/motdotla/dotenv-me/blob/v0.2.0/src/commands/push.ts)_
<!-- commandsstop -->

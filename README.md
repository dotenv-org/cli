# @dotenv/cli

<img src="https://raw.githubusercontent.com/dotenv-org/cli/master/dotenv-cli.png" alt="@dotenv/cli" align="right" />

Dotenv cli is a command line tool that syncs your `.env` files across machines and between your team members. It's like GitHub for developer secrets. Designed by the same people that brought you [dotenv](https://github.com/motdotla/dotenv), it's a completely optional (but recommended) plugin for [dotenv](https://github.com/motdotla/dotenv).

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@dotenv/cli.svg)](https://npmjs.org/package/@dotenv/cli)
[![CircleCI](https://circleci.com/gh/dotenv-org/cli/tree/master.svg?style=shield)](https://circleci.com/gh/dotenv-org/cli/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/@dotenv/cli.svg)](https://npmjs.org/package/@dotenv/cli)
[![License](https://img.shields.io/npm/l/@dotenv/cli.svg)](https://github.com/dotenv-org/cli/blob/master/package.json)

## Install

```bash
# install globally
npm install @dotenv/cli -g # optionally run with sudo npm install @dotenv/cli -g
```

## Usage

In your terminal, initialize dotenv the same way you initialized
git.

```bash
dotenv-cli init
```

This will create a `.env` file (if it doesn't already exists), a 
`.env.project`, and `.env.me` file.

Make changes to your `.env` file and when you do, run:

```bash
dotenv-cli push
```

If you need to pull changes that another teammate made, run:

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

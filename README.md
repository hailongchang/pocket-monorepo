# Pocket Monorepo

This repo contains all the Pocket Typescript systems built as a monorepo but deployed as microservices. For services that power Recomendations or Pocket Curated Content see the [Content Monorepo](https://github.com/pocket/content-monorepo)

## What's inside?

This Repo includes the following packages/servers:

### Folder structure

- `servers`: all our typescript microservices required for running baseline Pocket.
- `lambdas`: all our lambda listeners that are made up of SQS Queue processers or API Gateways
- `infrastructure`: all of the terraform infrastructure that is used to deploy each microservice
- `packages/eslint-config-custom`: `eslint` configurations
- `packages/tsconfig`: `tsconfig.json`s used throughout the monorepo
- `packages/apollo-utils`: holds helpers for all services that boot up graphql. It also includes tracing libraries and hoists apollo in node-modules so that we do not have to keep defining apollo in all services.
- `packages/ts-logger`: helper library to add json structured logging to all our services.
- `packages/tracing`: helper library to add tracing to all our services.
- `packags/terraform-modules`: a set of modules built for Pocket based on the Terraform CDK, used to deploy our infrastructure.
- `.docker/aws-resources`: all aws resources that are used by the monorepo, if something is used here, but owned by a service not in this repository, it resides in the legacy files, otherwise each service will have its own script or prefixed resources.
- `.docker/mysql-8-resources`: all mysql resources, prefixed with a number letter system so that docker executes database creation in a specific order. All services share a single docker server, but have their own databases unless they read from our legacy (mono) database.
- `.docker/postgres-resources`: similar to mysql but for services that use postgres.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Using the Repo

To build all apps and packages, run the following command:

```bash
cd pocket-monorepo
pnpm build
```

### Develop

#### All

To develop all apps and packages, run the following commands:

```bash
cd pocket-monorepo
cp .env.example .env
docker compose up --wait
pnpm install
pnpm dev
```

This will bring up the docker shared services (MySQL, Memcached, Redis) and then run all the apps in a dev mode.

#### Specific Server

To run a specific server, run the following:

```bash
cd pocket-monorepo
cp .env.example .env
docker compose up --wait
pnpm install
pnpm dev --filter=annotations-api...
```

Where annotations-api is the server name from package.json you want to run. `...` prefixed informs turborepo to include all dependent workspace packages.

You can expand this to run multiple specific servers as well like:
```pnpm run dev --filter=list-api... --filter=feature-flags...```

### Caching

This repo relies on Turbo repos caching strategies to speed up development and only execute tasks that are needed when certain files change.

More information can be found on [Turbo repos site](https://turbo.build/repo/docs/core-concepts/caching).

If you add new build outputs or inputs, you will need to add them to the necessary area in [turbo.json](./turbo.json).

If for any reason you need to bypass caching you can add `--force` to any command. It would be run like:

```bash
pnpm run test --force
```

or

```bash
pnpm run test --filter=annocations-api... --force
```

### Testing

### Updating Packages

To update packages this repository uses Renovate on a pr by pr basis and you can initiate that [here](https://github.com/Pocket/pocket-monorepo/issues/7)

In some cases it may be easier to update packages locally, like updating all development depencies at once.

To select and update *development* dependencices, interactively you can use the following command ran at the root of the repository.

```bash
pnpm update -iDLr
```

To select and update *production* and *optional* dependencices, interactively you can use the following command ran at the root of the repository.

```bash
pnpm update -iPLr
```

### Integration Testing

When doing an integration test, if you need aws based resources, the CI is setup to run a `.sh` script that corresponds to the package name you are testing. So if you need aws resources for a package named `annotations-api` you would create a `annoations-api.sh` in `.docker/aws-resources` that created all the necessary aws resources.

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

## Service CI Status

[![Account Data Deleter](https://github.com/Pocket/pocket-monorepo/actions/workflows/account-data-deleter.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/account-data-deleter.yml)
[![Account Delete Monitor](https://github.com/Pocket/pocket-monorepo/actions/workflows/account-delete-monitor.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/account-delete-monitor.yml)
[![Annotations API](https://github.com/Pocket/pocket-monorepo/actions/workflows/annotations-api.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/annotations-api.yml)
[![Braze](https://github.com/Pocket/pocket-monorepo/actions/workflows/braze.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/braze.yml)
[![Client API](https://github.com/Pocket/pocket-monorepo/actions/workflows/client-api.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/client-api.yml)
[![Feature Flags](https://github.com/Pocket/pocket-monorepo/actions/workflows/feature-flags.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/feature-flags.yml)
[![FxA Webhook Proxy](https://github.com/Pocket/pocket-monorepo/actions/workflows/fxa-webhook-proxy.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/fxa-webhook-proxy.yml)
[![Image API](https://github.com/Pocket/pocket-monorepo/actions/workflows/image-api.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/image-api.yml)
[![Instant Sync Events](https://github.com/Pocket/pocket-monorepo/actions/workflows/instant-sync-events.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/instant-sync-events.yml)
[![List API](https://github.com/Pocket/pocket-monorepo/actions/workflows/list-api.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/list-api.yml)
[![Parser GraphQL Wrapper](https://github.com/Pocket/pocket-monorepo/actions/workflows/parser-graphql-wrapper.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/parser-graphql-wrapper.yml)
[![Pocket Event Bridge](https://github.com/Pocket/pocket-monorepo/actions/workflows/pocket-event-bridge.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/pocket-event-bridge.yml)
[![Push Server](https://github.com/Pocket/pocket-monorepo/actions/workflows/push-server.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/push-server.yml)
[![Sendgrid Data](https://github.com/Pocket/pocket-monorepo/actions/workflows/sendgrid-data.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/sendgrid-data.yml)
[![Shareable Lists API](https://github.com/Pocket/pocket-monorepo/actions/workflows/shareable-lists-api.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/shareable-lists-api.yml)
[![Shared Snowplow Consumer](https://github.com/Pocket/pocket-monorepo/actions/workflows/shared-snowplow-consumer.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/shared-snowplow-consumer.yml)
[![Shares API](https://github.com/Pocket/pocket-monorepo/actions/workflows/shares-api.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/shares-api.yml)
[![Transactional Emails](https://github.com/Pocket/pocket-monorepo/actions/workflows/transactional-emails.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/transactional-emails.yml)
[![User API](https://github.com/Pocket/pocket-monorepo/actions/workflows/user-api.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/user-api.yml)
[![User List Search](https://github.com/Pocket/pocket-monorepo/actions/workflows/user-list-search.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/user-list-search.yml)
[![V3 Proxy API](https://github.com/Pocket/pocket-monorepo/actions/workflows/v3-proxy-api.yml/badge.svg)](https://github.com/Pocket/pocket-monorepo/actions/workflows/v3-proxy-api.yml)

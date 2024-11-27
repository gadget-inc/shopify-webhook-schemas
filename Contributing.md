# Development environment

We use nix to manage the development environment for this package. Run `direnv allow` to load the devshell, with node and other utilities ready to go.

Then, run `pnpm install` to install the dependencies.

See the readme for instructions on re-scraping the schemas from Shopify's docs.

# Releasing

Releases are managed automatically by Github Actions. To create a new release, follow these steps:

1. Run `npm version minor|major|patch`. This will change the version in the package.json and create a new git commit changing it.
2. Push this commit to the `main` branch. CI will run the tests, then run the release workflow, which publishes to NPM, create a Github release, and creates a git tag for the version.

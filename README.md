# oat-scavengers-mspa
Repository for Team Oak Scavengers' entry to the 2026 MSPA Game Jam

## Development

Make sure [Node.js](https://nodejs.org/) is installed on your system, then run the following commands to setup the development environment:

``` shell
npm i -g pnpm@latest-11
pnpm i
```

You can start the development server with `pnpm dev`. The address to view the game will show up in the terminal.

Code tests can be run with `pnpm test`. See the [Vitest docs](https://vitest.dev/) for guidance on writing tests. Test files have the extension `.test.ts`, and can be located anywhere in the project.

Code can be formatted and linted using `pnpm format`.

## Building

Run `pnpm build` to build a copy of the game ready for final release. The game will be output to the `dist` folder.

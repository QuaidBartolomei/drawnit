[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/QuaidBartolomei/drawnit/CI)](https://github.com/QuaidBartolomei/drawnit/actions)

<!-- PROJECT LOGO -->
<p align="center">

 <h1 align="center">Drawnit</h3>

[ ![Screenshot](client/cypress/screenshots/home.cy.ts/screenshot.png) ](https://drawnit.herokuapp.com)

  <p align="center">
    Upload an image and draw on it or a blank canvas together with others in real time!
    <br />
    <br />
    <a href="https://drawnit.herokuapp.com">View Demo</a>
  </p>

## Getting Started

Start developing from scratch with just 2 commands!

```sh
npm run full-install
npm run dev
```

This will install all three projects (client, server, and top-level) and start the full stack dev server.

This project contains a `/server` and `/client` applications contained in a top-level parent package. In production the backend server serves the client build files statically.

The parent package contains several scripts to help with testing and developing the client and server together.

### Prerequisites

- node 16

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/quaidbartolomei/drawnit.git
   ```
2. Install NPM packages (Project, Client, Server)
   ```sh
   npm run full-install
   ```
3. (Production only): set the env values
   ```env
   MONGO_DB_URI=<your uri here>
   ```

## Developing

- After installation you can start the app in development mode. [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) is used to create a temporary db in memory for development and unit testing.

Start the server and client in dev mode with the parent package:

```sh
npm run dev
```

or separately

```sh
cd client
npm start
```

```sh
cd server
npm run dev
```

## Testing

### Jest Unit Tests

Jest unit tests for both the client and server are configured to run automatically with lint-staged. `npm run jest:client` and `npm run jest:server` can be used to manually trigger a test run.

### Cypress Integration Tests

These tests are performed against a running full stack application. Use the following script in the top level package to start the client and dev server and run `cypress open` all in the same terminal.

```sh
npm run cypress
```

### Cypress Component Tests

Cypress also provides a component development and testing tool. The Cypress component testing tool can render components in isolation which can be very useful for development.

From the `/client` directory run the following script to start the component test browser.

```sh
cd client/
npm run cyc
```

### Commit Hooks / Lint-Staged

Lint staged will perform linting, formatting, package.json sorting, and unit testing as necessary before any files that are committed. File and script settings for lint-staged can be found in `linstagedrc.js`.

- `package.json` - sort with [sort-package-json](https://github.com/keithamus/sort-package-json)
- typescript files - lint and unit test
- all recognized files - format with prettier

## Built With

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.IO](https://socket.io/)
- [Typescript](https://www.typescriptlang.org/)
- [Material-UI](https://material-ui.com/)

## Contact

[![LinkedIn][linkedin-shield]][linkedin-url]
[ Quaid Bartolomei ](https://www.linkedin.com/in/quaidb/)

Project Link: [https://github.com/QuaidBartolomei/drawnit](https://github.com/QuaidBartolomei/drawnit)

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/quaidb/
[product-screenshot]: images/screenshot.png

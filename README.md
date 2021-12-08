[![LinkedIn][linkedin-shield]][linkedin-url]
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/QuaidBartolomei/drawnit/CI)

<!-- PROJECT LOGO -->
<br />
<p align="center">

 <h1 align="center">Drawnit</h3>

[ ![Screenshot](client/cypress/screenshots/home.cy.ts/screenshot.png) ](https://drawnit.herokuapp.com)

  <p align="center">
    Upload an image and draw on it or a blank canvas together with others in real time!
    <br />
    <br />
    <a href="https://drawnit.herokuapp.com">View Demo</a>
  </p>

### Built With

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.IO](https://socket.io/)
- [Typescript](https://www.typescriptlang.org/)
- [Material-UI](https://material-ui.com/)

<!-- GETTING STARTED -->

## Getting Started

The project is organized so that the client and server can be developed as seperate apps. This top level package can be used to build the project into a Node.js application that serves the compiled frontend.

### Prerequisites

- node 16

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/quaidbartolomei/drawnit.git
   ```
2. Install NPM packages (Project, Client, Server)
   ```bash
   npm run full-install
   ```
3. (Production only): set the env values
   ```env
   MONGO_DB_URI=<your uri here>
   HOST=<production hostname here>
   ```

### Developing / Testing

- After installation you can start the app in development mode. [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) is used to create a temporary db in memory.

```bash
npm run dev
```

- There is also a script to run tests on both ends. The client app currently relies on a local dev server for testing its api calls. This dev server will also be initialized by the script

```bash
npm run test:all
```

- Cypress end-to-end tests require an active dev server. Use the following command to initialize all required servers and run cypress tests in headless mode:

```bash
npm run test:integration
```

<!-- USAGE EXAMPLES -->

## Contact

[ Quaid Bartolomei ](https://www.linkedin.com/in/quaidb/)

Project Link: [https://github.com/QuaidBartolomei/drawnit](https://github.com/QuaidBartolomei/drawnit)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/quaidb/
[product-screenshot]: images/screenshot.png

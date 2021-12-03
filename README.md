[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">Drawnit</h3>

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

- node ^16

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
   ```
   MONGO_DB_URI=<your uri here>
   HOST=<production hostname here>
   ```

### Developing / Testing

- After installation you can start the app in development mode. [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) is used to create a temporary db in memory.

```sh
npm run dev
```

- There is also a script to run tests on both ends. The client app currently relies on a local dev server for testing its api calls. This dev server will also be initialized by the script

```sh
npm run test:all
```

<!-- USAGE EXAMPLES -->

## Roadmap

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Quaid Bartolomei - (http://quaid.world)

Project Link: [https://github.com/QuaidBartolomei/drawnit](https://github.com/QuaidBartolomei/drawnit)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/quaid-bartolomei-065078203/
[product-screenshot]: images/screenshot.png

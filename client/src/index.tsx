import React from 'react';
import ReactDOM from 'react-dom';
// import * as serviceWorker from './serviceWorker';
import Homepage from './pages/Home.page';
import 'fontsource-roboto';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RoomPage from 'pages/Room.page';
import { PageRoutes } from 'routes/page.routes';
import './index.css'
const routes = PageRoutes();

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={routes.HOME} component={Homepage} />
      <Route path={routes.ROOM} component={RoomPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

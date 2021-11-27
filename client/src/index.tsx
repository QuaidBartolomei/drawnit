// import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline'
import 'fontsource-roboto'
import Homepage from 'pages/Home/Home.page'
import RoomPage from 'pages/Room/Room.page'
import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PageRoutes } from 'routes/page.routes'
import 'global-styles.css'
const routes = PageRoutes()

ReactDOM.render(<App />, document.getElementById('root'))

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CssBaseline />
        <Switch>
          <Route exact path={routes.HOME} component={Homepage} />
          <Route path={routes.ROOM} component={RoomPage} />
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

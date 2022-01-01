import CssBaseline from '@material-ui/core/CssBaseline'
import { render } from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Homepage from 'pages/Home'
import RoomPage from 'pages/Room'
import { PageRoutes } from 'routes'

const routes = PageRoutes()

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

render(<App />, document.getElementById('root'))

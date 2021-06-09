import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import NavBar from './Components/Shared/NavBar';
import { Container } from '@material-ui/core'
import Trip from './Components/Trip';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TripDetails from './Components/Trip/TripDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <NavBar />

          <Container maxWidth="md">
            <Switch>
              <Route exact path="/" component={Trip} />
              <Route exact path="/:trip_id" component={TripDetails} />
            </Switch>
          </Container>
        </MuiPickersUtilsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

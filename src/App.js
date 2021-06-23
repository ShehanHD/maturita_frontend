import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import NavBar from './Components/Shared/NavBar';
import { Container } from '@material-ui/core'
import Trip from './Components/Trip';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import TripDetails from './Components/Trip/TripDetails';
import LoginForm from './Components/Shared/Login';
import LogoutForm from './Components/Shared/Logout';
import RegistrationForm from './Components/Shared/Register';
import { useEffect, useState } from 'react';
import Autista from './Components/Autista/Autista';
import Passenger from './Components/Passenger/Passenger';
import AutistaTripDetails from './Components/Autista/AutistaTripDetails';

function App() {
  const [logoutForm, setLogoutForm] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const [registrationForm, setRegistrationForm] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(localStorage.getItem("jwt_token"))
  }, [])

  const handleRegistrationForm = () => setRegistrationForm(!registrationForm);

  const handleLoginForm = () => setLoginForm(!loginForm);

  const handleLogoutForm = () => setLogoutForm(!logoutForm);

  return (
    <div className="App">
      <BrowserRouter>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <NavBar handleRegistrationForm={handleRegistrationForm} handleLoginForm={handleLoginForm} handleLogoutForm={handleLogoutForm} auth={authenticated} />

          <RegistrationForm open={registrationForm} setOpen={handleRegistrationForm} setAuthenticated={setAuthenticated} />
          <LoginForm open={loginForm} setOpen={handleLoginForm} setAuthenticated={setAuthenticated} />
          <LogoutForm open={logoutForm} setOpen={handleLogoutForm} setAuthenticated={setAuthenticated} />

          <Container maxWidth="md">
            <Switch>
              <Route exact path="/" component={Trip} />
              <Route exact path="/autista">
                {authenticated && <Autista auth={authenticated} />
                }
              </Route>
              <Route exact path="/autista/trip_details/:trip_id">
                {authenticated && <AutistaTripDetails auth={authenticated} />
                }
              </Route>
              <Route exact path="/passeggero">
                {authenticated && <Passenger auth={authenticated} />
                }
              </Route>
              <Route exact path="/:trip_id">
                {authenticated && <TripDetails auth={authenticated} />
                }
              </Route>
            </Switch>
          </Container>
        </MuiPickersUtilsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

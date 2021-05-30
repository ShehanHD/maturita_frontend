import NavBar from './Component/Shared/NavBar';
import TripFilter from './Component/Trip/TripFilter';
import './App.scss';
import { Container } from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <NavBar />

      <Container maxWidth="md">
        <TripFilter />
      </Container>

    </div>
  );
}

export default App;

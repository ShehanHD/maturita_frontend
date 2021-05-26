import './App.css';
import Button from '@material-ui/core/Button'
require('dotenv').config();

function App() {
  return (
    <div className="App">
      <Button variant="contained" color="primary">test</Button>

      {console.log(process.env)}
      {console.log(window.envConfig.API_URL)}
    </div>
  );
}

export default App;

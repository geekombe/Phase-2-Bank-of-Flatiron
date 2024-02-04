import logo from './logo.svg';
import './App.css';
import Dashboard from "./Dashboard"
import Logs from './Logs';
import AddTransaction from './AddTransaction';


function App() {

  return (
    <div className="App">
      <Dashboard />
      <AddTransaction />
      <Logs />
    </div>
  );
}

export default App;


import './App.css';
import Login from './Components/Login/Login';
import { UserStorage } from "./UserContext";


function App() {
  return (
    <UserStorage>
      <Login/>
    </UserStorage>
  )
}

export default App;

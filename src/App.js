import ReactNotification  from 'react-notifications-component';
import { BrowserRouter, Route, Router, Routes, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import { UserStorage } from "./UserContext";


function App() {
  return (
    <div className="App">
      <ReactNotification />
      <BrowserRouter>
        <UserStorage>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/home' component={Home} />
          </Switch>
        </UserStorage>
      </BrowserRouter>
    </div>
  )
}

export default App;

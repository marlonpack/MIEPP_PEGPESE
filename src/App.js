import ReactNotification from "react-notifications-component";
import { BrowserRouter, Route, Router, Routes, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import { UserStorage } from "./UserContext";
import { ProviderStorage } from "./ProviderContext";
import Provider from "./Components/Provider/Provider";



function App() {
  return (
    <div className="App">
      <ReactNotification />
      <BrowserRouter>
        <UserStorage>
          <ProviderStorage>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/home" component={Home} />
            </Switch>
          </ProviderStorage>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;

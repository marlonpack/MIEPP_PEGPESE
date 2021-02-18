import ReactNotification from "react-notifications-component";
import { BrowserRouter, Route, Router, Routes, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import { GlobalStorage } from "./Contexts/GlobalContext";

function App() {
  return (
    <div className="App">
      <ReactNotification />
      <BrowserRouter>
        <GlobalStorage>
          <Switch>
            <Route path="/" exact component={Login} />
            <ProtectedRoute path="/home/" component={Home} />
          </Switch>
        </GlobalStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;

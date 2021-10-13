import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { SignIn } from "./pages/Auth/SignIn";
import { SignUp } from "./pages/Auth/SignUp";
import { Dashboard } from "./pages/Dashboard";
import Agent from "./Agent";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/agent" component={Agent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

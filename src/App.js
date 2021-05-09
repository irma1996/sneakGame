import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import WelcomeSite from "./components/WelcomeSite";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomeSite} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;

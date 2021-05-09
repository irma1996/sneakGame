import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import WelcomeSite from "./components/WelcomeSite";
import SnakeGame from "./components/SnakeGame";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomeSite} />
        <Route path="/game" component={SnakeGame} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;

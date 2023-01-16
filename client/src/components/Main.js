import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomeComponent from "./HomeComponent";
import GameSetupCompnent from "./GameSetupComponent";
const Main = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomeComponent} />
      <Route path="/play" exact component={GameSetupCompnent} />
      <Redirect to="/" />
    </Switch>
  );
};
export default Main;

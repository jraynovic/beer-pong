import React, { useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import { JoinComponent } from "./JoinComponent";
import NewGame from "./NewGameComponent";
import JoinGameComponent from "./JoinGameComponent";

const CreateGameComponent = ({
  game,
  device,
  setDevice,
  setPlayer,
  joinType,
  setJoinType,
  gameId,
  setGameId,
}) => {
  if (!joinType) {
    return (
      <JoinComponent setJoinType={setJoinType}/>
    );
  }

  if (joinType === "new") {
    return (
      <NewGame device={device} setDevice={setDevice}  />
    );
  }

  return (
    <JoinGameComponent device={device} setDevice={setDevice} gameId={gameId} setGameId={setGameId}/>
  );
};
export default CreateGameComponent;

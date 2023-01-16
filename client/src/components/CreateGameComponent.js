import React, { useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import { JoinComponent } from "./JoinComponent";
import NewGame from "./NewGameComponent";
import JoinGameComponent from "./JoinGameComponent";

const CreateGameComponent = ({
  setUserName,
  userName,
  game,
  device,
  setDevice,
  setPlayer,
  joinType,
  setJoinType,
  setGameStarted,
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
      <NewGame device={device} setDevice={setDevice} userName={userName} setUserName={setUserName} setGameStarted={setGameStarted} />
    );
  }

  return (
    <JoinGameComponent userName={userName} setUserName={setUserName} device={device} setDevice={setDevice} gameId={gameId} setGameId={setGameId} setGameStarted={setGameStarted}/>
  );
};
export default CreateGameComponent;

import React, { useState } from "react";
import { Grid, Button, TextField } from "@mui/material";

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
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Button
              style={{ margin: 20, marginTop: 100 }}
              variant="contained"
              onClick={() => setJoinType("join")}
            >
              Join Game with Code
            </Button>{" "}
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{ margin: 20 }}
              variant="contained"
              onClick={() => setJoinType("new")}
            >
              Create Game
            </Button>{" "}
          </Grid>
        </Grid>
      </div>
    );
  }

  if (joinType === "new") {
    return (
      <div style={{ marginTop: 50 }}>
        <div>Create New Game</div>
        <div>{userName}</div>
        <div>
          <div>
            <TextField
              value={userName}
              label="Name"
              variant="outlined"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              value={device}
              label="Device Id"
              variant="outlined"
              onChange={(e) => setDevice(e.target.value)}
            />
          </div>
          <div>
            <Button variant="contained" onClick={() => setGameStarted(true)}>
              Create
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 50 }}>
      <div>Join Game</div>
      <div>{userName}</div>
      <div>
        <div>
          <TextField
            value={userName}
            label="Name"
            variant="outlined"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            value={device}
            label="Device Id"
            variant="outlined"
            onChange={(e) => setDevice(e.target.value)}
          />
        </div>
        <div>
          <TextField
            value={gameId}
            label="Game Code"
            variant="outlined"
            onChange={(e) => setGameId(e.target.value)}
          />
        </div>
        <div>
          <Button variant="contained" onClick={() => setGameStarted(true)}>
            Join
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreateGameComponent;

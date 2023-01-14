import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import { subscribeToPoints, subscribeToRoom, sendRoom } from "../api";


const GreenCup = () => {
  return (
    <div className="cup-container">
      <div className="cup-left" />
      <div className="cup-right" />
    </div>
  );
};

const RedCup = () => {
  return (
    <div className="cup-container">
      <div className="cup-left-removed" />
      <div className="cup-right-removed" />
    </div>
  );
};

const GameBoard = ({ gameId, device, userName }) => {
  const [board, setBoard] = useState([]);

  subscribeToPoints((err, point) => {
    if(device != point.device && gameId === point.gameId){
      setBoard([...board, point.point]);
    }
    
  });

  return (
    <div>
      <Grid container>
        <Grid className="center" container>
          <Grid item>
            <h1>
              Beer Pong {`gameId: ${gameId} device: ${device} user name: ${userName}`}
            </h1>
          </Grid>
        </Grid>
        <Grid className="center" container>
          <Grid item xs={2}>
            {board.includes(1) ? <RedCup /> : <GreenCup />}
          </Grid>
        </Grid>
        <Grid className="center" container>
          <Grid item xs={2}>
            {board.includes(2) ? <RedCup /> : <GreenCup />}
          </Grid>
          <Grid item xs={2}>
            {board.includes(3) ? <RedCup /> : <GreenCup />}
          </Grid>
        </Grid>
        <Grid className="center" container>
          <Grid item xs={2}>
            {board.includes(4) ? <RedCup /> : <GreenCup />}
          </Grid>
          <Grid item xs={2}>
            {board.includes(5) ? <RedCup /> : <GreenCup />}
          </Grid>
          <Grid item xs={2}>
            {board.includes(6) ? <RedCup /> : <GreenCup />}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          style={{ marginTop: "3rem" }}
          variant="contained"
          onClick={() => setBoard([])}
        >
          Reset
        </Button>
      </Grid>
    </div>
  );
};

export default GameBoard;

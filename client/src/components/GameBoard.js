import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import { subscribeToPoints } from "../api";

const GameBoard = () => {
  const [board, setBoard] = useState([]);

  subscribeToPoints((err, point) => {
    setBoard([...board, point]);
  });

  return (
    <div>
      <Grid container>
        <Grid className="center" container>
          <Grid item>
            <h1>GameBoard</h1>
          </Grid>
        </Grid>
        <Grid className="center" container>
          <Grid item xs={2}>
            <div className={board.includes(1) ? "cup-removed" : "cup"} />{" "}
          </Grid>
        </Grid>
        <Grid className="center" container>
          <Grid item xs={2}>
            <div className={board.includes(2) ? "cup-removed" : "cup"} />{" "}
          </Grid>
          <Grid item xs={2}>
            <div className={board.includes(3) ? "cup-removed" : "cup"} />{" "}
          </Grid>
        </Grid>
        <Grid className="center" container>
          <Grid item xs={2}>
            <div className={board.includes(4) ? "cup-removed" : "cup"} />{" "}
          </Grid>
          <Grid item xs={2}>
            <div className={board.includes(5) ? "cup-removed" : "cup"} />{" "}
          </Grid>
          <Grid item xs={2}>
            <div className={board.includes(6) ? "cup-removed" : "cup"} />{" "}
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

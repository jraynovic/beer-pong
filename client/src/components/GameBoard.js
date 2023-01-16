import React, { useEffect, useState } from "react";
import { Grid, Button, IconButton } from "@mui/material";
import { ContentCopy, Check} from '@mui/icons-material/';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { subscribeToGame } from "../api";


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
  const [gameInPlay, setGameInPlay] = useState(true);
  const [copy, setCopy] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
      setCopy(false)
    },[2000])
  },[copy])

  subscribeToGame((err, point) => {
    if (Object.keys(point)[0] === "endgame") setGameInPlay(false);
    if (parseInt(device) !== point.device && gameId === point.gameId) {
      setBoard([...board, point.point]);
    }
  }, device);

  return (
    <div>
      <Grid container>
        <Grid className="center" container>
          <Grid item className="home-card">
            <h1>Rad Pong</h1>
          </Grid>
          <Grid item xs={12}>
            <h4>
              {gameInPlay ? `Lets win ${userName}!` : `Game ended show score`}{" "}
              {`Share this game code with a friend ${gameId} to play`}
              <span>
                <CopyToClipboard text={gameId} onCopy={() => setCopy(true)}>
                  <IconButton color="secondary">
                    {copy ? <Check /> : <ContentCopy />}
                  </IconButton>
                </CopyToClipboard>
              </span>
            </h4>
          </Grid>
        </Grid>
        <Grid container md={6}>
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
        <Grid container md={6}>
          <Grid item md={12}>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Button
          style={{ marginTop: "3rem" }}
          variant="contained"
          onClick={() => setBoard([])}
          color="secondary"
        >
          Reset
        </Button>
      </Grid>
    </div>
  );
};

export default GameBoard;

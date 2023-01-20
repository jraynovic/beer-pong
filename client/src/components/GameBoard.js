import React, { useEffect, useState } from "react";
import { Grid, Button, IconButton } from "@mui/material";
import { ContentCopy, Check} from '@mui/icons-material/';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { subscribeToGame } from "../api";
import { Row, Col, Container } from 'reactstrap'


const GreenCup = () => {
  return (
    <div className="cup-container" style={{margin:'auto'}}>
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
    <Container fluid>
       <Row>
        <Col xs={12}>
          <div className="home-card">
            <h1 className="title">Rad Pong</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col><h4>
              {gameInPlay ? ` ${userName}!` : `Game ended show score`}{" "}
              {`Share this game code with a friend ${gameId} to play`}
              <span>
                <CopyToClipboard text={gameId} onCopy={() => setCopy(true)}>
                  <IconButton color="secondary">
                    {copy ? <Check /> : <ContentCopy />}
                  </IconButton>
                </CopyToClipboard>
              </span>
            </h4></Col>
      </Row>
      <Row>
        <Col md={6} xs={12}>
          <Row><Col xs={12}>{board.includes(1) ? <RedCup /> : <GreenCup />}</Col></Row>
          <Row>
            <Col xs={4}/>
            <Col xs={2}><div>{board.includes(2) ? <RedCup /> : <GreenCup />}</div></Col>
            <Col xs={2}>{board.includes(3) ? <RedCup /> : <GreenCup />}</Col>
            <Col xs={4}/>
          </Row>
          <Row>
            <Col xs={3}></Col>
            <Col xs={2}>{board.includes(4) ? <RedCup /> : <GreenCup />}</Col>
            <Col xs={2}>{board.includes(5) ? <RedCup /> : <GreenCup />}</Col>
            <Col xs={2}>{board.includes(6) ? <RedCup /> : <GreenCup />}</Col>
            <Col xs={3}></Col>
          </Row>
        </Col>
        <Col md={6} xs={12}>
          RIght SIde
        </Col>
      </Row>
    </Container>
    
  );
};

export default GameBoard;

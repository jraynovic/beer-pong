import React, { useEffect, useState, useContext } from "react";
import { Grid, Button, IconButton } from "@mui/material";
import { ContentCopy, Check, VideoCall, Link, LinkOff } from "@mui/icons-material/";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { subscribeToGame } from "../api";
import { Row, Col, Container } from "reactstrap";

import { SocketContext } from "../Context";

import VideoComponent from "./VideoComponent";

const GreenCup = () => {
  return (
    <div className="cup-container" style={{ margin: "auto" }}>
      <div className="cup-left" />
      <div className="cup-right" />
    </div>
  );
};

const RedCup = () => {
  return (
    <div className="cup-container" style={{ margin: "auto" }}>
      <div className="cup-left-removed" />
      <div className="cup-right-removed" />
    </div>
  );
};

const GameBoard = ({ gameId, joinType }) => {
  const {
    board,
    setBoard,
    me,
    gameInPlay,
    userTwoAvailable,
    callUser,
    otherUserId,
    calling,
    incomingCall,
    call,
    answerCall,
    setGameBoardLoaded,
    callAccepted,
    userName,
    playerTwoName
  } = useContext(SocketContext);

  // const [gameInPlay, setGameInPlay] = useState(true);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCopy(false);
    }, [2000]);
  }, [copy]);

  useEffect(() => {
    setGameBoardLoaded(true);
  }, []);

  let message = "";
  if (joinType === "new") {
    message = (
      <h4>
        {gameInPlay ? ` ${userName}` : `Game ended show score`}{" "}
        {`Share this game code with a friend ${gameId} to play`}
        <span>
          <CopyToClipboard text={gameId} onCopy={() => setCopy(true)}>
            <IconButton color="secondary">
              {copy ? <Check /> : <ContentCopy />}
            </IconButton>
          </CopyToClipboard>
        </span>
      </h4>
    );
  } else {
    <h4>
      {gameInPlay ? ` ${userName} good luck!` : `Game ended show score`}{" "}
      <span>
        <CopyToClipboard text={gameId} onCopy={() => setCopy(true)}>
          <IconButton color="secondary">
            {copy ? <Check /> : <ContentCopy />}
          </IconButton>
        </CopyToClipboard>
      </span>
    </h4>;
  }
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <div className="home-card">
            <h1 className="title">Rad Pong</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>{message}</Col>
      </Row>
      <Row>
        <Col md={6} xs={12}>
          <Row>
            <Col xs={12}>{board.includes(1) ? <RedCup /> : <GreenCup />}</Col>
          </Row>
          <Row>
            <Col xs={3} />
            <Col xs={3}>
              <div>{board.includes(2) ? <RedCup /> : <GreenCup />}</div>
            </Col>
            <Col xs={3}>{board.includes(3) ? <RedCup /> : <GreenCup />}</Col>
            <Col xs={3} />
          </Row>
          <Row>
            <Col xs={2}></Col>
            <Col xs={8}>
              <Row>
                <Col xs={4}>
                  {board.includes(4) ? <RedCup /> : <GreenCup />}
                </Col>
                <Col xs={4}>
                  {board.includes(5) ? <RedCup /> : <GreenCup />}
                </Col>
                <Col xs={4}>
                  {board.includes(6) ? <RedCup /> : <GreenCup />}
                </Col>
              </Row>
            </Col>
            <Col xs={2}></Col>
          </Row>
        </Col>
        <Col md={6} xs={12} className="videoContainer">
          <Row>
            <Col>{gameInPlay? `Playing against: ${playerTwoName}`: 'Game Ended'}</Col>
          </Row>
          <Row>
            <Col xs={12}>
              <VideoComponent />
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              {otherUserId && !callAccepted && !call.isReceivingCall ? (
                <IconButton onClick={callUser} color="secondary">
                  <VideoCall fontSize="large" />
                </IconButton>
              ) : (
                ""
              )}
            </Col>
            <Col sm={4} className='text-center'>
              {call.isReceivingCall && !callAccepted ? (
                <div className="button answer-button" >
                  <Button
                    color="secondary"
                    size="large"
                    variant="contained"
                    onClick={answerCall}
                  >
                    Answer
                  </Button>
                </div>
              ) : (
                ""
              )}
            </Col>
            <Col sm={4} className='text-center mt-3'>
              <div>
                {(otherUserId && gameInPlay)? 
                <Link/>
              :
              <LinkOff/>
              }
              </div>
              
            </Col> 
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default GameBoard;

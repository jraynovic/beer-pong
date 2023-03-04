import React, { useContext } from "react";
import { TextField, Button } from "@mui/material";
import { Row, Col, Container } from "reactstrap";
import { SocketContext } from "../Context";

const JoinGameComponent = ({
  device,
  setDevice,
  gameId,
  setGameId,
  setGameStarted,
}) => {
  const {
    userName,
    setUserName,
    startGame,
    error
  } = useContext(SocketContext);

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
        <div className="card text-center">
          <div className="input">
            <TextField
              color="secondary"
              value={userName}
              label="Name"
              variant="outlined"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="input">
            <TextField
              color="secondary"
              value={device}
              label="Device Id"
              variant="outlined"
              onChange={(e) => setDevice(e.target.value)}
            />
          </div>
          <div className="input">
            <TextField
              color="secondary"
              value={gameId}
              label="Game Code"
              variant="outlined"
              onChange={(e) => setGameId(e.target.value)}
            />
          </div>
          <div className="input">
            <Button
              color="secondary"
              variant="contained"
              onClick={startGame}
            >
              Join
            </Button>
          </div>
          <div className="error">{error}</div>
        </div>
      </Row>
    </Container>
  );
};
export default JoinGameComponent;

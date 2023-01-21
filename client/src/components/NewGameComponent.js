import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import { Col, Row, Container } from "reactstrap";
const NewGame = ({
  device,
  setDevice,
  userName,
  setUserName,
  setGameStarted,
}) => {
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
        <Col xs={12}>
          <div className="card text-center">
            <div className="input">
              <TextField
                value={userName}
                label="Name"
                variant="outlined"
                color="secondary"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input">
              <TextField
                value={device}
                label="Device Id"
                variant="outlined"
                color="secondary"
                onChange={(e) => setDevice(e.target.value)}
              />
            </div>
            <div className="button">
              <Button
                color="secondary"
                variant="contained"
                onClick={() => setGameStarted(true)}
              >
                Create
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default NewGame;

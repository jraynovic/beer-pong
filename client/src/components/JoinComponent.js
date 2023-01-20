import React from "react";
import { Grid, Button } from "@mui/material";
import { Row, Col, Container } from "reactstrap";
export const JoinComponent = ({ setJoinType }) => {
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
        <Col>
          <Row>
            <Col xs={12}>
              <div className="button-container card text-center">
                <div className="button">
                  <Button
                    color="secondary"
                    size="large"
                    variant="contained"
                    onClick={() => setJoinType("new")}
                  >
                    New Game
                  </Button>
                </div>
                <div className="button">
                  <Button
                    color="secondary"
                    size="large"
                    variant="contained"
                    onClick={() => setJoinType("join")}
                  >
                    Join Game
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

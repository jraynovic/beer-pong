import { Button } from "@mui/material";
import React from "react";
import { Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import { Container } from "reactstrap";

const HomeComponent = () => {
  const history = useHistory();
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
        <Col xs={12}>
          <div className="card text-center">
            <div>
            <Button
              className="button"
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => history.push("play")}
            >
              Play
            </Button> 
            </div>
         
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeComponent;

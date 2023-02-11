import React, { useEffect, useState, useContext } from "react";
import { SocketContext } from "../Context";
import {
  Grid,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  InputLabel,
} from "@mui/material";
import { ContentCopy, Check } from "@mui/icons-material/";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { subscribeToGame } from "../api";
import { Row, Col, Container } from "reactstrap";
import VideoComponent from "./VideoComponent";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
// import { ContextProvider } from './Context';

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
    <div className="cup-container">
      <div className="cup-left-removed" />
      <div className="cup-right-removed" />
    </div>
  );
};

const GameBoard = ({ gameId, device, userName, joinType }) => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    callUser,
    setVideo,
    video,
    devices,
    me,
    userJoined
  } = useContext(SocketContext);
  const [board, setBoard] = useState([]);
  const [gameInPlay, setGameInPlay] = useState(true);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCopy(false);
    }, [2000]);
  }, [copy]);

  useEffect(()=>{
    setTimeout(()=>{
      subscribeToGame((err, point) => {
        if (Object.keys(point)[0] === "endgame") setGameInPlay(false);
        if (parseInt(device) !== point.device && gameId === point.gameId) {
          setBoard([...board, point.point]);
        }
      }, device);
    },[2000])
  },[])
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
        <Col md={6} xs={12}>
          {JSON.stringify(me)}
          <Row>
            {joinType === 'new' ?JSON.stringify(userJoined): ''}
          </Row>
          <Row>
          {joinType === 'new' && userJoined.id ? <Button onClick={()=>callUser(userJoined.id)}>Call</Button>: ''}
          </Row>
          <Row>
          {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary">
            Answer
          </Button>
        </div>
      )}
          </Row>
          <Row>
            <Col xs={12}>
              <VideoComponent />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <IconButton
                color="secondary"
                variant="contained"
                onClick={() => setVideo(!video)}
              >
                {video ? <CameraAltIcon /> : <NoPhotographyIcon />}
              </IconButton>
            </Col>
            <Col xs={6}>
              <FormControl fullWidth>
                <InputLabel>Camera</InputLabel>
                <Select style={{ width: "100%" }} label="camera">
                  {devices?.filter(device=> device.kind === "videoinput").map(cam=> <MenuItem key={cam.label+'menuItem'}>{cam.label}</MenuItem>)}
                </Select>
              </FormControl>
            </Col>
            {JSON.stringify(call)}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default GameBoard;

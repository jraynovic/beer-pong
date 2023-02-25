import React, { useContext } from "react";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";
import { SocketContext } from "../Context";
import { Row, Col, Container } from "reactstrap";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    setVideo,
    video,
    devices,
  } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Row>
      {callAccepted ? (
        <video
          playsInline
          muted
          ref={userVideo}
          autoPlay
          className="otherVideo"
        />
      ) : (
        <div />
      )}

      <video
        playsInline
        ref={myVideo}
        autoPlay
        className={callAccepted ? "video" : "otherVideo"}
      />
    </Row>
  );
};

export default VideoPlayer;

import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import GameBoard from "./GameBoard";
import CreateGameComponent from "./CreateGameComponent";
import { subscribeToPoints } from "../api";

import {SocketContext} from '../Context'

const MainComponent = () => {
  const {
    board,
    setBoard,
    me,
    device,
    setDevice,
    gameId,
    setGameId,
    joinType,
    setJoinType,
    player,
    setPlayer,
    setSocketId
  } = useContext(SocketContext);


  const [gameStarted, setGameStarted] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (gameStarted && joinType === "new") {
    
      const postNewGame = async () => {
        const game = await axios.post("https://radpong.com/game/new", {
          playerOne: userName,
          deviceOne: device,
        });
        setGameId(game.data.gameId);
        setSocketId()
      };
      postNewGame();
    }
    if (gameStarted && joinType === "join") {
      const joinGame = async () => {
        const game = await axios.post("https://radpong.com/game/join", {
          playerTwo: userName,
          deviceTwo: device,
          gameId,
        });
        if(game)setSocketId();
      };
      joinGame();
    }
  }, [gameStarted]);

  if (gameStarted) {
    return <GameBoard gameId={gameId} device={device} userName={userName} joinType={joinType} />;
  }
  return (
    <CreateGameComponent
      setGameStarted={setGameStarted}
      userName={userName}
      setUserName={setUserName}
      device={device}
      setDevice={setDevice}
      setPlayer={setPlayer}
      joinType={joinType}
      setJoinType={setJoinType}
      gameId={gameId}
      setGameId={setGameId}
    />
  );
};
export default MainComponent;

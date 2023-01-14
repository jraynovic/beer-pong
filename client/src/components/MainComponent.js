import axios from "axios";
import React, { useEffect, useState } from "react";
import GameBoard from "./GameBoard";
import HomeComponent from "./HomeComponent";
import { subscribeToPoints } from "../api";

const MainComponent = () => {
    const [gameStarted, setGameStarted] = useState(false)
    const [userName, setUserName] = useState('')
    const [device, setDevice] = useState('')
    const [player, setPlayer] = useState('')

    if(gameStarted){
        return <GameBoard/>
    }
 return(
  <HomeComponent setGameStarted={setGameStarted} userName={userName} setUserName={setUserName} device={device} setDevice={setDevice} setPlayer={setPlayer}/>
 )
}
export default MainComponent;
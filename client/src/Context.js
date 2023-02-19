import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import { CompressOutlined, ConstructionOutlined } from '@mui/icons-material';


const SocketContext = createContext();

const socket = io('http://localhost:5001',{query:{gameId:'TEST FROM CLIENT!'}}); 

const ContextProvider = ({ children }) => {
  const [me, setMe] = useState('');
  const [board, setBoard] = useState([]);
  const [device, setDevice] = useState("");
  const [player, setPlayer] = useState("");
  const [joinType, setJoinType] = useState("");
  const [gameId, setGameId] = useState("");
  const [gameInPlay, setGameInPlay] = useState(true);
  const [userTwoAvailable,setUserTwoAvailable] = useState(false)
  const [otherUserId, setOtherUserId] = useState('')
  const [incomingCall, setIncomingCall] = useState(false)
  const [calling, setCalling] = useState(false)


  useEffect(()=>{
    setUserTwoAvailable(true)
  },[otherUserId])
  socket.on("me", (id) => setMe(id));
  socket.on('point', point => {
    if (parseInt(device) !== point.device && gameId === point.gameId) {
        setBoard([...board, point.point]);
      }
  });
  socket.on('endgame', gameId => {
    if (Object.keys(gameId)[0] === "endgame") setGameInPlay(false);
  });

  const setSocketId = ()=>{
    socket.emit('listenForPoint',device); 
  }

  socket.on('userAvailable',()=>{
    if(!otherUserId)socket.emit('requestUsers', gameId)
  })

  socket.on('users',(game)=>{
    if(!game) return
    if(joinType ==='new'){
        setOtherUserId(game.playerTwoSocketId) 
    }else{
        setOtherUserId(game.playerOneSocketId)
    }
  })

  const callUser = ()=>{
    socket.emit('callUser', {otherUserId, gameId})
    setCalling(true)
    console.log(`Attempting to call `)
  }

  socket.on('incomingCall',()=>{
    setIncomingCall(true)
  })

  return (
    <SocketContext.Provider value={{
      board,
      setBoard,
      me,
      device,
      setDevice,
      gameId, 
      setGameId,
      joinType,
      setJoinType,
      gameInPlay,
      setSocketId,
      userTwoAvailable,
      callUser,
      otherUserId,
      calling,
      incomingCall
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
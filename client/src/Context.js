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
      setSocketId
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
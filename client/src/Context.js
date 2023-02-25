import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

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
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [call, setCall] = useState({});
  const [gameBoardLoaded, setGameBoardLoaded] = useState(false)

  const [stream, setStream] = useState();
  const [video, setVideo] = useState(false);
  const [devices, setDevices] = useState([]);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(()=>{
    setUserTwoAvailable(true)
  },[otherUserId])

  useEffect(() => {
    const getStream = async () => {
      let currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(currentStream);
      myVideo.current.srcObject = currentStream;
    };

    const getDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setDevices(devices);
    };
    function stopVideo() {
        if (stream) {
          stream.getTracks().forEach((track) => {
            if (track.readyState === "live") {
              track.stop();
            }
          });
        }
    }
    if(!video)stopVideo()
    // if(calling || callAccepted)getStream();
    if(gameBoardLoaded)getStream();
    // getDevices();

  }, [gameBoardLoaded]);

  useEffect(()=>{
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  },[])


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
    // socket.emit('callUser', {otherUserId, gameId})
    setCalling(true)

    setTimeout(()=>{
      const peer = new Peer({ initiator: true, trickle: false, stream });

      peer.on('signal', (data) => {
        console.log('PEER ON SIGNAL') // good
        socket.emit('callUser', { userToCall: otherUserId, signalData: data, from: me, player });
      });
  
      peer.on('stream', (currentStream) => {
        console.log('Stream active:', currentStream.active);
        userVideo.current.srcObject = currentStream;
      });
  
      socket.on('callAccepted', (signal) => {
        if(joinType ==='new'){
          console.log(signal, 'CALL ACCEPTED SIGNAL') // good
          setCallAccepted(true);
          peer.signal(signal);
        }
      });

      peer.on('connect',()=>{
        console.log('CONNECTED USER 1')
      })

      peer.on('error', err => {
        console.log('Peer  error:', err);
      });
      
  
      connectionRef.current = peer;
  
      
      console.log(`Attempting to call `)
    },1000)
    
  }

  const answerCall = () => {
    setCallAccepted(true);

    setTimeout(()=>{
const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      console.log('Stream active:', currentStream.active);
      userVideo.current.srcObject = currentStream;
    });
    console.log(call.signal, 'call.signal')
    peer.signal(call.signal);

    peer.on('connect',()=>{
      console.log('CONNECTED USER 2')
    })

    peer.on('error', err => {
      console.log('Peer  error:', err);
    });

    connectionRef.current = peer;
    },1000)

    
  };

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
      incomingCall,
      video,
      myVideo,
      stream,
      call,
      answerCall,
      callEnded,
      userVideo,
      gameBoardLoaded,
      setGameBoardLoaded
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { CompressOutlined, ConstructionOutlined } from '@mui/icons-material';


const SocketContext = createContext();

const socket = io('http://localhost:5001',{query:{gameId:'TEST FROM CLIENT!'}}); 

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('name');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [devices, setDevices] = useState([])
  const [video, setVideo] = useState(false);
  const [gameId, setGameId] = useState('');  
  const [joinType, setJoinType] = useState("");
  const [userJoined, setUserJoined] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    
    const getStream = async () => {
      let currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(currentStream);
      if (myVideo.current) myVideo.current.srcObject = currentStream;
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
    if(video)getStream();
    // getDevices();
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      console.log('GETTING CALL?')
      setCall({ isReceivingCall: true, from, name: callerName, signal });

    });
  }, [myVideo, video]);

  useEffect(() => {
    socket.on("me", (id) => setMe(id));
    
  }, [video,socket]);

  useEffect(()=>{
      socket.on('playerReady',(details)=>{
        setUserJoined(details)
      })
  },[video])

  useEffect(()=>{
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  },[])


  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      console.log('EMIT ANSWER CALL')
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name, gameId });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      setVideo,
      video,
      devices,
      gameId,
      setGameId,
      joinType,
       setJoinType,
       userJoined
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
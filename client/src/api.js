import openSocket from 'socket.io-client';
const  socket = openSocket('https://radpong.com');

function subscribeToGame(cb,deviceId) {
  socket.on('point', point => cb(null, point));
  socket.on('endgame', gameId => cb(null, {endgame:gameId}));
  socket.emit('listenForPoint',deviceId);
}


export { subscribeToGame };

import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:5001');

function subscribeToPoints(cb,deviceId) {
  socket.on('point', point => cb(null, point));
  socket.emit('listenForPoint',deviceId);
}

export { subscribeToPoints };

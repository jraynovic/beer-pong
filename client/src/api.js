import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

function subscribeToPoints(cb) {
  socket.on('point', point => cb(null, point));
  socket.emit('listenForPoint');
}
export { subscribeToPoints };
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const io = require('socket.io')(options={
    cors:true,
    origins:["http://127.0.0.1:3000"],
   });

io.on('connection', (client) => {
  client.on('listenForPoint',()=>{
    console.log('Subscribed to points')
  })
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);

const PORT = 5001;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.post("/", (req, res) => {
  io.sockets.emit('point', parseInt(Object.keys(req.body)[0]))
  res.status(201);
  res.send("Success");
});


app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

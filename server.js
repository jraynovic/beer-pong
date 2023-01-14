const express = require("express");
const bodyparser = require("body-parser");
const sequelize = require('./database')
const app = express();
const CreateGameRouter = require('./routes/CreateGameRouter');
const PointRouter = require("./routes/PointRouter");
const io = require('socket.io')(options={
    cors:true,
    origins:["http://127.0.0.1:3000"],
   });
const cors = require('cors')

io.on('connection', (client) => {
  client.on('listenForPoint',()=>{
    console.log('Subscribed to points')
  })
});


const port = 8000;
io.listen(port);
console.log('listening on port ', port);

const PORT = 5001;
app.use(cors({orgin:'*'}))
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
sequelize.sync().then(() => console.log("db is ready"));

app.set('io', io)

app.use('/game', CreateGameRouter)
app.use('/point', PointRouter)

app.post("/", (req, res) => {
  io.sockets.emit('point', parseInt(Object.keys(req.body)[0]))
  res.status(201);
  res.send("Success");
});


app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

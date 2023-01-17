const express = require("express");
const bodyparser = require("body-parser");
const sequelize = require('./database')
const { Op } = require('sequelize')
const app = express();
const CreateGameRouter = require('./routes/CreateGameRouter');
const PointRouter = require("./routes/PointRouter");
const Game = require('./models/GameModel')
const server = require("http").createServer(app);
app.use(express.static('client/build'))
const cors = require("cors");

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use(cors({orgin:'*'}))

io.on('connection', (socket) => {
  socket.on('listenForPoint',async (deviceId)=>{
    const game = await Game.findOne({where:{[Op.or]:{deviceOne:deviceId, deviceTwo:deviceId },gameFinished:false } } )
    if(game?.dataValues?.deviceOne === parseInt(deviceId)){
      await Game.update({playerOneSocketId:socket.id},{where:{deviceOne:deviceId, gameFinished:false}})
    }
    if(game?.dataValues?.deviceTwo === parseInt(deviceId)){
      await Game.update({playerTwoSocketId:socket.id},{where:{[Op.or]:{deviceTwo:deviceId}, gameFinished:false}})
    }
  })
  socket.on("disconnect", async () => {
		console.log('User disconnect')
    await Game.update({gameFinished:true},{where:{[Op.or]:{playerOneSocketId:socket.id, playerTwoSocketId:socket.id}}})
    const game =  await Game.findOne({where:{[Op.or]:{playerOneSocketId:socket.id, playerTwoSocketId:socket.id } } } )
    console.log(game?.dataValues?.gameId)
    if(game?.dataValues?.playerOneSocketId || game?.dataValues?.playerTwoSocketId){
      io.sockets.emit('endgame', {gameId:game?.dataValues?.gameId})
    }
	});
});



const PORT = 5001;
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
sequelize.sync().then(() => console.log("db is ready"));
app.set('io', io)

app.use('/game', CreateGameRouter)
app.use('/point', PointRouter)

app.get('/test',(req,res)=>{
  res.send('HELLO FROM RAD PONG!')
})
app.post("/", (req, res) => {
  io.sockets.emit('point', parseInt(Object.keys(req.body)[0]))
  res.status(201);
  res.send("Success");
});
app.use('/*',express.static('client/build'))

server.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

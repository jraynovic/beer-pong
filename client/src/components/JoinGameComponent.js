import React from 'react'
import { TextField, Button } from '@mui/material'

const JoinGameComponent = ({userName, setUserName, device, setDevice, gameId, setGameId, setGameStarted}) => {
  return (
    <div className='home-card center'>
      <div><h1 className='title'>Join Game</h1></div>
      <div>
        <div className='input'>
          <TextField
            color='secondary'
            value={userName}
            label="Name"
            variant="outlined"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            color='secondary'
            value={device}
            label="Device Id"
            variant="outlined"
            onChange={(e) => setDevice(e.target.value)}
          />
        </div>
        <div>
          <TextField
            color='secondary'
            value={gameId}
            label="Game Code"
            variant="outlined"
            onChange={(e) => setGameId(e.target.value)}
          />
        </div>
        <div>
          <Button color='secondary' variant="contained" onClick={() => setGameStarted(true)}>
            Join
          </Button>
        </div>
      </div>
    </div>
  )
}
export default JoinGameComponent
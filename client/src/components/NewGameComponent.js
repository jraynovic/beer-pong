import React from 'react'
import { TextField, Button, Grid } from '@mui/material'
const NewGame = ({ device, setDevice, userName, setUserName, setGameStarted}) => {
  return (
    <div  className='home-card center' style={{ marginTop: 50 }}>
        <div ><h3 className='title'>Create New Game</h3></div>
        <div>
          <div className='input'>
            <TextField
              value={userName}
              label="Name"
              variant="outlined"
              color='secondary'
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div >
            <TextField
              value={device}
              label="Device Id"
              variant="outlined"
              color='secondary'
              onChange={(e) => setDevice(e.target.value)}
            />
          </div>
          <div>
            <Button color='secondary' variant="contained" onClick={() => setGameStarted(true)}>
              Create
            </Button>
          </div>
        </div>
      </div>
  )
}
export default NewGame

import { Button } from '@mui/material'
import React from 'react'
import { useHistory } from "react-router-dom";

const HomeComponent = () => {
    const history = useHistory();
  return (
    <div>
        <div><h1>Rad Pong</h1></div>
        <div>
        <Button variant="contained" onClick={() => history.push("play")}>
             Play
        </Button>    
        </div>

    </div>
  )
}

export default HomeComponent

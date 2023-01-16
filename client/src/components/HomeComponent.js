import { Button, Paper, Grid } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";

const HomeComponent = () => {
  const history = useHistory();
  return (
      <div className='home-card center'>
         <div className="title" style={{paddingBottom:20}}>
          <h1 >Rad Pong</h1>
        </div>
        <div>
          <Button variant="contained" color='secondary' size="large" fontSize='inherit' onClick={() => history.push("play")}>
            Play
          </Button>
        </div>
      </div>
  );
};

export default HomeComponent;

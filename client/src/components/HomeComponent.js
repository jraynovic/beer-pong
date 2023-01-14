import React, { useState } from 'react'
import { Grid, Button, TextField } from "@mui/material";

const HomeComponent = ({setUserName,userName,game, device, setDevice, setPlayer, joinType, setJoinType}) => {

    if(!joinType){
        return(
            <div>
                <Grid container>
                    <Grid item><Button  variant="contained" onClick={()=>setJoinType('join')}>Join Game with Code</Button> </Grid>
                    <Grid item><Button  variant="contained" onClick={()=>setJoinType('new')}>Create Game</Button> </Grid>
                </Grid>
            </div>
        )
    }

   if (joinType === "new") {
     return (
       <div style={{ marginTop: 50 }}>
         <div>Create New Game</div>
         <div>{userName}</div>
         <div>
           <div>
             <TextField
               value={userName}
               label="Name"
               variant="outlined"
               onChange={(e) => setUserName(e.target.value)}
             />
           </div>
           <div>
             <TextField
               value={device}
               label="Device Id"
               variant="outlined"
               onChange={(e) => setDevice(e.target.value)}
             />
           </div>
           <div>
             <Button variant="contained" onClick={() => game('create')}>
               Create
             </Button>
           </div>
         </div>
       </div>
     );
   }

   return (
     <div style={{ marginTop: 50 }}>
       <div>Join Game</div>
       <div>{userName}</div>
       <div>
         <div>
           <TextField
             value={userName}
             label="Name"
             variant="outlined"
             onChange={(e) => setUserName(e.target.value)}
           />
         </div>
         <div>
           <TextField
             value={device}
             label="Device Id"
             variant="outlined"
             onChange={(e) => setDevice(e.target.value)}
           />
         </div>
         <div>
           <TextField
             value={device}
             label="Game Code"
             variant="outlined"
            //  onChange={(e) => setGameId(e.target.value)}
           />
         </div>
         <div>
           <Button variant="contained" onClick={() => game(true)}>
             Join
           </Button>
         </div>
       </div>
     </div>
   );
  
}
export default HomeComponent
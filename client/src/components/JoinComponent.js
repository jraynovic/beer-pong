import React from "react";
import { Grid, Button } from "@mui/material";
export const JoinComponent = ({ setJoinType }) => {
  return (
    <div>
      <Grid container className="home-card center">
        <Grid item xs={12}>
          <h2 className="title">How Are You Joining?</h2>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Button
              color="secondary"
              size="large"
              style={{ margin: 20, marginTop: 100 }}
              variant="contained"
              onClick={() => setJoinType("new")}
            >
              Create New Game
            </Button>{" "}
          </Grid>
          <Button
            color="secondary"
            size="large"
            style={{ margin: 20, marginTop: 20 }}
            variant="contained"
            onClick={() => setJoinType("join")}
          >
            Join Game with Code
          </Button>{" "}
        </Grid>
      </Grid>
    </div>
  );
};

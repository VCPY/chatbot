import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

export class ChatBotHeader extends React.Component {


  render() {
    return (<AppBar style={{ background: '#2E3B55' }} position="static">
      <Toolbar>
        <Typography variant="h6" >
          Chat Bot
        </Typography>
      </Toolbar>
    </AppBar>)
  }
}
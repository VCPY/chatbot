import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

export class ChatBotHeader extends React.Component{


    render(){
        return(<AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
            ChatBot
          </Typography>
        </Toolbar>
      </AppBar>)
    }

    
}
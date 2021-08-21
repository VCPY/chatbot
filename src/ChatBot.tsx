import { Paper } from "@material-ui/core";
import React from "react";
import { createUseStyles } from "react-jss";
import { MessageList } from "./MessageList";
import { ChatBotHeader } from "./UIComponents/ChatBotHeader";


function Styles({ children }: any): any {
  let styles = createUseStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    paper: {
      width: "50em",
      height: "25em",
    }
  })
  return children(styles)
}

export class ChatBot extends React.Component {

  constructor(props: any) {
    super(props)
  }

  render() {
    return (<Styles>
      {
        (useStyles: any): JSX.Element => {
          const styles = useStyles(this.props);
          return (
            <div className={styles.container}>
              <Paper className={styles.paper} elevation={3}>
                <ChatBotHeader />
                <MessageList />
              </Paper>
            </div>)
        }
      }

    </Styles>)
  }
}


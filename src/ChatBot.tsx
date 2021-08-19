import { Paper } from "@material-ui/core";
import React from "react";
import { createUseStyles } from "react-jss";
import { QuestionList } from "./Questions";
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
      width: "50%",
      height: "50%"
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
                <QuestionList />
              </Paper>
            </div>)
        }
      }

    </Styles>)
  }
}


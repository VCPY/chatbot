import { Button, createTheme, MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { createUseStyles } from "react-jss";
import { MessageType } from "./DataStructures/interfaces";


const secondaryColor = "#90c8f3"

function Styles({ children }: any): any {
  let styles = createUseStyles({
    sent: {
      backgroundColor: secondaryColor,
      padding: 10,
      marginLeft: '45%',
      marginTop: 5,
      marginRight: "5%",
      maxWidth: '50%',
      alignSelf: 'flex-end',
      borderRadius: 20,
    },
    received: {
      backgroundColor: "#f5f5f5",
      padding: 10,
      marginTop: 5,
      marginLeft: "5%",
      maxWidth: '50%',
      alignSelf: 'flex-start',
      borderRadius: 20,
    }
    ,
    button: {
      marginRight: "1em"
    }
  })
  return children(styles)
}

const mainTheme = createTheme({ palette: { primary: { main: '#2E3B55' }, secondary:{ main: "#90c8f3" }} })

export class Message extends React.Component<{ question: MessageType, answerSelectedCallback?: (id: number, index: number) => void, selected?: number | undefined, received?: boolean, disableButtons?: boolean }, { message: MessageType, answerSelectedCallback: (id: number, index: number) => void, selected?: number | undefined, received:boolean, disableButtons?: boolean }>{
  constructor(props: any) {
    super(props)
    this.state = {
      received: props.received,
      selected: props.selected,
      message: props.question,
      answerSelectedCallback: props.answerSelectedCallback,
      disableButtons: props.disableButtons
    }
  }

  componentDidUpdate(prevProps: { question: MessageType; }, prevState: any, snapshot: any) {
    if (prevProps.question !== this.props.question) {
      this.setState({
        message: this.props.question
      })
    }
  }

  render() {

    return (
      <Styles>{
        (useStyles: any) => {
          const styles = useStyles(this.props)

          let answers = this.state.message.answers.map((answer, index) => {
            return <MuiThemeProvider theme={mainTheme}><Button disabled = {this.state.disableButtons} disableElevation disableRipple={true} color="primary" variant="outlined" style={{ marginRight: "1em", marginTop: "1em"}} key={index} onClick={() => {
              if (this.state.answerSelectedCallback) {
                this.state.answerSelectedCallback(this.state.message.id, index)
              }
            }}> {answer}</Button ></MuiThemeProvider>
          })

          return (
            <div>
              <div className={this.state.received? styles.received: styles.sent}>
                <div style={{ fontSize: 24, color: "#000", fontFamily: "Arial" }} > {this.state.message.text}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {
                      answers
                    }</div>
                </div>
              </div>
            </div>
          )
        }
      }

      </Styles>
    );
  }

}
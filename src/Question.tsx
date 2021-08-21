import { Button } from "@material-ui/core";
import React from "react";
import { createUseStyles } from "react-jss";
import { MessageType } from "./DataStructures/interfaces";

function Styles({ children }: any): any {
  let styles = createUseStyles({
    container: {
      backgroundColor: "#0078fe",
      padding: 10,
      marginLeft: '45%',
      marginTop: 5,
      marginRight: "5%",
      maxWidth: '50%',
      alignSelf: 'flex-end',
      borderRadius: 20,
    },
    button: {
      marginRight:"1em"
    }
  })
  return children(styles)
}

export class Message extends React.Component<{ question: MessageType, answerSelectedCallback?: (id: number, index: number) => void, selected?: number | undefined }, { message: MessageType, answerSelectedCallback: (id: number, index: number) => void, selected?: number | undefined }>{
  constructor(props: any) {
    super(props)
    this.state = {
      selected: props.selected,
      message: props.question,
      answerSelectedCallback: props.answerSelectedCallback
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
            return <Button variant="contained" style={{marginRight:"1em", marginTop:"1em"}} key={this.state.message.id + "_" + index} onClick={() => {
              if (this.state.answerSelectedCallback) {
                this.state.answerSelectedCallback(this.state.message.id, index)
              }
            }}> {answer}</Button >
          })

          return (
            <p className={styles.container}>
              <div style={{ fontSize: 24, color: "#fff", fontFamily: "Arial" }} > {this.state.message.text}
                <div style={{display:"flex", justifyContent: "center"}}>
                  {
                    answers
                  }</div>
              </div>
            </p>
          )
        }
      }

      </Styles>
    );
  }

}
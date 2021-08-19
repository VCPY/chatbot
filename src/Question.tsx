import React from "react";
import { createUseStyles } from "react-jss";
import { QuestionType } from "./Questions";

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
    }
  })
  return children(styles)
}

export class Question extends React.Component<{ question: QuestionType, answerSelectedCallback?: (id: number, index: number) => void, selected?: number | undefined }, { question: QuestionType, answerSelectedCallback: (id: number, index: number) => void, selected?: number | undefined }>{
  constructor(props: any) {
    super(props)
    this.state = {
      selected: props.selected,
      question: props.question,
      answerSelectedCallback: props.answerSelectedCallback
    }
  }

  componentDidUpdate(prevProps: { question: QuestionType; answerSelectedCallback?: (id: number, index: number) => void }, prevState: any, snapshot: any) {
    if (prevProps.question !== this.props.question) {
      this.setState({
        question: this.props.question
      })
    }
  }

  render() {
    let answers = this.state.question.valueOptions.map((answer, index) =>
      <button key={this.state.question.id + "_" + index} onClick={() => {
        if (this.state.answerSelectedCallback) {
          this.state.answerSelectedCallback(this.state.question.id, index)
        }
      }}> {answer.text}</button >)
    return (
      <Styles>{
        (useStyles: any) => {
          const styles = useStyles(this.props)
          return (
            <p className={styles.container}>
              <div style={{ fontSize: 16, color: "#fff" }} > {this.state.question.text}
                <div>
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
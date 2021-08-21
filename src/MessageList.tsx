import React from "react";
import { createUseStyles } from "react-jss";
import { MessageType, QuestionType, SelectedAnswerType } from "./DataStructures/interfaces";
import { EndpointData, loadChatData, sendChatData } from "./Persistance";
import { Message } from "./Question";


function Styles({ children }: any): any {
  let styles = createUseStyles({
    container: {
      margin: "2em",
      display: "flex",
      marginTop: "1em",
      marginRight: "0.25em",
      height: "75%",
      flexFlow: "column",
      justifyContent: "bottom",
      alignItems: "bottom",
      overflowY: "scroll",
      marginBottom: "auto"
    }
  })
  return children(styles)
}

export class MessageList extends React.Component<{}, { questions: QuestionType[], currentQuestion: QuestionType | undefined, previousAnswers: SelectedAnswerType[], dataLoaded: boolean }> {

  messageEnd: HTMLDivElement | null = null;

  constructor(props: any) {
    super(props)
    this.state = {
      dataLoaded: false,
      questions: [],
      currentQuestion: undefined,
      previousAnswers: []
    }
  }

  componentDidMount() {
    loadChatData((response: any[]) => {
      let currentQuestion;
      for (let question of response) {
        if (question.id === 100) {
          currentQuestion = question
          break;
        }
      }
      this.setState({ 'questions': response, currentQuestion: currentQuestion, dataLoaded: true })
    })
  }

  getCurrentId(): number | undefined {
    return this.state.currentQuestion?.id
  }

  getQuestionById(id: number): QuestionType | undefined {
    for (let question of this.state.questions) {
      if (question.id === id) {
        return question
      }
    }
    return undefined
  }

  getCurrentQuestion(): QuestionType | undefined {
    return this.state.currentQuestion
  }

  handleSelection(id: number, index: number) {
    let previousAnswer: SelectedAnswerType = {
      question: this.getQuestionById(id)!,
      chosenAnswerIndex: index
    }
    let allAnswers = this.state.previousAnswers;
    allAnswers.push(previousAnswer)
    this.setState({
      currentQuestion: this.getQuestionById(this.state.currentQuestion!.valueOptions[index].nextId),
      previousAnswers: allAnswers
    })
  }

  scrollToBottom = () => {
    if (this.messageEnd)
      this.messageEnd.scrollIntoView({ behavior: "smooth" });
  }

  questionToMessage(question: QuestionType): MessageType {
    let message: MessageType = {
      text: question.text,
      id: question.id,
      answers: []
    }
    message.answers = question.valueOptions.map(el => {
      return el.text
    })
    return message
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  render() {
    if (!this.state.currentQuestion && this.state.previousAnswers.length != 0) {
      let data: EndpointData[] = this.state.previousAnswers.map(answer => { return { "name": answer.question.name, "value": answer.question.valueOptions[answer.chosenAnswerIndex].value } })
      sendChatData(data)
    }
    let previousQuestionsRender = this.state.previousAnswers.map(previousQuestion => {
      return (<div><Message received={true} question={this.questionToMessage(previousQuestion.question)} selected={previousQuestion.chosenAnswerIndex}></Message>
        <Message  question={{
          text: previousQuestion.question.valueOptions[previousQuestion.chosenAnswerIndex].text,
          id: 1, 
          answers: []
        }}></Message>
      </div>
      )
    }
    )

    if (this.state.dataLoaded) {
      return (
        <Styles>{
          (useStyles: any): JSX.Element => {
            const styles = useStyles(this.props)
            return (
              <div className={styles.container}>
                {previousQuestionsRender}
                {this.state.currentQuestion ?
                  <Message received={true} question={this.questionToMessage(this.state.currentQuestion)} answerSelectedCallback={(id, index) => this.handleSelection(id, index)}></Message>
                  :
                  <Message received={true} question={{
                    text: "Herzlichen Dank für Ihre Angaben", id: -1, answers: []
                  }}></Message>
                }
                <div ref={(el) => this.messageEnd = el} />
              </div>
            )
          }
        }
        </Styles>
      )
    }
    else {
      return (<div style={{ justifyContent: "center", display: "flex" }}>Loading...</div>)
    }
  }
}
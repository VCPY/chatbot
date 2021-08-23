import React from "react";
import { createUseStyles } from "react-jss";
import { EndpointData, loadChatData, sendChatData } from "./Persistance";
import { Message } from "./Message";
import { MessageType, QuestionType, SelectedAnswerType } from "./DataStructures/Interfaces";


function Styles({ children }: any): any {
  let styles = createUseStyles({
    container: {
      margin: "2em",
      display: "flex",
      marginTop: "1em",
      marginRight: "0.25em",
      height: "87%",
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
      for (let question of response) {
        if (question.id === 100) {
          this.setState({ 'questions': response, currentQuestion: question, dataLoaded: true })
          break;
        }
      }
    })
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
    message.answers = question.valueOptions.map(el => el.text)
    return message
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  render() {
    if (!this.state.currentQuestion && this.state.previousAnswers.length !== 0) {
      // Sends the received answers to the endpoint
      let data: EndpointData[] = this.state.previousAnswers.map(answer => { return { "name": answer.question.name, "value": answer.question.valueOptions[answer.chosenAnswerIndex].value } })
      sendChatData(data)
    }
    let previousQuestions = this.state.previousAnswers.map(previousQuestion => {
      return (
        <div key={previousQuestion.question.text + "div"}>
          <Message received={true} disableButtons={true} question={this.questionToMessage(previousQuestion.question)} selected={previousQuestion.chosenAnswerIndex}></Message>
          <Message
            question={{
              text: previousQuestion.question.valueOptions[previousQuestion.chosenAnswerIndex].text,
              id: previousQuestion.question.id + 0.5,
              answers: []
            }}>
          </Message>
        </div>
      )
    })

    if (this.state.dataLoaded) {
      return (
        <Styles>{
          (useStyles: any): JSX.Element => {
            const styles = useStyles(this.props)
            return (
              <div className={styles.container}>
                {previousQuestions}
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
      return (<div>Loading...</div>)
    }
  }
}
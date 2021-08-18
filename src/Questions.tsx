import React from "react";
import { createUseStyles } from "react-jss";
import { EndpointData, loadChatData, sendChatData } from "./Persistance";
import { Question } from "./Question";

export interface PossibleAnswerType {
    "nextId": number,
    "value": string,
    "text": string
}

export interface QuestionType {
    "id": number,
    "name": string,
    "text": string,
    "uiType": string,
    "valueType": string,
    "valueOptions": PossibleAnswerType[]
}

interface SelectedAnswerType {
    question: QuestionType,
    chosenAnswerIndex: number
}


export class QuestionList extends React.Component<{}, { questions: QuestionType[], currentQuestion: QuestionType | undefined, previousAnswers: SelectedAnswerType[] }> {

    constructor(props: any) {
        super(props)
        this.state = {
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
            this.setState({ 'questions': response, currentQuestion: currentQuestion })
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

    render() {
        if (!this.state.currentQuestion && this.state.previousAnswers.length != 0) {
            let data: EndpointData[] = []
            for (let answer of this.state.previousAnswers) {
                data.push({ name: answer.question.name, value: answer.question.valueOptions[answer.chosenAnswerIndex].value })
            }
            sendChatData(data)

        }
        let previousQuestionsRender = []
        for (let previousQuestion of this.state.previousAnswers) {
            previousQuestionsRender.push(<Question question={previousQuestion.question} selected={previousQuestion.chosenAnswerIndex}></Question>)
        }

        if (this.state.currentQuestion) {
            return (<div>
                {previousQuestionsRender}
                <Question question={this.state.currentQuestion} answerSelectedCallback={(id, index) => this.handleSelection(id, index)}></Question>
            </div>
            )
        }
        else {
            return (<div>{previousQuestionsRender}Gruß</div>)
        }
    }

}
import React from "react";
import { QuestionType } from "./Questions";


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
            <button key = {this.state.question.id + "_" + index} onClick={() => {
                if (this.state.answerSelectedCallback) {
                    this.state.answerSelectedCallback(this.state.question.id, index)
                }
            }}> {answer.text}</button >)
        return (<div>
            <div>{this.state.question.text}</div>
            {
                answers
            }
        </div>)
    }

}
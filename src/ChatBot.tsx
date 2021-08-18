import React from "react";
import { QuestionList } from "./Questions";

export module ChatBotModule {
    export class ChatBot extends React.Component {

        constructor(props: any) {
            super(props)
            this.state = {
                'questions': undefined
            }
        }

        render() {
            return (<div><QuestionList/></div>)
        }
    }
}


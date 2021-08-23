export interface MessageType {
    "text": string,
    "id": number,
    "answers": string[]
}

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

export interface SelectedAnswerType {
    "question": QuestionType,
    "chosenAnswerIndex": number
}

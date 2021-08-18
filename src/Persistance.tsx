export async function loadChatData(callback: (reponse: any[]) => void) {
    fetch('data/flow.json')
        .then(response => response.json())
        .then(jsonResponse => {
            callback(jsonResponse)
        })
}

export interface EndpointData {
    name: string,
    value: string
}

export async function sendChatData(data: EndpointData[]){
    const url = "https://virtserver.swaggerhub.com/L8475/task/1.0.0/conversation"
    fetch(url, {method:'PUT', body: JSON.stringify(data)})
}
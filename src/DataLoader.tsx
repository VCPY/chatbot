export async function loadChatData(callback: (reponse: any[]) => void) {
    fetch('data/flow.json')
        .then(response => response.json())
        .then(jsonResponse => {
            callback(jsonResponse)
        })
}
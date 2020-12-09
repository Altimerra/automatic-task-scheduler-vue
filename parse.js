//NOTE redesign to accept an array
onmessage = function(message) {
    let processedData = []
    if (message.data.action == 'parse') {
        for (data of message.data.data) {
            processedData.push(JSON.parse(data))
        }

    }
    if (message.data.action == 'stringify') {
        for (data of message.data.data) {
            processedData.push(JSON.stringify(data))
        }
    }
    postMessage(processedData)
}
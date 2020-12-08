onmessage = function(message) {
    var processedData
    if (message.data.action == 'parse') {
        processedData = JSON.parse(message.data.data)
    }
    if (message.data.action == 'stringify') {
        processedData = JSON.stringify(message.data.data)
    }
    postMessage(processedData)
}
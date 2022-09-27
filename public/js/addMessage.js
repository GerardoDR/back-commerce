const socket = io();

const msgs = document.querySelector("#msgs");

const addMessage = (e) => {
    const newMsg = {
        mail: document.getElementById('email').innerText,
        message: document.getElementById('content').value,
    }

    socket.emit('new-message', newMsg);
    return false;
}

socket.on('msgs', async (data) => {
    let listOfMessages="";
    for (const message of data) {
        listOfMessages += `<li><b> ${message.mail} </b><span> (${message.timestamp})</span><p><i> Dijo: ${message.message}</i></p></li>`
    }
    msgs.innerHTML = listOfMessages;
})

socket.on("connect", () => {
    console.log(socket.id);
});

socket.on("disconnect", (reason) => {
    console.log('reason: ' + reason);
});
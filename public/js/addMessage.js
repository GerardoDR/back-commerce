const socket = io.connect();
const msgs = document.querySelector("#msgs");
const addMessage = (e) => {
    const date = new Date();
    const formattedDate = `[${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;

    const newMsg = {
        email: document.getElementById('email').value,
        content: document.getElementById('mensaje').value,
        formattedDate
    }
    console.log(newMsg);
    socket.emit('new-message', newMsg);
    
    return false
}
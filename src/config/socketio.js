const ioWrapper = (server, auth) => {
    const io = require('socket.io')(server);
    io.use((socket, next) => {
        auth(socket.request, socket.request.res, next)
    })
    io.sockets.on('connection', (socket) => {
        console.log(socket.request.user._id)
    })
}

module.exports = { ioWrapper }
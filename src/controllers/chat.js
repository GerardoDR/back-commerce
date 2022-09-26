// const { io } = require('../config/socketio');
// const { logger } = require("../utils/logger");
// const srvcMsgs = require('../services/chat')

// const getChatPage = (req, res) => {

//     io.on("connection", async (socket) => {
//         try {
//             let msgs = await srvcMsgs.getAll();
//             socket.emit("messages", await res.render("loggedin", { msgs, user: req.user, displayPage: 'chat' }));
//         } catch (error) {
//             logger.error(error);
//         };

//         socket.on("new-message", async (message) => {
//             await srvcMsgs.save(message)
//             let msgs = await srvcMsgs.getAll();
//             io.sockets.emit("messages", await res.render("loggedin", { msgs, user: req.user, displayPage: 'chat' }));
//         });
//     });
// }

// module.exports = { getChatPage }

const ContainerMongoDb = require("../../containers/ContainerMongoDb");
const chatModel = require("../../models/chat");

class ChatsDaoMongoDb extends ContainerMongoDb {
    constructor(){
        super(chatModel);
    }
}

module.exports = ChatsDaoMongoDb;
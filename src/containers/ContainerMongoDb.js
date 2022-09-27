const mongoose = require("mongoose");
const { MONGO_URI } = require("../config/globals");
const { logger } = require("../utils/logger");

class ContainerMongoDb {
  static singleConnection;
  constructor(model) {
    if (ContainerMongoDb.singleConnection)
      return new ContainerMongoDb.singleConnection();
    (this.singleConnection = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })),
      () => logger.info("Connected to MongoDB");
    this.model = model;
  }

  async getAll() {
    let resp = await this.model.find();
    return resp;
  }

  async save(obj) {
    return await this.model.insertMany([obj]);
  }

  async getOne(id) {
    let resp = await this.model.findById(id);
    return resp;
  }

  async updateOne(id, values) {
    let resp = await this.model.findByIdAndUpdate(id, values);
    return resp;
  }

}
module.exports = ContainerMongoDb;

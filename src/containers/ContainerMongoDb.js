const mongoose = require("mongoose");
const { MONGO_URI } = require("../config/globals");
const { logger } = require("../utils/logger");

class ContainerMongoDb {
  constructor(model) {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
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

  async getOne(field, id) {
    let resp = await this.model.findOne({ [field]: id });
    return resp;
  }

  async updateOne(query, obj, options, cb) {
    let resp = await this.model.updateOne(query, { $set: obj }, options, cb);
    return resp;
  }
  /*

  async save(obj, id) {
    let objToDB = { ...obj, id };
    return await this.model.insertMany([objToDB], function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    });
  }

  async update(id, obj) {
    return await this.model.updateOne({ id }, obj);
  }

  async deleteById(id) {
    try {
      let res = await this.model.deleteOne({ id });
      return res;
    } catch (error) {
      console.log(error);
    }
  }*/
}
module.exports = ContainerMongoDb;

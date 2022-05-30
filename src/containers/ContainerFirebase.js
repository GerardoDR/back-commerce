let admin = require("firebase-admin");
let serviceAccount = require("../db/ecommerce-95116-firebase-adminsdk-j36f5-1b65d1fc56.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

class ContainerFirebase {
  constructor(collection) {
    this.collection = db.collection(collection);
    console.log(`Base conectada con la collection ${collection}`);
  }

  async getAll() {
    try {
      const snapshot = await this.collection.get();
      let docs = snapshot.docs
      let resp = docs.map((doc) => {
        let idDoc = doc.data();
        idDoc.id = doc.id;
        return idDoc;
      });
      return resp;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id) {
    try {
      const doc = await this.collection.doc(`${id}`).get();
      let idDoc = doc.data();
      idDoc.id = doc.id;
      return idDoc;
    } catch (error) {
      console.log(error);
    }
  }

  async save(obj, id) {
    try {
      let doc = this.collection.doc(`${id}`);
      let saved = await doc.create(obj);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, obj) {
    try {
      const doc = this.collection.doc(`${id}`);
      let res = await doc.update(obj);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const doc = this.collection.doc(`${id}`);
      const res = await doc.delete();
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports =  ContainerFirebase;

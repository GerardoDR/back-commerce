import mongoose from 'mongoose';
const { Schema, model, connect } = mongoose;

connect('mongodb+srv://gerardoDR:test1@cluster0.lkxvskd.mongodb.net/?retryWrites=true&w=majority')
const productsCollection = 'products';

const productSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  code:   {type: String, required: true},
  timestamp: {type: Date, default: Date.now},
  thumbnail: {type: String},
  price: {type: Number, required: true},
  stock: {type: Number, required: true}
});

export const products = model(productsCollection, productSchema);
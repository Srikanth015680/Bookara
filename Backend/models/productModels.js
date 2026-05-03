import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Number, required: true },
  popular: { type: Boolean, default: false }
},{timestamps:true});

const productModel = mongoose.model("Product", productSchema);
export default productModel;
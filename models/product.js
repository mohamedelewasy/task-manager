const mongoose = require("mongoose");
const COMPANIES = ["marcos", "liddy", "ikea", "caressa", "ewasy", "other"];
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, "title cannot be more than 20 characters!"],
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
  number: {
    type: Number,
    default: 1,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  company: {
    type: String,
    enum: COMPANIES,
    default: "other",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;

const productModel = require("../models/product");
const wrap = require("express-async-wrapper"); // catch errors then send server error response

const getAllProducts = wrap(async (req, res) => {
  let products = await productModel.find({ price: { gte: 30 } });
  res.status(200).json({ nbrHits: products.length, products });
});

const createProduct = wrap(async (req, res) => {
  let product = await productModel.create(req.body);
  res.status(201).json({ product });
});

const filterProducts = wrap(async (req, res) => {
  let { featured, company, name, price, rating, sort, page } = req.query;
  let queryObject = {}; // check request queries then add to queryObject

  // config numaric filters
  const operatorMap = {
    ">": "$gt",
    ">=": "$gte",
    "=": "$eq",
    "<": "$lt",
    "<=": "$lte",
  };
  const regEx = /(>=|<=|=|<|>)/g;

  // check query objects and add to queryObject
  if (featured) queryObject.featured = featured === "true" ? true : false;
  if (company)
    queryObject.company = productModel.COMPANT.includes(company)
      ? company
      : "other";
  if (name) queryObject.name = { $regex: name, $options: "i" };
  if (price) {
    price = price.replace(regEx, (match) => `${operatorMap[match]},`);
    let [operator, value] = price.split(",");
    queryObject.price = { [operator]: Number(value) };
  }
  if (rating) {
    rating = rating.replace(regEx, (match) => `${operatorMap[match]},`);
    let [operator, value] = rating.split(",");
    queryObject.rating = { [operator]: Number(value) };
  }

  let products = productModel
    .find(queryObject)
    .sort(sort ? sort.split(",").join(" ") : "createdAt")
    .select("name price rating company featured createdAt");

  // pagination
  page = page ? Number(page) : 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  products = products.skip(skip).limit(limit);
  products.sort(sort ? sort.split(",").join(" ") : "-createdAt");

  products = await products.exec();

  return res.status(200).json({ nbrHits: products.length, products });
});

module.exports = {
  getAllProducts,
  createProduct,
  filterProducts,
};

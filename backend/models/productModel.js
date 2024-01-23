const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: String,
  category: String,
  productImg: String,
  price: String,
  description: String,
  prod_id: String,
});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;

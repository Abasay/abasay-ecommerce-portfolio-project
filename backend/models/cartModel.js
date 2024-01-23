const mongoose = require('mongoose');

const cartModel = mongoose.Schema({
  user_cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  cart: [
    {
      name: String,
      category: String,
      productImg: String,
      price: String,
      description: String,
    },
  ],
});

const Cart = mongoose.model('Cart', cartModel);

module.exports = Cart;

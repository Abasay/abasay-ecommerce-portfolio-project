const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const { v2: cloudinary } = require('cloudinary');
const { v4: uuidv4 } = require('uuid');
const userModel = require('./models/userModel');
const productModel = require('./models/productModel');
const Cart = require('./models/cartModel');
const nodemailer = require('nodemailer');
const mailHandler = require('./handlers/mailHandler');
const signupMailHandler = require('./handlers/signUpMailHandler');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 8080;

//mongodb connecion
// console.log(process.env.MONGODB_URL);
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('connected to the database'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('server is running');
});

//Cloudinary connection
cloudinary.config({
  cloud_name: 'dsx79mhvl',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

//SignUp API
app.post('/signup', async (req, res) => {
  console.log(req.body);
  const { email, firstName, lastName } = req.body;

  try {
    const userSearch = await userModel.findOne({ email: email });

    if (userSearch) {
      console.log(userSearch);
      return res.send({ message: 'Email already in use', alert: false });
    } else {
      const userCloudinaryImg = await cloudinary.uploader.upload(
        req.body.imgUrl,
        { public_id: 'user' + uuidv4() }
      );
      const data = userModel({ ...req.body, imgUrl: userCloudinaryImg.url });
      const save = data.save();
      const signUpMail = await signupMailHandler(email, firstName, lastName);
      if (signUpMail.response) {
        return res.send({ message: 'Successfully signed up', alert: true });
      }
      return res.send({
        message: 'Error Signing up, please try again',
        alert: false,
      });
    }
  } catch (error) {
    res.send({ message: 'Failed to signup' });
  }
});

//Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userSearch = await userModel.findOne({ email: email });
    if (userSearch) {
      const dataToSend = {
        _id: userSearch._id,
        firstName: userSearch.firstName,
        lastName: userSearch.lastName,
        email: userSearch.email,
        password: userSearch.password,
        imgUrl: userSearch.imgUrl,
      };

      res.send({
        message: 'User Data found',
        alert: true,
        userData: dataToSend,
      });
    } else {
      res.send({ message: 'Invalid email or password', alert: false });
    }
  } catch (error) {
    console.log(error);
  }
});

//PRODUCT SECTION

//Upload Product API
//cloudinary.uploader.upload(body.image, {
//   public_id: 'profile pic',
// });
app.post('/upload-product', async (req, res) => {
  console.log(req.body);
  const prodData = req.body;

  const assertProduct = await productModel.findOne({ name: prodData.name });

  if (assertProduct) {
    res.send({
      status: 201,
      message: 'product already exist',
    });
  } else {
    try {
      const cloudinaryImage = await cloudinary.uploader.upload(
        prodData.productImg,
        { public_id: 'prod' + uuidv4() }
      );
      const data = await productModel({
        ...prodData,
        productImg: cloudinaryImage.url,
      });
      const save = data.save();
      res.send({
        status: 200,
        message: 'product uploaded successfully',
      });
    } catch (error) {
      //To be handled later
      console.log(error);
      console.log('Error uploading product');
    }
  }
});

app.get('/products', async (req, res) => {
  try {
    const allProducts = await productModel.find();
    console.log(allProducts);
    res.send({ products: allProducts });
  } catch (error) {
    console.log(error);
  }
});

//User Cart API
app.post('/get-cart', async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const user = await userModel.findOne({
      email: email,
    });

    const cart = await Cart.findOne({
      user_cart_id: user._id,
    });

    if (cart) {
      return res.status(200).json({ success: true, data: cart.cart });
    }
    return res.status(404).json({
      success: false,
      data: 'You have no item in your cart, please add item.',
    });
  } catch (error) {
    console.log(error);
  }
});

app.post('/upload-to-cart', async (req, res) => {
  const { email, name, category, productImg, price, description, prod_id } =
    req.body;
  let cart;
  try {
    const user = await userModel.findOne({
      email: email,
    });

    const userCartExist = await Cart.findOne({
      user_cart_id: user._id,
    });

    if (userCartExist) {
      cart = userCartExist;
      await cart.updateOne({
        $push: {
          cart: { name, category, productImg, price, description, prod_id },
        },
      });
    } else {
      cart = await Cart.create({
        user_cart_id: user.id,
        cart: [
          {
            name,
            category,
            productImg,
            price,
            description,
          },
        ],
      });
    }
    return res.status(200).json({
      success: true,
      message: 'product successfully added to the cart',
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to add product to cart.' });
  }

  await cart;
});

//Send Mail
app.post('/contact-us', async (req, res) => {
  const { email, phoneNumber, name, message } = req.body;
  try {
    const sendMessage = await mailHandler(email, message, name);

    if (sendMessage.response) {
      return res
        .status(200)
        .json({ success: true, message: 'message sent successfully' });
    }
    return res
      .status(500)
      .json({ success: false, message: 'Failed to send message.' });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

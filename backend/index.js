const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const { v2: cloudinary } = require('cloudinary');
const { v4: uuidv4 } = require('uuid');
const userModel = require('./models/userModel');
const productModel = require('./models/productModel');

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
  const { email } = req.body;

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
      return res.send({ message: 'Successfully signed up', alert: true });
    }
  } catch (error) {
    res.send({ message: 'Failed to signup' });
  }
});

//Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  console.log(email);
  const userSearch = await userModel.findOne({ email: email });
  console.log(userSearch);
  try {
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
  const allProducts = await productModel.find();
  console.log(allProducts);
  res.send({ products: allProducts });
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

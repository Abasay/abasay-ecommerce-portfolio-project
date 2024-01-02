const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

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

//schemas
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  confirmPassword: String,
  imgUrl: String,
});

const userModel = mongoose.model('user', userSchema);

app.get('/', (req, res) => {
  res.send('server is running');
});

//SignUp API
app.post('/signup', async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  try {
    const userSearch = await userModel.findOne({ email: email });

    if (userSearch) {
      console.log(userSearch);
      res.send({ message: 'Email already in use', alert: false });
    } else {
      const data = userModel(req.body);
      const save = data.save();
      res.send({ message: 'Successfully signed up', alert: true });
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
const productSchema = mongoose.Schema({
  name: String,
  category: String,
  productImg: String,
  price: String,
  description: String,
});

const productModel = mongoose.model('product', productSchema);

//Upload Product API
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
      const data = await productModel(req.body);
      const save = data.save();
      res.send({
        status: 200,
        message: 'product uploaded successfully',
      });
    } catch (error) {
      //To be handled later
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

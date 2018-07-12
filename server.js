const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app_dev';

app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.render('index.ejs');
// });

const usersController = require ('./controllers/users.js');
app.use('/users', usersController);

app.listen(PORT, () => {
  console.log('listening');
});

mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.on('open', () => {
    console.log('connected to mongoose');
});

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const keys = require('./config/keys');

const app = express();
mongoose.connect(keys.mongoURI)
.then(()=> console.log('gg'))
.catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)




//http://localhost:5000/api/auth/
//http://localhost:5000/api/auth/login
app.use(morgan('dev'))
app.use(cors())


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use('/api/auth',authRoutes);
app.use('/api/analytics',analyticsRoutes);
//http://localhost:5000/api/category
app.use('/api/category',categoryRoutes);
app.use('/api/order',orderRoutes);
app.use('/api/position',positionRoutes);

module.exports = app;
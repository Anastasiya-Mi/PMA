const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');

const app = express();
mongoose.connect('mongodb://Nastia:fhu275YLK@ac-a0wslyr-shard-00-00.l79puhl.mongodb.net:27017,ac-a0wslyr-shard-00-01.l79puhl.mongodb.net:27017,ac-a0wslyr-shard-00-02.l79puhl.mongodb.net:27017/?ssl=true&replicaSet=atlas-12zcbf-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(()=> console.log('gg'))
.catch(error => console.log(error))






//http://localhost:5000/api/auth/
//http://localhost:5000/api/auth/login
app.use(morgan('dev'))
app.use(cors())


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use('/api/auth',authRoutes);
app.use('/api/analytics',analyticsRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/order',orderRoutes);
app.use('/api/position',positionRoutes);

module.exports = app;
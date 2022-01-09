const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRoutes = require('./routes/useRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
dotenv.config();
connectDB();

app.use('/', userRoutes);
// res.header('Access-Control-Allow-Origin', '*');

app.use(notFound);
app.use(errorHandler);

app.listen(5000, console.log('Server started on PORT 5000'));

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(e);
    process.exit();
  }
};

module.exports = connectDB;

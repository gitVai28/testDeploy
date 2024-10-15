const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongo_url = process.env.MONGO_URL;
    if (!mongo_url) {
      throw new Error('MONGO_URL is not defined in the environment variables');
    }

    await mongoose.connect(mongo_url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

module.exports = mongoose;
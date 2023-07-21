import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    userId: {
      type: String,
      unique: true,
      required: true
    },
    lat: {
      required: true,
      type: String
    },
    long: {
      required: true,
      type: String
    },
    status: {
      type: String,
      required: true
    }
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
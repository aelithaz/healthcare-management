import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  name: String,
  ID: String,
  email: String,
  password: String
}, {
  collection: 'accountList'
});

export default mongoose.model('Account', accountSchema);
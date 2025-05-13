import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ID: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { type: String, required: true, minlength: 6 }
}, {
  collection: 'accountList',
  timestamps: true // Add createdAt and updatedAt fields
});

export default mongoose.model('Account', accountSchema);
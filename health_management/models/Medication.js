import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
  PID: String,
  DID: String,
  medication: String,
  dosage: String,
  frequency: String,
  refillDate: String,
  status: String
}, {
  collection: 'medicationList'
});

export default mongoose.model('Medication', medicationSchema);
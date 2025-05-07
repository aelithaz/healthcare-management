import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  apt_dateTime: String,
  apt_name: String,
  DID: String,
  PID: String
}, {
  collection: 'appointmentList'
});

export default mongoose.model('Appointment', appointmentSchema);
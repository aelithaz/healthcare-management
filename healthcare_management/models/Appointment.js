import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  apt_time: String,
  DID: String,
  PID: String,
  content: String
});

export default mongoose.model('Appointment', appointmentSchema);
import Appointment from '../models/Appointment.js';

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ apt_time: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

export const createAppointment = async (req, res) => {
  const { apt_time, DID, PID, content } = req.body;
  try {
    const newAppointment = new Appointment({ apt_time, DID, PID, content });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create appointment' });
  }
};
import Appointment from '../models/Appointment.js';
import Medication from '../models/Medication.js';

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ apt_dateTime: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMedications = async (req, res) => {
  try {
    const medications = await Medication.find();
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAppointment = async (req, res) => {
  const { apt_dateTime, apt_name, DID, PID } = req.body;
  try {
    const newAppointment = new Appointment({ apt_dateTime, apt_name, DID, PID });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create appointment' });
  }
};

export const createMedication = async (req, res) => {
  const { PID, DID, medication, dosage, frequency, refillDate, status } = req.body;
  try {
    const newMedication = new Medication({
      PID,
      DID,
      medication,
      dosage,
      frequency,
      refillDate,
      status
    });
    await newMedication.save();
    res.status(201).json(newMedication);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create medication' });
  }
};
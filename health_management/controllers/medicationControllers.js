import Medication from '../models/Medication.js';

export const getMedications = async (req, res) => {
  try {
    const medications = await Medication.find();
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
import express from 'express';
import { getAppointments, getMedications, createAppointment } from '../controllers/appointmentControllers.js';
import Medication from '../models/Medication.js';

const router = express.Router();

router.get('/', getAppointments);
router.get('/medications', async (req, res) => {
    console.log("📥 GET /api/appointments/medications hit");
    const meds = await Medication.find();
    res.json(meds);
});
router.post('/', createAppointment);

export default router;
import express from 'express';
import { getAppointments, getMedications, createAppointment } from '../controllers/appointmentControllers.js';

const router = express.Router();

router.get('/', getAppointments);
router.get('/medications', getMedications);
router.post('/', createAppointment);

export default router;
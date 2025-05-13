import express from 'express';
import { getMedications, createMedication } from '../controllers/medicationControllers.js';

const router = express.Router();

router.get('/', getMedications);
router.post('/', createMedication);

export default router;
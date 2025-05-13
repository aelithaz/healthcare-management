import express from 'express';
import { getAccounts, createAccount, loginAccount } from '../controllers/accountControllers.js';

const router = express.Router();

router.get('/', getAccounts); // Fetch all accounts (for debugging or reference)
router.post('/signup', createAccount); // Create a new account
router.post('/login', loginAccount); // Login with credentials

export default router;
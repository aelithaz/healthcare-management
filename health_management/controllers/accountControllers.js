import bcrypt from 'bcrypt';
import Account from '../models/Account.js';

// Get all accounts (for reference or debugging)
export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Server error' });
  }
};

// Create a new account (Sign-Up)
export const createAccount = async (req, res) => {
  const { ID, name, email, password } = req.body;

  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Check for duplicate email
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Validate role (ID prefix)
    if (!ID.startsWith('doc') && !ID.startsWith('pat')) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the account
    const newAccount = new Account({ ID, name, email, password: hashedPassword });
    await newAccount.save();

    res.status(201).json({ message: 'Account created successfully', account: { ID, name, email } });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create account', details: err instanceof Error ? err.message : 'Server error' });
  }
};

// Login and validate credentials
export const loginAccount = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Find the account by email
    const account = await Account.findOne({ email });
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Check role-based validation
    if (role === 'doctor' && !account.ID.startsWith('doc')) {
      return res.status(403).json({ message: 'Unauthorized role for doctor' });
    } else if (role === 'patient' && !account.ID.startsWith('pat')) {
      return res.status(403).json({ message: 'Unauthorized role for patient' });
    }

    // Successful login
    res.status(200).json({
      message: 'Login successful',
      ID: account.ID,
      name: account.name,
      role,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      details: err instanceof Error ? err.message : 'Unknown error',
    });
  }
};
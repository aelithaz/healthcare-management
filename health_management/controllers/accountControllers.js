import Account from '../models/Account.js';

export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAccount = async (req, res) => {
    const { ID, name, email, password } = req.body;
    try {
      const newAccount = new Account({ ID, name, email, password });
      await newAccount.save();
      res.status(201).json(newAccount);
    } catch (err) {
      res.status(400).json({ error: 'Failed to create account' });
    }
};
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Account from './models/Account.js';

// Load environment variables from .env file
dotenv.config();

// MongoDB connection string from .env
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
  try {
    // Fetch all accounts from the database
    const accounts = await Account.find();

    for (const account of accounts) {
      // Check if the account has a password field
      if (!account.password) {
        console.warn(`Account with email ${account.email} has no password. Skipping...`);
        continue;
      }

      // Check if the password is already hashed
      if (!account.password.startsWith('$2b$')) {
        // Hash the plaintext password
        const hashedPassword = await bcrypt.hash(account.password, 10);
        account.password = hashedPassword;

        // Save the updated account back to the database
        await account.save();
        console.log(`Password for account ${account.email} has been hashed.`);
      } else {
        console.log(`Password for account ${account.email} is already hashed.`);
      }
    }

    console.log('Database passwords updated successfully.');
  } catch (error) {
    console.error('Error updating database passwords:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
})();
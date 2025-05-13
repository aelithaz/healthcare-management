import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import appointmentRoutes from './routes/appointmentRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables early
dotenv.config();
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set in the environment variables.');
  process.exit(1);
}

console.log('🔍 Loaded MONGODB_URI:', process.env.MONGODB_URI);

// Resolve __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

app.use('/api/appointments', appointmentRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/accounts', accountRoutes);
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all: send index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Closing MongoDB connection...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed.');
  process.exit(0);
});

const port = process.env.PORT || 3001;
app.listen(port, '0.0.0.0', () => console.log(`🚀 Server running on http://localhost:${port}`));
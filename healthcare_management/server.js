import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import appointmentRoutes from './routes/appointmentRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables early
dotenv.config();
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
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all: send index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, '0.0.0.0', () => console.log(`🚀 Server running on http://localhost:${port}`));
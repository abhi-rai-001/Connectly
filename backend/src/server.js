import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';
import { connectDB } from './lib/db.js';

const app = express();
const __dirname = path.resolve();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Allow cookies with requests
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  // Serve static assets
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Catch-all route **after** all API routes
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
});
}

// Start server
app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
  connectDB();
});
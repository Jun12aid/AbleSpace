const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./modules/auth/auth.routes.js');
const taskRoutes = require('./modules/task/task.routes.js');
const userRoutes = require('./modules/user/user.routes.js');

const app = express();

// Middleware
constconst cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server, curl, mobile apps
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // 🔴 IMPORTANT: do NOT throw error in prod
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use("/api/users", userRoutes);

module.exports = app;

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./modules/auth/auth.routes.js');
const taskRoutes = require('./modules/task/task.routes.js');
const userRoutes = require('./modules/user/user.routes.js');

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://able-space-1995kzec2-junaid-shaikhs-projects-a5f3dbdd.vercel.app,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
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

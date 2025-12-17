const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./modules/auth/auth.routes.js');
const taskRoutes = require('./modules/task/task.routes.js');
const userRoutes = require('./modules/user/user.routes.js');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
# 🧑‍💻 Collaborative Task Manager

A full-stack task management application with real-time collaboration.

## 🚀 Live Links
- Frontend: https://able-space-seven.vercel.app/ 
- Backend API: https://ablespace-5.onrender.com

## 🛠 Tech Stack
- Frontend: React, Vite, Tailwind CSS, React Query
- Backend: Node.js, Express
- Database: MongoDB + Mongoose
- Auth: JWT (HttpOnly Cookies)
- Real-Time: Socket.io
- Deployment: Vercel, Render

## 🏗 Architecture
Backend follows a modular architecture:
- Controllers → request/response
- Services → business logic
- Repositories → database access
- DTOs → validation layer

Frontend uses:
- React Query for server state
- Optimistic UI updates
- Shared cache between pages

## 🔐 Authentication
- Secure login/register
- Password hashing with bcrypt
- JWT stored in HttpOnly cookies

## ⚡ Real-Time Features
- Live task updates
- Assignment notifications via Socket.io rooms

## 📊 Dashboard Features
- Tasks assigned to user
- Tasks created by user
- Overdue task detection
- Filtering and sorting

## 🧪 Testing
- Jest unit tests for critical services (bonus)

## ⚙️ Setup Instructions

### Backend
```bash
cd backend
npm install
npm run dev


cd frontend
npm install
npm run dev

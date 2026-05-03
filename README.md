# 🗂️ Task Manager Pro — Team Collaboration Suite

> A robust full-stack project management app for teams to create projects, assign tasks, and track real-time progress with role-based access control.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Railway-blueviolet?style=for-the-badge)](https://fantastic-nurturing-production-f003.up.railway.app)
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---
## 🌐 Go to Website

Click here to access the live application (Railway Link): **[Task Manager Pro Live](https://fantastic-nurturing-production-5ac3.up.railway.app)**

Click here to access the live application (Vercel Link): **[Task Manager Pro Live](https://task-manager-pro-xv48.vercel.app)**

---


## ✨ Features

| Feature | Description |
|---|---|
| 🔒 **Secure Auth** | Complete Signup & Login flow with secure session management |
| 👥 **Role-Based Access (RBAC)** | Scoped permissions for Admin and Member roles |
| 📊 **Interactive Dashboard** | Visual overview of Pending, In-Progress & Completed tasks |
| 🎨 **Modern UI/UX** | Dark theme with Glassmorphism & Cyberpunk aesthetics |
| ⚡ **Real-time DB Sync** | Seamless PostgreSQL operations via Prisma ORM |

---

## 🛡️ Role Permissions

### 👑 Admin
- Create and manage projects
- Add/remove team members
- Assign and delegate tasks

### 👤 Member
- View assigned tasks
- Update task completion status
- Track personal progress

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16 (App Router), Tailwind CSS, Lucide Icons |
| **Backend** | Next.js API Routes (Serverless) |
| **Database** | PostgreSQL (hosted on Railway) |
| **ORM** | Prisma |
| **Deployment** | Railway (CI/CD via GitHub Integration) |

---

## 🚀 Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/bhumika564/task-manager-pro.git
cd task-manager-pro
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="your_postgresql_railway_url"
AUTH_SECRET="your_secure_auth_key"
NEXT_PUBLIC_API_URL="https://fantastic-nurturing-production-f003.up.railway.app"
```

### 4. Sync the database
```bash
npx prisma generate
npx prisma db push
```

### 5. Start the development server
```bash
npm run dev
```

---

## 📁 Project Structure

```
├── app/
│   ├── api/          # Serverless API routes (Auth, Task, Project)
│   ├── dashboard/    # Core dashboard UI and logic
│   └── lib/          # Prisma client & shared utilities
├── prisma/           # Database schema definitions
└── components/       # Reusable UI (Modals, Cards, Buttons)
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user |
| `GET` | `/api/tasks` | Retrieve user-specific tasks |
| `PATCH` | `/api/tasks/[id]` | Update task status |
| `DELETE` | `/api/tasks/[id]` | Remove a specific task |

---

## 👩‍💻 Developer

**Bhumika Sharma**
*AI & Data Science Engineering Student*

---

<p align="center">Made with ❤️ by Bhumika Sharma</p>

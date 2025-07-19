## 📝 Todo App

A simple and modern Todo List application built with **React** and deployed on **Vercel**.

🔗 Live Demo: [todo-app-sable-theta.vercel.app](https://todo-app-sable-theta.vercel.app/)

### ✨ Features

* ✅ Add, edit, and delete tasks
* 🗕️ Calendar view to manage tasks by date
* ✍️ Inline editing and task completion toggle
* 🛆 Persistent data via localStorage (or API-ready structure)

### 🚀 Tech Stack

* **Frontend:** React + Ant Design
* **State Management:** useState, useEffect
* **Deployment:** Vercel

### 🔐 Authentication with JWT

This app uses **JWT (JSON Web Token)** for user authentication.

* After login/signup, a token is issued and stored in **localStorage**.
* All protected routes require an `Authorization` header with the following format:

```
Authorization: Bearer <your_token>
```

Example:

```http
GET /api/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

> ⚠️ Token expires in `1 day` by default. Make sure to handle token refresh if needed.

### 📂 Project Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/todo-app.git

# 2. Install dependencies
cd todo-app
npm install

# 3. Start the app
npm run dev
```

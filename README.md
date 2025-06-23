# ⚡ QuizAIzer

**QuizAIzer** is an AI-powered quiz generator that lets users create quizzes from custom text, attempt them, and track performance — all in a sleek dark UI.

> ✨ Powered by **Cohere AI**, protected with **JWT Auth**, and backed by a full-stack MERN architecture.

---

## 🚀 Features

- 🤖 AI-based MCQ Generation (Cohere AI)
- 🔐 JWT-authenticated login/register
- 📊 User Quiz Analytics & Dashboard
- 📄 View & Attempt Saved Quizzes
- 🧠 Typing Effects, Animations, and TSParticles
- 🌙 Dark Monstrous Theme UI

---

## 🛠 Tech Stack

### 🎨 Frontend
- **React.js** + **React Router DOM**
- **Axios** for HTTP communication
- **Framer Motion** (for animations)
- **React Simple Typewriter**
- **react-tsparticles** (interactive particles)
- **HTML5**, **CSS3**, **Custom Responsive Styling**

### 🔧 Backend
- **Node.js** & **Express.js**
- **JWT (JSON Web Token)** Authentication
- **CORS**, **dotenv**, **body-parser**

### 🧠 AI / NLP
- **Cohere AI Generate API** (text-to-quiz logic)

### 💾 Database
- **MongoDB** (cloud-hosted on MongoDB Atlas)
- **Mongoose** (ODM)

### 🧪 Others
- **RESTful APIs**
- **ESLint + Prettier (optional)**
- **Environment Configs with .env**

---

## 🔒 Security
- 🔑 Authentication via JWT (Stored Securely)
- 🧊 Passwords hashed using bcrypt
- 🛡️ Protected Routes using Middleware

---

## 📁 Folder Structure

```bash
QuizAIzer/
├── client/         # React frontend
├── server/         # Express backend
├── .env            # Environment variables (never push)
├── .gitignore
├── README.md

# 🧑‍💻 Getting Started (Local Setup)

## Clone the repository
git clone https://github.com/itsprt07/QuizAIzer.git
cd QuizAIzer

## Install server dependencies
cd server
npm install

## Install client dependencies
cd ../client
npm install



# ▶ Start Development Servers

## Run Backend (from /server)
npm start

## Run Frontend (from /client)
npm start



# 📜 License

This project is open-source and available under the MIT License.



# 🙏 Acknowledgements
Cohere AI

MongoDB Atlas

react-simple-typewriter

tsparticles
# 🚀 Aryan Gupta — Full Stack MERN Portfolio

A professional, cinematic **personal portfolio website** built with the **MERN Stack** (MongoDB, Express, React, Node.js). Features 3D animations, a fully connected contact form, resume download, certifications showcase, and dark/light mode.

🌐 **Live Frontend:** [portfolio-full-stack-assignment.vercel.app](https://portfolio-full-stack-assignment.vercel.app)  
🔧 **Live Backend API:** [portfolio-backend on Render](https://portfolio-backend.onrender.com)

---

## ✨ Features

| Section | Description |
|---|---|
| **Hero** | 3D interactive resume stack, typewriter effect, animated entrance |
| **About** | Professional bio, ID card, skills summary, story sections |
| **Skills** | Animated progress bars, category filters, tech marquee |
| **Projects** | 5 project cards with tech stack, modal viewer, category filter |
| **Experience** | Alternating animated vertical timeline |
| **Certifications** | Filterable certificate cards + achievement highlights |
| **Contact** | Live form connected to Express + MongoDB backend |
| **Resume Download** | PDF & DOCX generated dynamically via backend |
| **Dark / Light Mode** | Toggle with localStorage persistence |

---

## 🛠 Tech Stack

### Frontend
- **React.js** with React Router (SPA)
- **Framer Motion** + **GSAP** for animations
- **Three.js** / `@react-three/fiber` for 3D resume stack
- **Vite** as build tool
- **Vanilla CSS** with CSS custom properties

### Backend
- **Node.js** + **Express.js** REST API
- **MongoDB Atlas** + **Mongoose** ODM
- **pdfkit** for dynamic PDF generation
- **docx** for dynamic DOCX generation

---

## 🚀 Local Development Setup

### 1. Clone the repo
```bash
git clone https://github.com/aryangupta92/Portfolio-Full-Stack-Assignment.git
cd Portfolio-Full-Stack-Assignment
```

### 2. Start the Backend
```bash
cd server
cp .env.example .env
# Edit .env and add your MongoDB Atlas connection string
npm install
npm run dev
# Backend runs on http://localhost:5000
```

### 3. Start the Frontend
```bash
# Back in root directory
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### 4. Environment Variables

**`server/.env`**
```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio
PORT=5000
CLIENT_URL=http://localhost:5173
```

**Root `.env.local`** (optional for frontend)
```env
VITE_API_URL=http://localhost:5000
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `POST` | `/api/contact` | Save contact form message to MongoDB |
| `GET` | `/api/messages` | Get all contact messages |
| `GET` | `/api/download/pdf` | Download resume as PDF |
| `GET` | `/api/download/docx` | Download resume as DOCX |

---

## 📁 Project Structure

```
Portfolio/
├── src/                    # React Frontend
│   ├── components/         # Navbar, ResumeStack3D, ResumeBook
│   ├── pages/              # Home, About, Skills, Projects, Experience, Certifications, Contact
│   ├── data/               # portfolio.js (centralized content)
│   └── styles/             # globals.css
├── server/                 # Express Backend
│   ├── models/             # Message.js (Mongoose schema)
│   ├── routes/             # contact.js, resume.js
│   └── server.js           # App entry point
├── public/                 # Static assets
├── render.yaml             # Render deployment config
├── vercel.json             # Vercel SPA routing config
└── README.md
```

---

## 🚢 Deployment

| Service | Platform | Notes |
|---|---|---|
| Frontend | **Vercel** | Auto-deploys on push to `main` |
| Backend | **Render** | Free web service, `server/` root dir |
| Database | **MongoDB Atlas** | Free M0 cluster |

---

## 👨‍💻 Author

**Aryan Gupta**  
B.Tech Computer Science — JK Lakshmipat University, Jaipur  
📧 aryan.gupta9352@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/aryan-gupta-a161b4314/) · [GitHub](https://github.com/aryangupta92)

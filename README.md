# 🚀 CodeArena — Premium Full-Stack Interactive Coding Platform

CodeArena is a state-of-the-art, full-stack interactive coding platform designed to make learning programming fun, structured, and collaborative. It combines a multi-language online judge, real-time Socket.IO chat rooms, a persistent note-taking system with built-in AI assistance, collaborative drawing boards (scribble pad), and a robust admin dashboard for curated problem management.

Built using **React (Vite)**, **Node.js/Express**, **MongoDB**, **Redis**, **Socket.IO**, and powered by **Google Gemini AI** and the **Judge0 API**.

---

## 🚀 Key Features & Architecture

* **🔐 Secure JWT Cookie Authentication**: Supports secure user sessions via JWT tokens stored in HTTP-only cookies, combined with a Redis-based blacklist database for secure token invalidation upon logout.
* **💻 High-Performance Online Judge**: Multi-language code runner powered by the **Judge0 API**. Executes code instantly, showing output, runtime execution speed, and memory usage.
* **🛠️ Admin Panel & Editorial Workspace**: Dedicated admin portal supporting full CRUD operations on problems. Features Description and Constraints management, and uploads video editorials directly via **Cloudinary**.
* **📝 Smart Persistent Notes**: Problem-specific note-taking that syncs securely with MongoDB, allowing users to save and review key concepts while solving questions.
* **🤖 Gemini AI Coding Assistant**: An interactive side-panel assistant that guides developers, provides hints, explains runtime errors, and optimizes complexity without giving away the direct solution.
* **🧩 Visual Scribble Pad**: Drawing and mind-mapping canvas integrated directly into the workspace using Fabric, Excalidraw, and Tldraw for dry-running algorithms, mapping recursion trees, and visualizing data structures.
* **💬 Real-Time Chat Rooms**: Live collaboration and peer programming facilitated by **Socket.IO** rooms, encouraging team problem-solving and immediate feedback.

---

## 🗺️ System Design

```
                      [JWT Cookie Auth Gate]
                                 │
                                 ▼
                    ┌────── [Dashboard] ──────┐
                    │                         │
                    ▼                         ▼
            [Admin Interface]         [User Playground]
            - CRUD Problems           - Problem Search & Grid
            - Video Editorial Upload  - Topic & Difficulty tags
            - Cloudinary Integration  - Overall Solving Progress
                    │                         │
                    └───────────┬─────────────┘
                                │
                                ▼
         ┌───────────── [Problem Workspace] ─────────────┐
         │                      │                        │
         ▼                      ▼                        ▼
 [Interactive Editor]     [Scribble Pad & Notes]   [AI Coding Assistant]
 - Judge0 Multi-Lang API  - Vector Canvas / Draw   - Gemini Logic Coach
 - Performance Scoring    - Structured Markdown   - Chat history cached
 - Real-time Execution    - DB-Sync Persistence    - Prompt-based tips
         │                      │                        │
         └──────────────────────┼────────────────────────┘
                                │
                                ▼
                     ┌───────────────────┐
                     │   Socket.IO Hub   │
                     ├───────────────────┤
                     │  Real-Time Chat   │
                     │  - Group learning │
                     │  - Message sync   │
                     └───────────────────┘
```

---

## 🛠️ Tech Stack

* **Frontend Framework**: React 19 (Vite, React Router 7)
* **State Management**: Redux Toolkit (auth state, problem slices)
* **Backend Architecture**: Node.js, Express.js (REST APIs, Socket.IO WebSockets)
* **Database & Cache**: MongoDB (Mongoose ORM), Redis (Session token blacklist)
* **AI/LLM Integration**: Google Gemini API (`@google/genai`)
* **Code Compiler Engine**: Judge0 API (Universal multi-language runtime)
* **UI & Aesthetics**: Tailwind CSS, DaisyUI, Monaco Editor (`@monaco-editor/react`), Lucide Icons
* **Media Storage**: Cloudinary SDK (for video editorial content)
* **Client Canvas/Drawing**: Fabric.js, Excalidraw, Tldraw, React Sketch Canvas

---

## ⚙️ Quick Start

### 1. Prerequisites
- **Node.js** (v18+ installed)
- **MongoDB** (Local instance or MongoDB Atlas URI)
- **Redis** (Local instance or cloud provider like Upstash/Aiven)
- **Gemini API Key** (Get yours from [Google AI Studio](https://aistudio.google.com/apikey))
- **Judge0 API Key** (RapidAPI or custom hosted instance)
- **Cloudinary Account** (For uploading video solutions)

### 2. Installation
Clone the repository and install dependencies for both services:

```bash
# Clone the repository
git clone https://github.com/your-username/CodeArena.git
cd CodeArena

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup
Create a `.env` file inside the `backend` folder:

```bash
touch backend/.env
```

Populate the `backend/.env` file with the following variables:
```env
# Database Configuration
DB_CONNECT_STRING="mongodb+srv://<username>:<password>@cluster.mongodb.net/codearena"

# Authentication Security
JWT_KEY="your_super_secret_jwt_sign_key"

# Redis Credentials
REDIS_PASS="your_redis_auth_password_if_any"

# Gemini AI Credentials
GEMINI_KEY="your_google_gemini_api_key"

# Code Execution Credentials
JUDGE0_KEY="your_judge0_rapidapi_key"

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

# Server Port
PORT=5000
```

---

### 4. Running the Application

Set up your Redis server locally and run both the server and client:

```bash
# 1. Start your local Redis server
redis-server

# 2. Run the Backend Server (from backend directory)
npm start
# or run with nodemon
npx nodemon src/index.js

# 3. Run the Frontend App (from frontend directory)
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser to launch the CodeArena platform!

---

## 🔐 Authentication & Security Flow

1. **Credentials verification**: User inputs are sanitized using `validator` and stored with bcrypt-hashed passwords.
2. **JWT Token Issuance**: The server generates a signed JSON Web Token (JWT) containing user identifiers.
3. **HTTP-only Cookies**: The JWT token is sent back in an HTTP-only, secure cookie with properties:
   - `httpOnly: true` (Protected against XSS attacks/document.cookie access)
   - `secure: true` (Sent only over HTTPS)
   - `sameSite: 'None'` (Allows cross-domain cookie passing for decoupled frontend-backend)
4. **Redis-based Blacklist**: On logout, the token is saved in Redis with a TTL matching the token's remaining lifespan, ensuring immediate session revocation.

---

## 🐞 Challenges Faced & Solutions

* **Cross-Origin Cookie Propagation (CORS)**: Solved domain cookie issues between decoupled server/client architectures by enforcing `credentials: true` and configuring permissive origin controls on backend Express instances.
* **401 Unauthorized Errors in Production**: Resolved production token issues by configuring `SameSite=None` and `Secure` cookie parameters on cookies served via HTTPS deployment instances.
* **Token Blacklisting Efficiency**: Prevented unauthorized API calls after logout by blacklisting active JWTs inside an in-memory **Redis** cache using optimized TTL rules.
* **Real-time Synchronization**: Handled Socket.IO connection drops and room routing by linking MongoDB message persistence directly within Socket events for reliable historical chat loading.
* **Admin Content Pipeline**: Built custom media streaming integration using Cloudinary SDK, processing large-chunk video solutions securely.
* **Complex Workspace Layouts**: Integrated Excalidraw, Tldraw, and Redux Toolkit slices concurrently within a multi-pane split view, maintaining clean state updates without performance lag.

---

## 📌 Upcoming Features

* 💳 **Subscription-Based Models**: Premium tiers for advanced mock exams, company-specific tracks, and expert-reviewed solutions.
* ⚔️ **Coding Battle Playgrounds**: Real-time 1v1 coding match lobbies with competitive scoring and countdown timers.
* 📊 **Leaderboards & User Rankings**: Badges, streaks, and global/weekly rankings to boost platform engagement.
* 🧠 **Advanced AI Explainer Mode**: Integration of Gemini's multimodal features to parse drawings/scribbles directly for visual architectural reviews.
* 🧪 **Scalable Code Execution**: Moving from shared API execution models to isolated sandbox container execution.

---

## 🎯 Key Highlights

* Fully responsive cyberpunk/modern dark UI/UX design.
* Production-ready state management powered by Redux Toolkit.
* End-to-end sandbox code testing (Judge0).
* Instant real-time communication via Socket.IO hubs.
* Secure and robust sessions (JWT + Cookies + Redis).

---

## 👨‍💻 Author

**Saurabh Suman**
* 🎓 Computer Science & Engineering @ Delhi Technological University (DTU)
* 💡 Passionate about building high-performance, developer-first tooling and scalable ecosystems.

---

*If you find this project useful, please consider giving it a ⭐ on GitHub!*

<div align="center">

# 💼 JobPortal

**A full-stack job portal for connecting talented professionals with innovative companies.**

React + Vite · Express · MongoDB · Tailwind CSS

</div>

---

## ✨ Overview

JobPortal is a two-sided job marketplace with dedicated experiences for **Job Seekers** and **Employers**. Built as two separate applications — a modern React frontend and a RESTful Express API backed by MongoDB.

> **Status:** Project is feature-complete for both roles. See the [Roadmap](#-roadmap) for planned enhancements.

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | [React 19](https://react.dev) · [Vite 7](https://vitejs.dev) · [React Router 7](https://reactrouter.com) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) · [Framer Motion](https://www.framer.com/motion/) · [lucide-react](https://lucide.dev) |
| **Backend** | [Express 5](https://expressjs.com) · [Node.js](https://nodejs.org) |
| **Database** | [MongoDB](https://www.mongodb.com) · [Mongoose 8](https://mongoosejs.com) |
| **Auth** | JWT · bcrypt |
| **HTTP** | Axios · Multer (file uploads) |
| **Package Manager** | [pnpm](https://pnpm.io) |

---

## 🗂️ Project Structure

```
jobportal/
├── backend/                 # Express REST API
│   ├── config/              # Database connection
│   ├── controllers/         # Route handlers (auth, jobs, applications…)
│   ├── middlewares/         # JWT auth & file upload
│   ├── models/              # Mongoose schemas (User, Job, Application…)
│   └── routes/              # API route definitions
└── frontend/                # React single-page application
    └── src/
        ├── components/      # Reusable UI (cards, inputs, layouts)
        ├── context/         # Auth state management
        ├── pages/           # Route-level views
        │   ├── Auth/        # Login & Sign Up
        │   ├── Employer/    # Employer dashboard & tools
        │   ├── JobSeeker/   # Find jobs, details, saved & profile
        │   └── LandingPage/ # Public marketing pages
        ├── routes/          # Protected route guards
        └── utils/           # Axios instance, API paths, helpers
```

---

## ✨ Features

### 👤 Job Seekers
- **Find Jobs** — search by keyword, filter by location, category & job type
- **Job Details** — full role description, requirements & salary range
- **Apply in one click** — with your uploaded resume
- **Saved Jobs** — bookmark & manage opportunities you're interested in
- **Profile** — manage personal info, avatar & resume (PDF)

### 🏢 Employers
- **Dashboard** — live stats on active jobs, applicants & hires
- **Post Jobs** — rich form with live preview & validation
- **Manage Jobs** — search, filter, sort, paginate, edit, close & delete postings
- **Review Applications** — view applicants, download resumes, update statuses
- **Company Profile** — company name, logo & description

### 🔐 Authentication & Security
- JWT-based sign up / sign in with role selection (jobseeker / employer)
- Role-based protected routes (employers & jobseekers are isolated)
- Passwords hashed with bcrypt

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) 18+ (**20+ recommended**)
- [pnpm](https://pnpm.io/installation)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or Atlas)

### 1. Install dependencies

```bash
# Backend
cd backend
pnpm install

# Frontend (in a separate terminal)
cd frontend
pnpm install
```

### 2. Configure environment variables

Copy the example files and fill in your values:

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env and set MONGO_URI + JWT_SECRET

# Frontend
cd frontend
cp .env.example .env
# VITE_API_BASE_URL defaults to http://localhost:8000
```

> The backend `.env` requires `MONGO_URI`, `JWT_SECRET`, and optionally `PORT` (defaults to `8000`).

### 3. Start the servers

```bash
# Backend — http://localhost:8000
cd backend
pnpm dev        # or: pnpm start

# Frontend — http://localhost:5173
cd frontend
pnpm dev
```

Open **http://localhost:5173** in your browser.

> **Tip:** create one account as a **Job Seeker** and one as an **Employer** to explore both sides of the platform.

---

## 🔗 API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create a new account |
| `POST` | `/api/auth/login` | Authenticate & receive JWT |
| `POST` | `/api/auth/upload-image` | Upload profile/company images |
| `GET/POST` | `/api/jobs` | List or create jobs |
| `GET/PUT/DELETE` | `/api/jobs/:id` | Read, update or delete a job |
| `GET` | `/api/jobs/get-jobs-employer` | Jobs for the logged-in employer |
| `POST` | `/api/applications/:jobId` | Apply to a job |
| `GET` | `/api/applications/my` | Applications for the logged-in user |
| `GET` | `/api/applications/job/:jobId` | Applicants for a job (employer) |
| `PUT` | `/api/applications/:id/status` | Update application status |
| `POST/DELETE` | `/api/save-jobs/:jobId` | Save / unsave a job |
| `GET` | `/api/save-jobs/my` | User's saved jobs |
| `GET` | `/api/analytics/overview` | Employer dashboard analytics |

---

## 🛠️ Scripts

| Directory | Command | Description |
|-----------|---------|-------------|
| `frontend` | `pnpm dev` | Start Vite dev server |
| `frontend` | `pnpm build` | Production build |
| `frontend` | `pnpm lint` | Run ESLint |
| `backend` | `pnpm dev` | Start server with auto-reload (nodemon) |
| `backend` | `pnpm start` | Start server |

---

## 🛣️ Roadmap

Planned enhancements and future direction:

- [ ] Email verification & password reset
- [ ] Real-time notifications for application updates
- [ ] In-app messaging between employers and candidates
- [ ] Advanced filtering (experience level, date posted, company size)
- [ ] Pagination on the Find Jobs page
- [ ] Sort by relevance / salary / newest
- [ ] Deployment configuration & Docker setup
- [ ] Automated test suite (unit + end-to-end)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the ISC License.

# 📱 JobPortal — Frontend

> The React single-page application for the JobPortal platform.

Built with **React 19**, **Vite 7**, **Tailwind CSS 4**, **Framer Motion**, and **React Router 7**.

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start the dev server (http://localhost:5173)
pnpm dev
```

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Start Vite dev server    |
| `pnpm build`   | Production build         |
| `pnpm lint`    | Run ESLint               |
| `pnpm preview` | Preview production build |

## Projects Structure

```
src/
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

## Environment Variables

| Variable            | Default                 | Description                 |
| ------------------- | ----------------------- | --------------------------- |
| `VITE_API_BASE_URL` | `http://localhost:8000` | Base URL of the backend API |

See the root [`README.md`](../README.md) for the full project documentation.

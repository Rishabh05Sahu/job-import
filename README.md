# Scalable Job Importer

A scalable job import system built with:

- Next.js (Frontend)
- Node.js + Express (Backend)
- MongoDB
- Redis + BullMQ

---

## Features

- XML feed parsing
- Redis queue-based background processing
- Concurrent workers
- MongoDB upsert logic
- Import history tracking
- Modern admin dashboard
- Dark mode support

---

## Project Structure

```
/client      → Next.js frontend
/server      → Express backend
/docs        → Architecture documentation
README.md
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <repo-url>
cd scalable-job-importer
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```
PORT=8000
MONGO_URI=<your-mongo-uri>
REDIS_URL=<your-redis-url>
```

Start backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd client
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/import
```

Start frontend:

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## How It Works

1. Fetch external XML job feeds.
2. Convert XML to JSON.
3. Push jobs to Redis queue.
4. Workers process jobs concurrently.
5. Import logs are stored and displayed in dashboard.

---

## Scalability

- Queue-based processing
- Configurable concurrency
- Retry logic
- Import isolation using importId
- Designed to scale beyond 1M records

---

## Bonus Features

- Dark mode UI
- Animated dashboard
- Import stats cards
- Feed-based import tracking

---

## Author

Rishabh Sahu

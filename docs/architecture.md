# Scalable Job Import System - Architecture

## Overview

This system is designed to import job feeds from external XML APIs, process them using a Redis-based queue system, and store them efficiently in MongoDB with import history tracking.

The architecture ensures scalability, modularity, and separation of concerns.

---

## High-Level Architecture

```
External XML Feeds
        ↓
Fetch Service (XML → JSON)
        ↓
Redis Queue (BullMQ)
        ↓
Worker (Concurrent Processing)
        ↓
MongoDB (Upsert)
        ↓
Import Logs Collection
        ↓
Next.js Admin Dashboard
```

---

## Backend Architecture

### 1. Feed Fetching Layer

- Fetches multiple external job feeds.
- Converts XML responses into JSON format.
- Normalizes job data.
- Deduplicates jobs using externalId.

### 2. Queue Layer (Redis + BullMQ)

- Jobs are added to Redis queue.
- Each job includes an `importId`.
- Supports:
  - Configurable concurrency
  - Retry logic with exponential backoff
  - Failure handling

This ensures scalability for handling 1M+ records.

### 3. Worker Layer

- Processes jobs concurrently.
- Performs MongoDB upsert.
- Updates the corresponding import log using `importId`.
- Tracks:
  - New jobs
  - Updated jobs
  - Failed jobs

### 4. Database Design

#### Jobs Collection
- Indexed by `externalId`
- Prevents duplication
- Supports efficient updates

#### Import Logs Collection
Tracks:
- fileName
- timestamp
- totalFetched
- totalImported
- newJobs
- updatedJobs
- failedJobs

---

## Frontend Architecture

Built with Next.js (App Router) using Atomic Design:

- Atoms (Button, Badge, Toggle)
- Molecules (ImportRow)
- Organisms (ImportTable, StatsCards)
- Pages (Dashboard)

Features:
- Import history visualization
- Dark mode toggle
- Stats cards
- Animated UI
- Auto-refresh after import

---

## Scalability Considerations

- Queue-based background processing prevents blocking API calls.
- Worker concurrency is configurable.
- Each import run is isolated using `importId`.
- Deduplication before queue insertion reduces load.
- System can evolve into microservices:
  - Separate fetch service
  - Dedicated worker service
  - Independent frontend deployment

---

## Future Improvements

- Bulk MongoDB operations (bulkWrite)
- Real-time import progress using WebSocket
- Pagination and filtering
- Docker deployment
- Horizontal scaling of workers

---

## Design Decisions

| Decision | Reason |
|----------|--------|
| Redis + BullMQ | Reliable queue system with retry support |
| MongoDB Upsert | Prevent duplicate job entries |
| Separate Import Logs | Clear tracking per feed |
| Atomic Frontend Structure | Clean and scalable UI architecture |

---

## Conclusion

This system demonstrates:

- Scalable background processing
- Clean modular architecture
- Efficient database handling
- Production-ready design patterns

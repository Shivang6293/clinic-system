# Front Desk System

Single-folder full-stack clinic front desk system (Node + Express backend, React + Vite frontend).

## Run locally (single command)
1. Install root dev dependency `concurrently` and then install server & client:
```bash
# from project root
npm install
npm run install-all
```

2. Start both server and client:
```bash
npm run start
```

- Backend: http://localhost:4000
- Frontend: http://localhost:5173

## Structure
- server/: Express API using lowdb (JSON file storage)
- client/: React + Vite frontend


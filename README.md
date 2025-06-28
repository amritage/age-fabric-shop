# Age Fabric Shop Backend

This is the backend for the Age Fabric Shop, built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Product, order, review, and admin management
- Secure password reset and email verification
- File uploads (images, videos)
- RESTful API
- Automated tests with Jest and Supertest

## Getting Started

### Prerequisites

- Node.js >= 16
- MongoDB database

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

### Scripts

- `npm start` — Start the server
- `npm run start-dev` — Start with nodemon
- `npm test` — Run tests
- `npm run data:import` — Seed the database

### Running Locally

```bash
npm run start-dev
```

### Testing

```bash
npm test
```

### Deployment

- Set all environment variables in your production environment
- Use a process manager (e.g., PM2) for production
- Ensure MongoDB and all secrets are set

## Folder Structure

- `controller/` — Route controllers
- `model/` — Mongoose models
- `routes/` — API routes
- `middleware/` — Express middleware
- `services/` — Business logic
- `utils/` — Utility functions

## License

MIT

---

# Age Fabric Shop Backend

This is the backend for the Age Fabric Shop project.

## Features

- User and admin authentication
- Product, category, and order management
- Media upload (images/videos)
- Secure password reset and email verification

## Prerequisites

- Node.js (v14 or higher)
- MongoDB

## Setup & Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   BASE_URL=http://localhost:7000
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ALLOWED_IMAGE_TYPES=png,jpg,jpeg,webp
   ALLOWED_VIDEO_TYPES=mp4,avi,mov,webm
   ```
4. Start the server:
   ```sh
   npm start
   ```

## Deployment

- Ensure your `.env` file is **not** committed to version control.
- Use a process manager like PM2 or deploy to a cloud provider (Vercel, Heroku, etc.).
- Set environment variables in your deployment environment.

## Media & Sensitive Files

- Media files (images/videos) and `.env` are excluded from git via `.gitignore`.

## Testing

- Automated tests should be added in the `tests/` directory (see below for a placeholder).

---

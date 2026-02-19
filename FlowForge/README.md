# YouTube Clone

This is a full-stack YouTube clone built with the MERN stack.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB Atlas account or local MongoDB instance.
- Cloudinary account for media storage.
- Firebase project for authentication (optional, as configured in frontend).

### Setup

1.  **Install root dependencies:**
    ```bash
    npm install
    ```

2.  **Install all project dependencies (frontend & backend):**
    ```bash
    npm run install-all
    ```

3.  **Configure Environment Variables:**

    #### Backend (`youtube/backend/.env`):
    The following variables are required:
    - `PORT`: Server port (e.g., 3000)
    - `MONGODB_URL`: Your MongoDB connection string.
    - `CLOUDINARY_NAME`: Your Cloudinary cloud name.
    - `CLOUDINARY_API_KEY`: Your Cloudinary API key.
    - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.
    - `JWT_SECRET`: A secret string for JWT signing.
    - `USER_EMAIL`: (Optional) Email for nodemailer.
    - `USER_PASSWORD`: (Optional) App password for nodemailer.
    - `GEMINI_API_KEY`: (Optional) Key for AI features.

    #### Frontend (`youtube/frontend/.env`):
    - `VITE_FIREBASE_APIKEY`: Your Firebase API key.

### Running the Project

To run both the frontend and backend simultaneously in development mode:

```bash
npm run dev
```

The frontend will usually be available at `http://localhost:5173` and the backend at `http://localhost:3000` (or your configured port).


# BroCode

BroCode is a real-time chatting application built using React for the frontend and Node.js for the backend. Users can register, choose their avatar, and chat with other registered users.

## Features

- User registration
- Avatar selection
- Real-time chat with other registered users

## Demo

https://brocode-public.vercel.app/login

## Technologies Used

- Frontend: React, styled-components, Axios
- Backend: Node.js, Express
- Database: MongoDB
- Websockets: Socket.IO

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- MongoDB installed and running

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/ChatApp.git
   cd ChatApp
   ```

2. **Backend setup:**

   ```sh
   cd server
   npm install
   ```

3. **Frontend setup:**

   ```sh
   cd ../client
   npm install
   ```

## Configuration

1. **Backend configuration:**

   Create a `.env` file in the `server` directory and add your MongoDB URI and other environment variables:

   ```plaintext
   MONGO_URI=mongodb://localhost:27017/ChatApp
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

2. **Frontend configuration:**

   Create a `.env` file in the `client` directory and add your backend API URL:

   ```plaintext
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## Running the Application

1. **Start the backend server:**

   ```sh
   cd server
   npm start
   ```

   The backend server will start on `http://localhost:5000`.

2. **Start the frontend development server:**

   ```sh
   cd client
   npm start
   ```

   The frontend server will start on `http://localhost:3000`.

## Usage

1. **Register:**

   Open your browser and go to `http://localhost:3000`. Register a new user by filling out the registration form.

2. **Select Avatar:**

   After registration, choose an avatar from the provided options.

3. **Chat:**

   Start chatting with other registered users in real-time.

## Folder Structure

Here's a brief overview of the folder structure:

```
ChatApp
├── client                 # React frontend
│   ├── public
│   └── src
│       ├── components     # React components
│       ├── pages          # React pages
│       ├── utils          # Utility functions
│       ├── App.js
│       ├── index.js
│       └── ...
├── server                 # Node.js backend
│   ├── config             # Configuration files
│   ├── controllers        # Controller functions
│   ├── models             # Mongoose models
│   ├── routes             # Express routes
│   ├── server.js          # Entry point for the server
│   └── ...
├── .gitignore
├── README.md
└── package.json
```
### Notes:
- Replace `yourusername` with your actual GitHub username.
- Add any additional instructions or details specific to your project.
- If you have additional scripts or setup steps, include them in the appropriate sections.
- Ensure that all paths and URLs are correct and accessible.

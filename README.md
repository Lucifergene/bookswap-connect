# BookSwap Connect

BookSwap Connect is a web application that allows users to register, log in, and manage a collection of books. The application is divided into a frontend and a backend, with the frontend built using React and the backend using Node.js and Express.

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

The project is organized as follows:

```
bookswap-connect/
├── api/ # Backend folder
│ ├── config/ # Configuration files
│ ├── models/ # Mongoose models
│ ├── routes/ # Express routes
│ ├── app.js # Main application file
│ ├── package.json # Backend dependencies and scripts
│ └── .gitignore # Backend gitignore file
├── src/ # Frontend folder
│ ├── components/ # React components
│ ├── assets/ # Static assets
│ ├── App.tsx # Main React component
│ ├── main.tsx # Entry point for React
│ ├── index.css # Global styles
│ ├── vite-env.d.ts # Vite environment types
│ ├── package.json # Frontend dependencies and scripts
│ └── .gitignore # Frontend gitignore file
├── index.html # HTML template
├── tailwind.config.js # Tailwind CSS configuration
├── vite.config.ts # Vite configuration
└── README.md # Project documentation
```

## Features

- User authentication with JWT
- Book management (add, edit, delete, view)
- Search and filter books
- Responsive design using Tailwind CSS

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the `api` directory:

   ```sh
   cd api
   ```

2. Install the backend dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the `api` directory and add your MongoDB URI and JWT secret:

   ```
   MONGODB_USERNAME=your_username
   MONGODB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:

   ```sh
   npm start
   ```

   For development with hot-reloading, use:

   ```sh
   npm run dev
   ```

### Frontend Setup

1. Navigate to the root directory of the project:

   ```sh
   cd ..
   ```

2. Install the frontend dependencies:

   ```sh
   npm install
   ```

3. Start the frontend development server:

   ```sh
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000` to view the application.

## Usage

- Register a new account or log in with existing credentials.
- Add, edit, or delete books in your collection.
- Search for books by title, author, or genre.
- Filter books by condition and availability status.

## Environment Variables

The application requires the following environment variables:

- `MONGODB_USERNAME`: Your MongoDB username.
- `MONGODB_PASSWORD`: Your MongoDB password.
- `JWT_SECRET`: Secret key for signing JWT tokens.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

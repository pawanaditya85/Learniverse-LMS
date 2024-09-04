# Node.js Backend Service for Learning Management System

This backend service is built with Node.js. It provides APIs for students, faculty, and administrators, enabling them to interact with courses, assignments, quizzes, and more.

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or later)
- npm (Node Package Manager)
- MongoDB (database)

## Setup and Installation

Follow these steps to set up the project:

1. **Navigate to the project directory:**

    ```bash
    cd backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following environment variables. Replace `<username>` and `<password>` with the actual username and password:

    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@kinetic-202.nf0n2w3.mongodb.net/?retryWrites=true&w=majority&appName=kinetic-202
    ```


4. **Start the development server:**

    ```bash
    npm run dev
    ```

    This will start the server in development mode using `nodemon`. The server will automatically restart when you make changes to the code.

## Testing APIs with Postman

A Postman collection has been included in the `docs` for testing the APIs. Follow these steps to import and use the collection:

1. Open Postman.
2. Click on the "Import" button.
3. Select the "Upload Files" option and choose the Postman collection file (`.json` format) from the repository.
4. After the collection is imported, you can select an API endpoint and click the "Send" button to make a request.

Please ensure that the backend server is running before making requests with Postman.

## Available Scripts

- `npm run dev`: Starts the development server with `nodemon`.

## API Documentation

The API documentation is available in the `docs` folder. You can import the Postman collection file into Postman to explore and test the API endpoints.

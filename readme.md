# Employee Management System

## Overview

The **Employee Management System** is a Node.js application designed to manage employee records, attendance, leave applications, and user authentication. This system provides a RESTful API that enables secure interactions between users and the database.

## Features

- **User Authentication**: Sign up and log in to manage accounts.
- **Employee Management**: Create, read, update, and delete employee records.
- **Attendance Tracking**: Mark attendance and view attendance records.
- **Leave Management**: Apply for, update, and manage leave requests.

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM library for MongoDB and Node.js integration.
- **RabbitMQ**: Message broker for handling notifications and inter-service communication.
- **Nodemailer**: For sending notification emails.
- **JWT**: JSON Web Tokens for secure user authentication.

## Installation and Setup

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory and add the following environment variables:
   ```plaintext
   MONGODB_URI=<your-mongodb-uri>
   RABBITMQ_URI=<your-rabbitmq-uri>
   EMAIL_USER=<your-email>
   EMAIL_PASS=<your-email-password>
  

4. **Start the Application**:

   npm start


   The server will be running at `http://localhost:2000`.

## API Endpoints

### User Endpoints
- **POST** `/api/user/signup`: Register a new user.
- **POST** `/api/user/signin`: Authenticate and log in.

### Employee Endpoints
- **GET** `/api/employee/`: Retrieve all employee records.
- **POST** `/api/employee/`: Create a new employee record.
- **PUT** `/api/employee/:id`: Update an existing employee record.
- **DELETE** `/api/employee/:id`: Delete an employee record.

### Attendance Endpoints
- **GET** `/api/attendance/`: View attendance records for the logged-in user.
- **POST** `/api/attendance/`: Mark attendance for the logged-in user.

### Leave Endpoints
- **GET** `/api/leave/`: Retrieve all leave records.
- **POST** `/api/leave/`: Apply for a leave request.
- **PUT** `/api/leave/:id`: Update a leave request.

## System Architecture

The architecture of the Employee Management System is designed for modularity and scalability:

- **Client-Server Model**: The application follows a RESTful architecture where clients interact with the server through defined API endpoints.
- **Microservices**: Features like user management, employee management, attendance, and leave management are encapsulated within their respective modules.
- **Database Integration**: MongoDB is used for persistent data storage, and Mongoose is used for data modeling.
- **Authentication**: JWT is implemented for secure authentication, ensuring only authorized users can access protected routes.
- **Asynchronous Processing**: RabbitMQ is utilized for handling notifications and inter-service communication.




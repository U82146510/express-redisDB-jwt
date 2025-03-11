Express.js App with Redis and JWT Authentication

Overview

This is an Express.js application that uses Redis as a database and JWT (JSON Web Tokens) for authentication. 

Features

User authentication using JWT

Secure API endpoints

Middleware for protecting routes

Prerequisites

Ensure you have the following installed:

Node.js (v22.0+ recommended)

Redis (installed and running)

NPM or Yarn
Installation

Clone the repository:
git clone https://chatgpt.com/c/67cf44ed-9120-8006-b750-bc8cb24f658a](https://github.com/U82146510/express-redisDB-jwt
Install dependencies:
npm install
Configuration

Create a .env file in the root directory and configure the following variables:
PORT=3000
JWT_SECRET=your_secret_key
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
Running the Application

Start the Redis server (if not already running):
redis-server
Run the application:
npm start
API Endpoints

Authentication

Register: POST /api/register - Register a new user

Login: POST /api/login - Authenticate and receive a JWT

Logout: POST /api/logout - Destroy session stored in Redis

Protected Routes

User Profile: GET /api/profile - Get user profile (requires JWT)

Middleware

The app includes middleware for:

Parsing JSON requests

Authenticating JWT tokens

Handling session storage in Redis

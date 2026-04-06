# Finance Dashboard Backend [This documentation and the frontend is created with the help of AI :) ]

## Overview

This project is a backend service for a finance dashboard application. It provides APIs for managing users, financial transactions, and summary analytics. The system is designed with authentication and role-based access control to ensure secure and structured data handling.

---

## Features

* User authentication using JWT
* Role-based access control (Viewer, Analyst, Admin)
* CRUD operations for financial transactions
* Aggregated financial summary (income, expenses, balance)
* Category-wise breakdown of transactions
* Admin controls for managing user roles

---

## Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT & bcrypt

---

## API Overview

### Authentication

* `POST /api/auth/signup` – Register a new user
* `POST /api/auth/login` – Authenticate user and return token

### Transactions

* `POST /api/transactions` – Create transaction
* `GET /api/transactions` – Get transactions (role-based)
* `PUT /api/transactions/:id` – Update transaction
* `DELETE /api/transactions/:id` – Delete transaction

### Summary

* `GET /api/summary` – Get financial summary and category breakdown

### User Management (Admin)

* `GET /api/users` – Retrieve all users
* `PUT /api/users/:id/role` – Update user role

---

## Authorization

Protected routes require a JWT token:

```id="9r1k2m"
Authorization: Bearer <token>
```

---

## Roles

* **Viewer** – Read-only access
* **Analyst** – Access to data and insights
* **Admin** – Full access including user management

Note : for access control i was initially confused to that how will i assign them a role , it hit me later tht i can use specific emails to assign them role for example 
test@admin.com will be admin  , test@analyst.com will be analyst and rest will be viewers i couldn't implement it due to time limitations
Currently i am manually changing the role which only can be done by admin
---

## Setup

```
add a dotenv file and 
add this to it

{

MONGO_URI="your mongo db key"
JWT_TOKEN="your token"
}

npm install
cd frontend
npm run dev
cd backend
npm run dev
```

---

## Summary

This backend demonstrates a structured approach to building secure and scalable APIs with authentication, authorization, and data aggregation for a finance dashboard system.

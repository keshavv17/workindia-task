# Railway Management System API (IRCTC-Like)

A **real-time railway booking system** that allows users to check train availability, view available seats, and book tickets while handling **concurrent bookings** to prevent race conditions.

## Features
**User Registration & Authentication (JWT-based)**  
**Admin Role to Add & Manage Trains**  
**Users Can Check Train & Seat Availability**  
**Secure Seat Booking System (Race Condition Handling)**  
**Real-Time Database Transactions & Row Locking**    

---

## **Tech Stack**
- **Backend:** Node.js with Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Token)
- **Security:** API Key for Admin Routes
- **Concurrency Handling:** Transactions & Row Locking (`FOR UPDATE`)

---

## **Setup & Installation**
**1. Clone the repository**
   ```bash
   git clone https://github.com/your-username/irctc-booking-system.git
   cd irctc-booking-system
   ```
**2. Install Dependencies**
```bash
npm i
```
**3. Set Up Environment Variables**

Create a `.env `file in the root directory and update it with your database and authentication configurations:

```bash
DB_URL = Database connection string
JWT_SECRET = secret key used to sign and verify jwt tokens
ADMIN_API_KEY = secret api key
PORT = 3000
```
**5. Start the Server**
```bash
node index.js
```
This will start the server on `http://localhost:3000`.

# API Endpoints

* **POST /users/register** - Register a new user
`Body: { "username": "user1", "password": "password123", "role":"user" }`

* **POST /users/login** - Login a user
`Body: { "username": "user1", "password": "password123" }`

* **GET /trains** - Fetch available trains
`Query: source=CityA&destination=CityB`

* **POST /trains/add** - Add a new train
`Body: { "name": "Express", "source": "CityA", "destination": "CityB", "total_seats": 100 }`

* **POST /bookings** - Book ticket
`Body: { "train_id": 1 }`

* **GET /userbookings** - Get booking details for specific user
`Query: user_id=1`


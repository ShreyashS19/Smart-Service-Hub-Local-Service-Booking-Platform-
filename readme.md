# 🌐 **Smart Service Hub**

### *A Modern Platform to Discover, Book & Manage Local Services*

<p align="center">
  <a href="https://smart-service-hub-local-service-boo.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Now-brightgreen?style=for-the-badge" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Database-MySQL-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/UI-ShadCN%20UI-purple?style=for-the-badge" />
</p>

<p align="center">
  <strong>Find trusted local service providers and book them effortlessly — anytime, anywhere.</strong>
</p>

---

# 🏆 **Overview**

Smart Service Hub is a full-stack service marketplace platform where users can search, book, and pay for local services. Service providers manage bookings and services, while admins oversee the entire platform.

Built with a clean architecture and modern stack, the platform ensures **scalability**, **security**, and **excellent user experience**.

---

# 🧱 **Architecture Overview**

## 🏗 **System Architecture Diagram**

```
                           ┌───────────────────────┐
                           │      Frontend         │
                           │  React + Vite + TS    │
                           │ ShadCN + TailwindCSS  │
                           └───────────┬───────────┘
                                       │ REST API
                                       ▼
                         ┌────────────────────────────┐
                         │         Backend             │
                         │   Spring Boot + JPA/Hibernate│
                         │ Controllers / Services      │
                         │ Repositories / Validation   │
                         └─────────────┬──────────────┘
                                       │ SQL Queries
                                       ▼
                         ┌────────────────────────────┐
                         │          MySQL DB           │
                         └────────────────────────────┘
```

---

```
                🧑 User
                   │
                   ▼
            🔎 Browse Services
                   │
                   ▼
      🧑‍🔧 Provider Accepts / Rejects Request
                   │
        ┌──────────┴───────────┐
        │                      │
        ▼                      ▼
   Accepts                ❌ Rejects  
        │              Try Another Provider
        ▼
   📅 Book Service
        │
        ▼
   🛠 Service Completed
        │
        ▼
   ⭐ User Reviews Service
        │
        ▼
       💳 Payment
        │
        ▼
🛡 Admin Manages Complaints / Providers / Users

---

# ⚙️ **Tech Stack**

| Layer          | Technology                                      |
| -------------- | ----------------------------------------------- |
| **Frontend**   | React, Vite, TypeScript, ShadCN UI, TailwindCSS |
| **Backend**    | Java 22, Spring Boot, Hibernate, JPA            |
| **Database**   | MySQL                                           |
| **Payments**   | Stripe(Demo)                                          |
| **Dev Tools**  | Maven, ESLint, Prettier                         |
| **Deployment** | Docker                                          |

---

# 📁 **Project Structure**

Smart-Service-Hub/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/smarthub/
│   │   │   │   ├── controllers/
│   │   │   │   ├── services/
│   │   │   │   ├── repositories/
│   │   │   │   ├── dto/
│   │   │   │   ├── entity/
│   │   │   │   ├── validation/
│   │   │   │   ├── exception/
│   │   │   │   └── SmartServiceHubApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── data.sql
│   │   ├── test/
│   │   │   └── (test files)
│   ├── pom.xml
│   ├── Dockerfile
│   └── mvnw / mvnw.cmd
│
├── frontend/
│   ├── public/
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.ts
│
└── README.md


---

# 🌟 **Core Features**

### 👤 Users

* Search & discover services
* Book appointments
* Make online payments
* Reviews
* User dashboard

### 🧑‍🔧 Providers

* Manage offered services
* Accept / reject bookings
* View customer reviews
* Provider dashboard

### 🛡 Admin

* Manage users & service providers
* View all bookings
* Oversee complaints
* System-wide notifications

---

# 📡 **API Documentation**

## **Authentication**

| Method | Endpoint       | Description           |
| ------ | -------------- | --------------------- |
| POST   | `/auth/signup` | Create a user account |
| POST   | `/auth/login`  | User login            |

## **Bookings**

| Method | Endpoint                  | Description               |
| ------ | ------------------------- | ------------------------- |
| POST   | `/bookings`               | Create booking            |
| GET    | `/bookings/user/{id}`     | Fetch user bookings       |
| GET    | `/bookings/provider/{id}` | Provider booking requests |

## **Reviews**

| Method | Endpoint                 | Description      |
| ------ | ------------------------ | ---------------- |
| POST   | `/reviews`               | Submit a review  |
| GET    | `/reviews/provider/{id}` | Provider reviews |

---

# 🚀 **Installation Guide**

## **Backend Setup**

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

Runs at: **[http://localhost:8080](http://localhost:8080)**

## **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

Runs at: **[http://localhost:8080](http://localhost:8080)**

---

# 🐳 **Docker Deployment**

## Build Image

```bash
docker build -t smart-service-hub-backend ./backend
```

## Run Container

```bash
docker run -p 8080:8080 smart-service-hub-backend
```

---

# 🧪 **Testing**

```bash
./mvnw test
```

---

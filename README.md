# Capitize – Full-Stack AI Personal Finance SaaS

🔗 **Live Demo:** https://capitize.vercel.app  
📦 **Source Code:** https://github.com/Aryanbhargava18/Capitize

---

## Project Overview

Capitize is a **production-grade full-stack SaaS platform** engineered to automate personal finance management.  
Unlike basic CRUD applications, Capitize uses a **distributed architecture** to handle asynchronous background jobs, AI-driven data extraction, and secure multi-tenant workflows.

This project was built to simulate a **real-world SaaS system**, with a strong focus on scalability, clean architecture, and reliability.

---

## Why This Project Exists

Most personal finance apps are either:
- too basic (manual tracking), or
- too complex (overwhelming UX).

Capitize bridges this gap by combining:
- automated data processing,
- AI-powered insights,
- and a clean, modern user experience.

This is a **portfolio-grade engineering project**, not a demo app.

---

## Tech Stack & Engineering Decisions

### Framework
- **Next.js 14 (App Router)**  
  Chosen for Server-Side Rendering (SSR), layout-based routing, and production-ready performance.

### Database & ORM
- **PostgreSQL + Prisma**  
  Implemented a normalized relational schema with type-safe queries and structured migrations for long-term scalability.

### Asynchronous Processing
- **Inngest**  
  Used for event-driven background jobs such as financial report generation and email automation, ensuring a non-blocking UI.

### AI Integration
- **Google Gemini API**  
  Built an AI pipeline for receipt OCR and automated transaction categorization from unstructured data.

### Security & Platform Services
- **Clerk** – Secure authentication and session management (JWT abstraction)  
- **Arcjet** – Rate limiting, bot protection, and request security  
- **Resend** – Reliable transactional email delivery

---

## Key Engineering Contributions

### 1. Robust Backend Architecture (API-less Design)
- Architected the backend using **Next.js Server Actions**, reducing API boilerplate and keeping sensitive logic server-side.
- Implemented middleware-level protection for authenticated and protected routes.

### 2. Scalable Data Modeling & Performance
- Designed a PostgreSQL schema supporting multi-account, multi-currency financial data.
- Optimized database access using Prisma for type safety and predictable migrations.

### 3. AI-Driven Automation Pipeline
- Engineered a receipt-processing system that converts unstructured image data into structured JSON.
- Built automated financial insights using background workers to avoid blocking user-facing requests.

### 4. Security & Reliability
- Integrated Arcjet to protect against abuse and brute-force attacks.
- Used Inngest’s retry mechanisms to ensure reliability for critical background tasks and emails.

---

## Impact & Technical Achievements

| Area | Implementation |
|------|---------------|
| Concurrency | Offloaded ~80% of heavy processing to Inngest background workers |
| Data Integrity | Enforced end-to-end type safety using TypeScript and Prisma |
| Security | Implemented secure authentication and protected server actions |
| UX/UI | Built a responsive dashboard using Tailwind CSS and shadcn/ui |

---

## Architecture Overview

- App Router–based modular structure
- Clear separation of UI, server actions, and data layers
- Server Actions for all mutations
- Background jobs for non-blocking workflows
- Prisma migrations for schema evolution
- Middleware-protected routes

---

## Folder Structure 

app/                # App Router pages & layouts
actions/            # Server actions (business logic)
components/         # Reusable UI components
lib/                # Prisma, auth helpers, utilities
prisma/             # Database schema & migrations


---


## Local Development & Setup
Clone & Install
bash
Copy code
git clone https://github.com/Aryanbhargava18/Capitize.git
cd Capitize
npm install
Database Setup
bash
Copy code
npx prisma generate
npx prisma migrate dev
Environment Variables
Create a .env file with the following:

env
Copy code
DATABASE_URL=
CLERK_SECRET_KEY=
ARCJET_KEY=
GEMINI_API_KEY=
Run the App
bash
Copy code
npm run dev


---



## Design Decisions & Learnings
Chose Server Actions over traditional REST APIs to reduce boilerplate and improve security.

Used background jobs to prevent long-running tasks from blocking user requests.

Designed database schema with future scalability and analytics in mind.

Focused on clean separation of concerns across the codebase.

---

## Status
Capitize is actively maintained and deployed in production.
This project represents my approach to building real-world, scalable web systems.

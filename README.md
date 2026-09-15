# AI Orbit — AI Companies Module

A full-stack AI Companies module developed as part of the AI Orbit Module Design & Development Task.

The module provides a complete experience for discovering AI companies, searching and filtering companies, and viewing detailed information about individual companies.

---

## Features

- AI Orbit-inspired dark and premium UI
- AI Companies listing page
- Search companies by name or description
- Filter companies by industry
- Combined search and industry filtering
- Company detail page
- Company-not-found state
- Loading state
- Empty state
- Error state with retry option
- Responsive desktop and mobile layouts
- REST APIs built with NestJS
- PostgreSQL database
- Prisma ORM
- Environment-based API configuration
- Dummy company data

---

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

### Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL

---

## Project Structure

```text
ai-orbit-companies/
│
├── backend/
│   ├── src/
│   │   ├── companies/
│   │   │   ├── companies.controller.ts
│   │   │   ├── companies.service.ts
│   │   │   └── companies.module.ts
│   │   │
│   │   ├── prisma/
│   │   │   ├── prisma.service.ts
│   │   │   └── prisma.module.ts
│   │   │
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   └── prisma/
│       ├── schema.prisma
│       └── seed.ts
│
├── frontend/
│   └── app/
│       ├── companies/
│       │   ├── page.tsx
│       │   └── [slug]/
│       │       └── page.tsx
│       │
│       ├── page.tsx
│       └── layout.tsx
│
└── README.md
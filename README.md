# AI Orbit — AI Companies Module

A full-stack **AI Companies module** developed as part of the **AI Orbit Module Design & Development Task**.

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

## Application Pages

### AI Companies Listing

```text
/companies
```

Provides:

- Company discovery
- Search
- Industry filters
- Combined search and filtering
- Responsive company directory

### Company Detail

```text
/companies/[slug]
```

Provides:

- Company name
- Description
- Industry
- Headquarters
- Founded year
- Official website
- Navigation back to the companies listing

---

## API Endpoints

The backend exposes the following REST APIs.

### Get all companies

```http
GET /companies
```

### Search companies

```http
GET /companies?search=openai
```

Searches by company name or description.

### Filter by industry

```http
GET /companies?industry=AI Research
```

### Search and filter together

```http
GET /companies?search=AI&industry=Generative AI
```

### Get company by slug

```http
GET /companies/openai
```

Returns the details of a specific company.

### Company not found

If the requested slug does not exist, the API returns:

```http
404 Not Found
```

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
│   │   │   ├── companies.module.ts
│   │   │   └── *.spec.ts
│   │   │
│   │   ├── prisma/
│   │   │   ├── prisma.service.ts
│   │   │   └── prisma.module.ts
│   │   │
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   │
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── app/
│   │   ├── companies/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

## Database

The project uses **PostgreSQL** with **Prisma ORM**.

### Company Model

The main `Company` entity contains:

| Field | Type | Description |
|---|---|---|
| `id` | Int | Unique company ID |
| `name` | String | Company name |
| `slug` | String | Unique URL-friendly identifier |
| `description` | String | Company description |
| `industry` | String | Company industry |
| `website` | String? | Official website |
| `logo` | String? | Company logo |
| `headquarters` | String? | Company headquarters |
| `foundedYear` | Int? | Company founding year |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

---

## Setup & Installation

### Prerequisites

Install the following before running the project:

- Node.js 22+
- npm
- PostgreSQL

---

## 1. Clone the Repository

```bash
git clone https://github.com/vamshi-982/ai-orbit-companies.git
cd ai-orbit-companies
```

---

## 2. Backend Setup

Open a terminal and navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

### Configure Database

Create a `.env` file inside the `backend` directory.

```text
backend/.env
```

Add your PostgreSQL connection string:

```env
DATABASE_URL="your_postgresql_connection_string"
```

Do not commit the `.env` file to GitHub.

The repository already ignores environment files through `.gitignore`.

### Run Database Migration

```bash
npx prisma migrate dev
```

This creates the required database tables using the Prisma migration files included in the repository.

### Generate Prisma Client

```bash
npx prisma generate
```

### Start the Backend

```bash
npm run start:dev
```

The backend runs on:

```text
http://localhost:3001
```

You can test the API:

```text
http://localhost:3001/companies
```

---

## 3. Frontend Setup

Open a **new terminal** and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Start the frontend:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

---

## 4. Open the Application

Open:

```text
http://localhost:3000/companies
```

You can then:

1. Browse AI companies
2. Search by company name or description
3. Filter companies by industry
4. Combine search and filtering
5. Open a company detail page
6. Navigate back to the company directory

---

## Environment Variables

### Backend

File:

```text
backend/.env
```

Variable:

```env
DATABASE_URL="your_postgresql_connection_string"
```

### Frontend

File:

```text
frontend/.env.local
```

Variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Environment files are intentionally excluded from Git.

---

## Application States

The module handles the following states:

### Loading

Displayed while company data is being fetched.

### Empty

Displayed when no companies match the current search or filter.

### Error

Displayed when the API request fails, with an option to retry.

### Company Not Found

Displayed when a company detail URL does not correspond to an existing company.

---

## Responsive Design

The module is designed for both desktop and mobile screens.

### Desktop

- Full AI Companies directory
- Structured table/list layout
- Search and filter controls
- Detailed company information

### Mobile

- Responsive company rows
- Horizontally scrollable category filters
- Mobile-friendly spacing and typography
- Responsive company detail layout

---

## Design Direction

The UI follows the visual direction of **AI Orbit**:

- Dark background
- White typography
- Minimal visual hierarchy
- Rounded cards
- Subtle borders
- Consistent spacing
- Premium directory-style layout
- Responsive design

The implementation uses AI Orbit as the primary visual reference while keeping the module focused on the required AI Companies functionality.

---

## Backend Architecture

The backend follows a modular NestJS structure.

```text
Controller
    ↓
Service
    ↓
Prisma Service
    ↓
PostgreSQL
```

### Companies Controller

Responsible for handling HTTP requests:

```text
GET /companies
GET /companies/:slug
```

### Companies Service

Responsible for:

- Fetching companies
- Searching companies
- Filtering by industry
- Finding a company by slug
- Handling company-not-found cases

### Prisma Service

Provides database access through Prisma ORM.

---

## Frontend Architecture

The frontend uses the Next.js App Router.

```text
Next.js
   ↓
Companies Listing
   ↓
Backend REST API
   ↓
NestJS
   ↓
Prisma
   ↓
PostgreSQL
```

The frontend communicates with the backend through the configured:

```text
NEXT_PUBLIC_API_URL
```

---

## Dummy Data

The application uses dummy/sample company data for demonstration purposes.

Sample companies include:

- OpenAI
- Anthropic
- Google DeepMind
- Mistral AI
- Cohere
- The AI Signal

The data is stored in PostgreSQL through Prisma.

---

## Development Notes

- Backend and frontend are maintained as separate applications inside the same repository.
- PostgreSQL is used for persistent company data.
- Prisma migrations are included in the repository.
- Environment-specific configuration is stored in `.env` and `.env.local`.
- Environment files are not committed to GitHub.
- The application is designed as a focused single-module implementation for the AI Orbit design and development task.

---

## GitHub Repository

Repository:

https://github.com/vamshi-982/ai-orbit-companies

---

## Assignment Summary

This project implements a complete **AI Companies module end-to-end**, including:

- Frontend UI
- Backend REST APIs
- Database integration
- Search
- Filtering
- Company detail pages
- Loading, empty, error, and not-found states
- Responsive layouts
- Environment-based configuration
- Project documentation

The implementation is built with **Next.js, TypeScript, NestJS, Prisma, and PostgreSQL**.
## Live Demo

- Frontend: https://ai-orbit-companies-six.vercel.app/
- Backend API: https://ai-orbit-companies.onrender.com/companies
- GitHub: https://github.com/vamshi-982/ai-orbit-companies
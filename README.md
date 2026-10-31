# Library Management System

A library management backend built with **NestJS**, **Prisma ORM**, and **PostgreSQL**.

## Technologies Used

- NestJS – Backend application framework
- TypeScript – Programming language
- Prisma ORM – Database access and schema management
- PostgreSQL – Relational database
- Neon – Hosted PostgreSQL database

## Project Structure

```text
library-management-system/
├── api/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   └── prisma/
│   │       └── prisma.service.ts
│   ├── .env.example
│   └── package.json
└── README.md
```

## Database Models

The database contains the following models:

- **User:** Stores user information and assigns each user a role.
- **Genre:** Stores book categories.
- **Book:** Stores book information and references its genre.

The `Role` enum defines two roles: `PATRON` and `LIBRARIAN`.

## Schema Decisions

The Book model references Genre through a `genreId` foreign key instead of embedding genre information directly inside each book.

This design keeps the database normalized and avoids repeating genre information across multiple books. If a genre's details change, they only need to be updated in one place.

The relationship also maintains referential integrity by ensuring that each book references an existing genre. Prisma makes it possible to query books together with their related genre information.

## Database Setup

1. Navigate to the API directory:

```bash
cd api
```

2. Install dependencies:

```bash
npm install
```

3. Create an `.env` file using `.env.example` as a template.

4. Add your PostgreSQL connection string to `.env`.

5. Run database migrations:

```bash
npx prisma migrate dev
```

6. Seed the database:

```bash
npx prisma db seed
```

## Running the Application

From the `api` directory:

```bash
npm run start:dev
```

## Database Seeding

The seed script creates four genres and sixteen sample books across those genres.

Run it using:

```bash
npx prisma db seed
```

## Environment Variables

The application uses `DATABASE_URL` to connect to PostgreSQL.

Never commit your actual `.env` file or expose database credentials. Use `.env.example` as a template.

## License

This project was developed as part of a Library Management System assignment.
# Local Development Setup Guide

Welcome to the local setup guide for **Cloud Cost Ops**. This document will guide you through the steps required to set up the project on your local machine for development purposes.

## 🚀 Tech Stack

- **Package Manager**: [pnpm](https://pnpm.io/cli/add)
- **Backend**: Supabase (Postgres Database)
- **ORM**: [Prisma](https://www.prisma.io/docs/concepts/components/prisma-studio)
- **Caching**: Redis
- **Build Tool**: [TurboRepo](https://turbo.build/repo/docs/handbook/package-installation)

## 🛠️ Installation Steps

### 1. Install Project Dependencies

First, ensure you have `pnpm` installed. If not, follow the [pnpm installation guide](https://pnpm.io/cli/add). Then, install the project dependencies:

```bash
pnpm install
```

### 2. Start Redis Server

Initialize the Redis server using Docker:

```bash
docker-compose up -d
```

### 3. Initialize Supabase/Postgres Database

Start the Supabase service which will also initialize the Postgres database:

```bash
start:supabase
```

For a deeper dive into local development with Supabase, refer to the [official Supabase documentation](https://supabase.com/docs/guides/cli/local-development).

### 4. Generate Prisma Client

Generate the Prisma Client, which provides CRUD operations for the models defined in your schema:

```bash
pnpm db:generate
```

This command populates the `node_modules/@prisma/client` directory with the generated client.

### 5. Sync Database Schema

Ensure your database schema matches the Prisma schema:

```bash
pnpm db:push
```

### 6. Start the Development Server

Kick off the development server:

```bash
pnpm run dev
```

### 7. Run Specific Workspace (Webapp)

To run only the webapp portion of the workspace:

```bash
pnpm run dev --filter webapp
```

## 📚 Additional Resources

- [TurboRepo Handbook](https://turbo.build/repo/docs/handbook/package-installation)
- [pnpm CLI Documentation](https://pnpm.io/cli/add)
- [Supabase Local Development Guide](https://supabase.com/docs/guides/cli/local-development)
- [Prisma Studio Overview](https://www.prisma.io/docs/concepts/components/prisma-studio)

---

Thank you for contributing to [Project Name]! If you face any issues during the setup, please refer to the respective documentation linked above or raise an issue in the repository.

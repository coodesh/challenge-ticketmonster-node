
# Movie Reservation System

A simple backend service in Node.js/TypeScript for managing movies, showtimes and seat reservations.

## Features

- User signup, login and role-based access via JWT
- CRUD operations for movies (admin only)
- CRUD operations for showtimes (admin only)
- List movies and their showtimes
- Check available seats and make/cancel reservations

## Technology Stack

- **Node.js** with **TypeScript**
- **Express.js** - Web framework
- **Sequelize** - ORM for PostgreSQL
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **PostgreSQL** - Database

## Prerequisites

- Node.js 18+ or higher
- npm or yarn
- PostgreSQL database

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ticketmonster/nodejs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and update settings:
   ```bash
   cp .env.example .env
   ```

4. Build the TypeScript project:
   ```bash
   npm run build
   ```

5. Set up the database (seed with initial data):
   ```bash
   npm run db:setup
   ```

6. Start the application:
   ```bash
   # Development mode (with hot reload)
   npm run dev
   
   # Production mode
   npm start
   ```

The server listens by default on `:3232`.

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm run seed` - Seed database with initial data
- `npm run db:reset` - Reset database (clear all data)
- `npm run db:setup` - Set up database with initial data

## Docker

To run both the API and a PostgreSQL database with Docker:

```bash
docker-compose up -d
```

This will:
- Build the Node.js application
- Start the service on port `3232`
- Spin up PostgreSQL on port `5432`
- Automatically create the database schema

To stop and remove containers:

```bash
docker-compose down
```

## Environment Variables

The application uses the following environment variables (see `.env.example`):

```bash
DB_HOST=db              # Database host (use 'localhost' for local development)
DB_PORT=5432           # Database port
DB_USER=postgres       # Database username
DB_PASSWORD=postgres   # Database password
DB_NAME=postgres       # Database name
JWT_SECRET=your_jwt_secret  # JWT secret key (change this!)
DB_SSLMODE=disable     # Database SSL mode
```

## Project Structure

```
├── src/
│   ├── server.ts              # Main application entry point
│   ├── config/
│   │   └── database.ts        # Database configuration
│   ├── controllers/           # Route handlers
│   │   ├── authController.ts
│   │   ├── movieController.ts
│   │   ├── reservationController.ts
│   │   └── showtimeController.ts
│   ├── middleware/            # Custom middleware
│   │   ├── adminMiddleware.ts
│   │   └── authMiddleware.ts
│   ├── models/                # Sequelize models
│   │   ├── index.ts
│   │   ├── Movie.ts
│   │   ├── Reservation.ts
│   │   ├── Showtime.ts
│   │   └── User.ts
│   ├── routes/                # Route definitions
│   │   └── index.ts
│   └── services/              # Business logic layer
│       ├── authService.ts
│       ├── movieService.ts
│       ├── reservationService.ts
│       └── showtimeService.ts
├── scripts/                   # Database scripts
│   ├── reset.ts              # Reset database
│   └── seed.ts               # Seed initial data
├── docker-compose.yml         # Docker configuration
├── Dockerfile                 # Docker build instructions
├── package.json              # Dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## API Endpoints

> **Public**
>
>| Method | Endpoint     | Description        |
>| ------ | ------------ | ------------------ |
>| POST   | `/api/signup`| Register a new user|
>| POST   | `/api/login` | Authenticate user  |
>| GET    | `/api/movies`| List all movies    |
>
> **User (authenticated)**
>
>| Method | Endpoint                                     | Description                     |
>| ------ | -------------------------------------------- | ------------------------------- |
>| GET    | `/api/user/reservations`                     | List current user's reservations|
>| POST   | `/api/reservations`                          | Create a new reservation        |
>| DELETE | `/api/reservations/:reservationId`           | Cancel a reservation            |
>| GET    | `/api/showtimes/:showtimeId/seats`           | Get available seats             |
>| GET    | `/api/movies/:movieID/showtimes`             | List showtimes for a movie      |
>
> **Admin**
>
>| Method | Endpoint                                     | Description                     |
>| ------ | -------------------------------------------- | ------------------------------- |
>| POST   | `/api/admin/movies`                          | Create a movie                  |
>| PUT    | `/api/admin/movies/:movieId`                 | Update a movie                  |
>| DELETE | `/api/admin/movies/:movieId`                 | Delete a movie                  |
>| GET    | `/api/admin/reservations`                    | List all reservations           |
>| POST   | `/api/admin/users/:userId/promote`           | Promote a user to admin         |
>| POST   | `/api/admin/showtimes`                       | Create a showtime               |
>| PUT    | `/api/admin/showtimes/:showtimeId`           | Update a showtime               |
>| DELETE | `/api/admin/showtimes/:showtimeId`           | Delete a showtime               |

## Development

### Local Development Setup

1. Make sure PostgreSQL is running locally
2. Update `.env` file with local database settings:
   ```bash
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=ticketmonster
   ```
3. Run in development mode:
   ```bash
   npm run dev
   ```

### Database Management

- **Reset database**: `npm run db:reset` (⚠️ This will delete all data)
- **Seed database**: `npm run db:setup` (Creates initial admin user and sample data)

### Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

### Default Admin User

After running `npm run db:setup`, you can login with:
- **Email**: admin@example.com
- **Password**: admin123

## Testing the API

You can test the API using curl or any HTTP client:

```bash
# Register a new user
curl -X POST http://localhost:3232/api/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"user","email":"user@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3232/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get movies (public endpoint)
curl http://localhost:3232/api/movies
```

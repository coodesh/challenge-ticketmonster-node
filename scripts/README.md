# Migration Scripts - TicketMonster

This directory contains scripts to manage the TicketMonster database.

## Available Scripts

### 🌱 Seed (Populate Database)

Clears the database and populates it with sample data.

```bash
npm run seed
# or
npm run db:setup
```

**What this script does:**

- Removes all existing tables
- Recreates tables based on models
- Inserts sample data:
  - 5 users (1 admin + 4 regular users)
  - 6 movies of different genres
  - 126 showtimes (3 per movie per day, for 7 days)
  - 15 sample reservations

### 🗑️ Reset (Clear Database)

Only clears the database without inserting data.

```bash
npm run db:reset
```

**What this script does:**

- Removes all existing tables
- Recreates empty tables

## Created Data

### 👥 Users

- **Admin:** admin@ticketmonster.com / admin123 (role: 2)
- **Users:**
  - john@example.com / user123 (role: 1)
  - jane@example.com / user123 (role: 1)
  - mike@example.com / user123 (role: 1)
  - sarah@example.com / user123 (role: 1)

### 🎬 Movies

1. **The Matrix Reloaded** (Action) - Lana Wachowski
2. **The Grand Budapest Hotel** (Comedy) - Wes Anderson
3. **Interstellar** (Science Fiction) - Christopher Nolan
4. **Parasite** (Drama) - Bong Joon-ho
5. **Mad Max: Fury Road** (Action) - George Miller
6. **Knives Out** (Comedy) - Rian Johnson

### 🎭 Showtimes

- 3 time slots per movie per day: 2:00 PM, 5:30 PM, 8:30 PM
- Showtimes for the next 7 days
- Available seats: 50-100 per showtime
- Prices: $15.00 - $35.00

### 🎫 Reservations

- 15 sample reservations distributed among users
- Different seat quantities (1-4 per reservation)
- Various dates over the last 7 days

## Prerequisites

Make sure that:

1. PostgreSQL database is running
2. Environment variables are configured in the `.env` file
3. Dependencies are installed (`npm install`)

## Usage Example

```bash
# Install dependencies
npm install

# Setup database with sample data
npm run seed

# To clear and start from scratch
npm run db:reset
npm run seed
```

## Scripts Structure

```
scripts/
├── seed.js          # Populate database with sample data
└── reset.js         # Clear database
```

## Troubleshooting

### Database connection error

- Check if PostgreSQL is running
- Verify settings in the `.env` file
- Test the connection manually

### Permission errors

- Check if the database user has adequate permissions
- Confirm that the database exists

### Tables already exist

- Use `npm run db:reset` to clear before populating
- Or use `npm run seed` which already does the reset automatically

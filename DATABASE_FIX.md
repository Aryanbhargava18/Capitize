# Database Connection Fix

## Issue
The application cannot connect to the Neon database server at:
`ep-mute-sun-a7sb81k0-pooler.ap-southeast-2.aws.neon.tech:5432`

## Solutions

### 1. Check Environment Variables

Make sure you have a `.env.local` file in the root directory with:

```env
DATABASE_URL="postgresql://user:password@ep-mute-sun-a7sb81k0-pooler.ap-southeast-2.aws.neon.tech:5432/dbname?sslmode=require"
DIRECT_URL="postgresql://user:password@ep-mute-sun-a7sb81k0-pooler.ap-southeast-2.aws.neon.tech:5432/dbname?sslmode=require"
```

**Important Notes:**
- Replace `user`, `password`, and `dbname` with your actual Neon database credentials
- The `DIRECT_URL` should be the same as `DATABASE_URL` for Neon (or use the non-pooler connection string)
- Make sure `.env.local` is in your `.gitignore` file

### 2. Verify Database Status

1. Go to your Neon dashboard: https://console.neon.tech
2. Check if your database is active
3. Verify the connection string is correct
4. Check if the database has been paused (Neon pauses inactive databases)

### 3. Test Database Connection

You can test the connection using:

```bash
# Using psql (if installed)
psql "your-database-url"

# Or using Prisma Studio
npx prisma studio
```

### 4. Regenerate Prisma Client

After fixing the environment variables:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (if needed)
npx prisma migrate deploy

# Or reset database (WARNING: This deletes all data)
npx prisma migrate reset
```

### 5. Restart Development Server

After updating environment variables:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

### 6. Check Network/Firewall

- Ensure your network allows connections to Neon's servers
- Check if you're behind a corporate firewall
- Try using a VPN if needed

### 7. Alternative: Use Local Database for Development

If you want to use a local PostgreSQL database for development:

1. Install PostgreSQL locally
2. Update `.env.local`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/welth?schema=public"
DIRECT_URL="postgresql://postgres:password@localhost:5432/welth?schema=public"
```
3. Run migrations:
```bash
npx prisma migrate dev
```

## What Was Fixed

I've also fixed the missing `checkUser()` call by adding it to the middleware. This ensures that when users access protected routes, they are automatically created in the database if they don't exist.

The middleware now:
- Checks if user exists in database on protected routes
- Creates user if they don't exist
- Handles errors gracefully without blocking requests

## Still Having Issues?

1. Check Neon dashboard for database status
2. Verify your connection string format
3. Check if your IP is whitelisted (if using IP restrictions)
4. Try creating a new database in Neon and updating the connection string
5. Check Neon's status page for any outages


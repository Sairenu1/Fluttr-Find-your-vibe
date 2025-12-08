# Step-by-Step Setup Instructions

## ✅ Step 1: PostgreSQL Database Setup

### Check if PostgreSQL is installed:
```cmd
psql --version
```

### If NOT installed:
1. Download from: https://www.postgresql.org/download/windows/
2. Install (remember the password you set for `postgres` user)
3. Default port is 5432

### Create Database:
Open Command Prompt and run:
```cmd
psql -U postgres
```
Then in psql, type:
```sql
CREATE DATABASE bookmyshow;
\q
```

**OR** use pgAdmin (GUI tool) to create database named `bookmyshow`

---

## ✅ Step 2: Configure Backend Database

1. Open file: `backend\src\main\resources\application.properties`
2. Find these lines (around line 6-8):
   ```properties
   spring.datasource.username=postgres
   spring.datasource.password=postgres
   ```
3. **CHANGE** the password to YOUR PostgreSQL password
4. If your PostgreSQL username is different, change that too
5. Save the file

---

## ✅ Step 3: Configure Stripe (Optional - Skip if you just want to test)

### Get Stripe Test Keys:
1. Go to: https://stripe.com
2. Sign up (free account)
3. Go to: Developers → API keys
4. Copy your **Test** keys (they start with `sk_test_` and `pk_test_`)

### Update Backend:
1. Open: `backend\src\main\resources\application.properties`
2. Find lines 28-29:
   ```properties
   stripe.secret.key=sk_test_your_stripe_secret_key_here
   stripe.publishable.key=pk_test_your_stripe_publishable_key_here
   ```
3. Replace with your actual keys
4. Save

### Update Frontend:
1. In `frontend` folder, create a file named `.env` (if it doesn't exist)
2. Add these lines:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   ```
3. Replace `pk_test_your_actual_key_here` with your actual Stripe publishable key
4. Save

**Note:** You can skip Stripe setup for now. Everything else will work, only payment will fail.

---

## ✅ Step 4: Run Backend

Open Command Prompt in the project folder:

```cmd
cd backend
mvn clean install
mvn spring-boot:run
```

**Wait for:** You should see "Started BookMyShowApplication" message

**First time:** It will automatically:
- Create all database tables
- Add sample data (movies, theaters, shows)
- Create admin user: `admin@bookmyshow.com` / `admin123`

**Keep this window open!** The backend must keep running.

---

## ✅ Step 5: Run Frontend (New Window)

Open a **NEW** Command Prompt window:

```cmd
cd C:\Users\HP\sparkmate\bookmyshow-clone\frontend
npm install
npm run dev
```

**Wait for:** You should see "Local: http://localhost:5173"

---

## ✅ Step 6: Open in Browser

1. Open browser
2. Go to: http://localhost:5173
3. You should see the home page!

---

## 🎯 Quick Test

1. **Login as Admin:**
   - Email: `admin@bookmyshow.com`
   - Password: `admin123`
   - Click "Admin" in navbar to see dashboard

2. **Login as User:**
   - Email: `user@test.com`
   - Password: `password123`
   - Browse movies and book tickets

---

## ⚠️ Common Issues & Fixes

### Backend Error: "Connection refused"
- **Fix:** Start PostgreSQL service
  ```cmd
  net start postgresql-x64-14
  ```

### Backend Error: "password authentication failed"
- **Fix:** Check password in `application.properties` matches your PostgreSQL password

### Backend Error: "database does not exist"
- **Fix:** Create database:
  ```sql
  CREATE DATABASE bookmyshow;
  ```

### Frontend Error: "npm not found"
- **Fix:** Install Node.js from https://nodejs.org

### Port 8080 already in use
- **Fix:** Change port in `application.properties`:
  ```properties
  server.port=8081
  ```

---

## 📝 Summary of Files to Edit

1. **`backend\src\main\resources\application.properties`**
   - Line 8: Change `password=postgres` to your PostgreSQL password
   - Lines 28-29: Add Stripe keys (optional)

2. **`frontend\.env`** (create if doesn't exist)
   - Add Stripe publishable key (optional)

That's it! Just these 2 files to configure.


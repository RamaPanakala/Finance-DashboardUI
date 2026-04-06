### Prerequisites
- Node.js (v14 or higher)
- npm

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm start
```

The application will open automatically at `http://localhost:3001 `

### 3. Login with Demo Credentials
- **Viewer Mode**: Access Key: `viewer123`
- **Admin Mode**: Email: `admin@example.com` | Password: `admin123`

---

## 📦 Installation

### Step 1: Navigate to Frontend Directory
```bash
cd finance-dashboardui/frontend
```

### Step 2: Install All Dependencies
```bash
npm install
```

This installs:
- React 19.2.4 (UI framework)
- React Context API (state management)
- CSS with Tailwind & PostCSS (styling)
- React Hooks (functional components)

### Step 3: Verify Installation
```bash
npm list
```

---

## ▶️ Running the Application

### Development Mode (Recommended)
```bash
npm start
```
- Application runs on `http://localhost:3000`
- Hot reload enabled (changes update automatically)
- Debug tools available in browser console

### Production Build
```bash
npm run build
```
Creates optimized production build in `build/` folder

### Test Mode
```bash
npm test
```
Runs all test files with `.test.js` extension

---

## 🔐 Login Instructions

### Method 1: Viewer Mode (Read-Only Access)
Perfect for viewing data without editing permissions.

**Steps:**
1. Click the **👁️ Viewer** button on login screen
2. Enter Access Key: `viewer123`
3. Click **"Access Dashboard"**

**What You'll See:**
- Dashboard with financial data (read-only)
- Transactions list
- Insights and charts
- Profile shows only your **Name**
- Status badge: **👁️ Viewer** (Cyan color)

### Method 2: Admin Mode (Full Access)
Full permissions to view, edit, and manage all data.

**Steps:**
1. Click the **🔐 Admin** button on login screen
2. Enter Credentials:
   - Email: `admin@example.com`
   - Password: `admin123`
3. Click **"Login as Admin"**

**What You'll See:**
- Complete dashboard with all features
- Edit profile button available
- Transactions and insights with full control
- Profile shows: **Name**, **Admin Email**, **Phone**
- Status badge: **🔐 Admin** (Purple color)
- Edit Profile permission enabled

### Method 3: Register as New Admin
Create a new admin account for testing.

**Steps:**
1. In Admin login form, click **"Register here"**
2. Fill in registration form:
   - Email: (your test email)
   - Password: (minimum 6 characters)
   - Confirm Password: (must match)
   - Viewer Access Key: `viewer123`
3. Click **"Register"**

---

## 👤 User Roles & Status Display

### Live Status Badge
Located in the **Sidebar** (left sidebar, below ZORVYN logo)

Shows real-time information:
- **Current User Name** (centered)
- **Role Badge** with color coding

### Switching Roles
In **Profile Modal**:
1. Click "👤 Profile" button in sidebar
2. Click the **"Switch Role"** dropdown
3. Select preferred role (Admin or Viewer)
4. If switching to Admin:
   - Enter admin credentials
   - Click "Verify & Switch"
5. If switching to Viewer:
   - Confirmation automatic
   - Role updates instantly

---

## Overview

### Dashboard
- Real-time financial overview
- Balance display
- Recent transactions snapshot
- Quick insights

### Transactions
- View all financial transactions
- Filter and search capabilities
- Export transaction data
- Transaction details view

### Insights
- Visual charts and graphs
- Spending analysis
- Monthly/yearly trends
- Growth indicators

### Profile
- View/Edit user information
- Role switching
- Admin email display (Admin only)
- Phone number management

### Settings
- Application preferences
- Theme selection

### Help & Support
- FAQ section
- Contact information

---

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML entry point
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO robots file
│
├── src/
│   ├── components/         # React components
│   │   ├── Dashboard.js    # Main dashboard
│   │   ├── Transactions.js
│   │   ├── Insights.js
│   │   ├── Profile.js
│   │   ├── Login.js
│   │   ├── Sidebar.js
│   │   ├── Settings.js
│   │   ├── HelpSupport.js
│   │   └── CurrencySelector.js
│   │
│   ├── styles/            # CSS styling
│   │   ├── Profile.css
│   │   ├── Sidebar.css
│   │   ├── Login.css
│   │   ├── Dashboard.css
│   │   └── ...
│   │
│   ├── utils/             # Utility functions
│   │   ├── currencyUtils.js
│   │   └── exportUtils.js
│   │
│   ├── App.js             # Root component
│   ├── AppContext.js
│   ├── AuthContext.js
│   ├── index.js
│   └── index.css
│
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
└── README_SETUP.md 
```

---

## 🔑 Demo Credentials

### Quick Reference
| Role | Username | Password | Access Method |
|------|----------|----------|---|
| Viewer | N/A | `viewer123` | Access Key |
| Admin | `admin@example.com` | `admin123` | Email & Password |

### Testing Login
1. **Test Viewer Access**: Use key `viewer123`
2. **Test Admin Access**: Use `admin@example.com` / `admin123`
3. **Test Role Switching**: 
   - Login as Admin
   - Open Profile
   - Switch to Viewer (no credentials needed)
   - Switch back to Admin (credentials required)

---

## 🔄 User Flow

```
┌─────────────────────────────────────┐
│        Launch Application           │
│     npm start (localhost:3000)      │
└──────────────────┬──────────────────┘
                   │
                   ▼
         ┌─────────────────────┐
         │   Login Screen      │
         └────────┬────────────┘
                  │
         ┌────────┴────────┐
         │                 │
         ▼                 ▼
    ┌────────┐        ┌────────┐
    │ Viewer │        │ Admin  │
    └────┬───┘        └───┬────┘
         │                │
         ▼                ▼
  Viewer Dashboard   Admin Dashboard
  (Read-only)       (Full Access)
         │                │
         └────────┬───────┘
                  │
    ┌─────────────▼──────────────┐
    │  Click Profile Button      │
    │ (Sidebar → 👤 Profile)     │
    └──────────────┬─────────────┘
                   │
    ┌──────────────▼──────────────┐
    │  Profile Modal Opens        │
    │ Shows Role-Specific Data    │
    │ - Admin: All details        │
    │ - Viewer: Name only         │
    └─────────────────────────────┘
```

---

## 🌙 Dark Mode

**Toggle:** Click "☀️ Light" or "🌙 Dark" button in Sidebar footer

---

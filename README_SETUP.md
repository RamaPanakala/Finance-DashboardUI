# Finance Dashboard UI - Setup & Usage Guide

## 📋 Table of Contents
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Login Instructions](#login-instructions)
- [User Roles & Status Display](#user-roles--status-display)
- [Features Overview](#features-overview)
- [Project Structure](#project-structure)
- [Demo Credentials](#demo-credentials)

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm start
```

The application will open automatically at `http://localhost:3000`

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

### Viewer Role (👁️ Viewer)
- Status Color: **Cyan** with glow effect
- Permissions: Read-only access
- Profile Display: **Name only** (Email & Phone hidden)
- Edit Profile: **Disabled**

### Admin Role (🔐 Admin)
- Status Color: **Purple** with glow effect
- Permissions: Full access (view, edit, delete)
- Profile Display: **Name**, **Admin Email**, **Phone** (highlighted box)
- Edit Profile: **Enabled**

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

## ✨ Features Overview

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
- Privacy options

### Help & Support
- FAQ section
- Contact information
- Troubleshooting guide

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
│   │   ├── Profile.js      # User profile (conditional rendering)
│   │   ├── Login.js        # Login with placeholders
│   │   ├── Sidebar.js      # Sidebar + Status display
│   │   ├── Settings.js
│   │   ├── HelpSupport.js
│   │   └── CurrencySelector.js
│   │
│   ├── styles/            # CSS styling
│   │   ├── Profile.css     # Profile + admin section styling
│   │   ├── Sidebar.css     # Status badge styling
│   │   ├── Login.css
│   │   ├── Dashboard.css
│   │   └── ...
│   │
│   ├── utils/             # Utility functions
│   │   ├── currencyUtils.js
│   │   └── exportUtils.js
│   │
│   ├── App.js             # Root component
│   ├── AppContext.js      # Global app state (theme, etc)
│   ├── AuthContext.js     # Authentication state & user role
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
│
├── package.json           # Dependencies & scripts
├── package-lock.json      # Dependency lock file
├── tailwind.config.js     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
└── README_SETUP.md        # This file
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

## 🎨 Key Files for Status Display

### Sidebar Status Component
**File:** `src/components/Sidebar.js`
- **Lines 1-10**: Imports including `useAuth` hook
- **Lines 25-27**: Gets user data from AuthContext
- **Lines 29-30**: Computes role display and user name
- **Lines 48-54**: Renders status badge section

### Status Styling
**File:** `src/styles/Sidebar.css`
- **Lines 55-110**: Complete status display CSS
- `.sidebar-user-status`: Container styling
- `.status-role.admin`: Purple admin badge
- `.status-role.viewer`: Cyan viewer badge

### Profile Conditional Display
**File:** `src/components/Profile.js`
- **Lines 151-165**: Always shows Name
- **Lines 167-176**: Shows Email & Phone only for Admin
- **Lines 178-184**: Role indicator
- **Lines 196-201**: Edit button visible only for Admin

### Profile Admin Section Styling
**File:** `src/styles/Profile.css`
- **Lines 201-211**: `.info-row.admin-section` styling
- Purple background highlighting for admin data
- Smooth fade-in animation

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
- Persists across sessions
- Updates all UI components
- Smooth transition effects
- Status badges adjust for visibility

---

## 📱 Responsive Design

Application is fully responsive:
- **Desktop** (1024px+): Full layout with sidebar
- **Tablet** (768px-1023px): Collapsible sidebar
- **Mobile** (480px-767px): Optimized touch interface
- **Small Mobile** (<480px): Simplified layout

---

## 🐛 Troubleshooting

### Application Won't Start
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Status Not Showing
1. Check `AuthContext.js` is providing `userRole`
2. Verify `useAuth()` hook is imported in Sidebar
3. Check browser console for errors

### Login Not Working
1. Ensure credentials match demo data exactly:
   - Admin: `admin@example.com` / `admin123`
   - Viewer: `viewer123`
2. Check localStorage in browser DevTools
3. Verify `AuthContext.js` login handlers

### Profile Data Not Conditional
1. Check `role` state in Profile component
2. Verify AppContext is providing role value
3. Clear browser cache and restart

### Status Badge Not Updating When Switching Roles
1. Check `setUserRole()` is called in `handleRoleChange`
2. Verify Sidebar component re-renders on role change
3. Check React DevTools for state updates

---

## 🚀 Advanced Usage

### Custom Credentials
To add new demo users, edit `AuthContext.js`:
```javascript
// Add to loginAdmin function
const validCredentials = {
  'admin@example.com': 'admin123',
  'yourEmail@example.com': 'yourPassword'  // Add custom credentials
};
```

### Modify Status Badge Colors
Edit `src/styles/Sidebar.css`:
```css
.status-role.admin {
  background: rgba(YOUR_R, YOUR_G, YOUR_B, 0.25); /* Change colors */
  color: #YOUR_COLOR;
  border: 1px solid rgba(YOUR_R, YOUR_G, YOUR_B, 0.4);
}
```

### Change Profile Display Logic
Edit `src/components/Profile.js` conditional rendering:
```javascript
{role === 'YourRole' && (
  <div>Your conditional content</div>
)}
```

---

## 📞 Support

### Key Contacts
- **Dashboard Issues**: Check `Dashboard.js`
- **Login Issues**: Check `AuthContext.js`
- **Profile Issues**: Check `Profile.js`
- **Styling Issues**: Check `styles/` folder
- **State Issues**: Check `AppContext.js`

### Debug Mode
Open browser DevTools (F12) and check:
- **Console tab**: Error messages
- **Application → LocalStorage**: Stored user data
- **React DevTools**: Component state and props

---

## 📝 Commands Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm start` | Start development server |
| `npm test` | Run tests |
| `npm run build` | Create production build |
| `npm run eject` | Eject from Create React App (irreversible) |

---

## ✅ Checklist for First-Time Setup

- [ ] Node.js installed
- [ ] Navigated to `frontend/` directory
- [ ] Ran `npm install`
- [ ] Ran `npm start`
- [ ] Application opened at `http://localhost:3000`
- [ ] Tried Viewer login with `viewer123`
- [ ] Tried Admin login with `admin@example.com` / `admin123`
- [ ] Opened Profile and verified conditional display
- [ ] Checked Status badge in Sidebar
- [ ] Switched between roles and verified updates
- [ ] Tested dark mode toggle

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Context API Guide](https://react.dev/reference/react/useContext)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)

---

**Last Updated:** April 5, 2026  
**Version:** 1.0  
**Status:** Active & Tested ✅

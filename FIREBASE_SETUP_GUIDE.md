# 🔥 Firebase Setup Guide for PaoCheek

This guide will help you set up Firebase for cloud data synchronization and user authentication.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create Project"**
3. Enter a project name (e.g., "PaoCheek")
4. Choose your location (preferably closest to your users)
5. Click **"Create Project"** and wait for it to finish

## Step 2: Register a Web App

1. In your Firebase project dashboard, click the **Web icon** (</> symbol)
2. Enter an app name (e.g., "PaoCheek Web")
3. Check "Also set up Firebase Hosting for this app" (optional)
4. Click **"Register app"**

## Step 3: Get Your Firebase Credentials

After registering, Firebase will show you a code snippet. Copy the values from this snippet.

Your config should look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "paocheek.firebaseapp.com",
  projectId: "paocheek-app",
  storageBucket: "paocheek-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

## Step 4: Add Credentials to Your Project

### 4.1 Copy Environment Template

In your project root directory:

```bash
cp .env.example .env.local
```

### 4.2 Edit `.env.local`

Open `.env.local` and fill in your Firebase credentials:

```bash
# Firebase Configuration
# Get these values from your Firebase project settings (Step 3)

VITE_FIREBASE_API_KEY=AIzaSyD...
VITE_FIREBASE_AUTH_DOMAIN=paocheek.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=paocheek-app
VITE_FIREBASE_STORAGE_BUCKET=paocheek-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

⚠️ **IMPORTANT**: 
- Make sure `.env.local` is in the **project root** (same folder as `package.json`)
- Never commit `.env.local` to GitHub (it's in `.gitignore`)
- Variable names **must start with `VITE_`** (Vite requirement)

## Step 5: Enable Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **"Create Database"**
3. Choose **"Start in test mode"** (for development only)
4. Select a location and click **"Create"**

### Security Rules for Development (Test Mode)

When you first create the database, it will have these rules:

```json
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2026, 8, 15);
    }
  }
}
```

This allows anyone to read/write data during the test period. **For production, update these rules!**

### Security Rules for Production

When you go live, update your Firestore rules to this:

```json
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bills/{userId}/bills/{billId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## Step 6: Enable Authentication (Optional)

For future features like user accounts:

1. Go to **Authentication** in Firebase Console
2. Click **"Get Started"**
3. Click on **"Email/Password"** or **"Google"**
4. Enable it and save

## Step 7: Install Dependencies

In your project directory:

```bash
npm install
```

## Step 8: Test Your Setup

### Start the dev server:

```bash
npm run dev
```

### Test LocalStorage First

The app will work with **local storage only** initially. Try:
1. Create a bill
2. Refresh the page
3. Your bill should still be there ✅

### Verify Firebase Config

Check if Firebase loads without errors:
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. You should NOT see Firebase errors
4. (If you don't have `.env.local` configured, there will be a warning - that's OK)

## Common Issues & Solutions

### ❌ Issue: ".env.local not being read"

**Symptoms**: Variables show as `undefined`

**Solution**:
- Make sure `.env.local` is in the project root (same folder as `package.json`)
- Prefix all variables with `VITE_`
- **Restart the dev server** after adding/editing `.env.local`

```bash
npm run dev
```

### ❌ Issue: "CORS or Firebase errors in console"

**Symptoms**: Red errors about Firebase

**Solutions**:
1. Double-check credentials in `.env.local` match Firebase Console
2. Restart dev server
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try a different browser

### ❌ Issue: "Permission denied" error in Firebase

**Symptoms**: Can't read/write data

**Solutions**:
- Check Firestore security rules (should be in test mode)
- Verify you're in test mode (rules show `allow read, write`)
- Wait a few minutes after creating the database
- Try reading the Firebase Console - sometimes it needs a refresh

### ❌ Issue: QR Code not generating

**Symptoms**: Blank QR code area

**Solutions**:
- This is expected! The current QR code is a placeholder
- For real PromptPay QR codes, you'll need a PromptPay API
- For now, the app shows dummy bank details

### ❌ Issue: Bills not syncing to Firebase

**Symptoms**: Bills only save locally, not in cloud

**Solutions**:
- Firebase integration is not yet implemented in the frontend
- Currently, the app uses **local storage only**
- To enable Firebase sync:
  1. Update `src/App.jsx` to save bills to Firestore
  2. Add Firebase read functions
  3. Implement real-time listeners with `onSnapshot()`

## Next Steps

### After Basic Setup

1. ✅ Test with local storage (no Firebase needed)
2. ✅ Verify Firebase config loads without errors
3. ✅ Create a few test bills

### For Cloud Sync (Optional)

To make bills sync to Firebase:

1. **Update `src/App.jsx`** to save bills to Firestore:

```javascript
// After creating a bill, save to Firebase:
import { db } from './config/firebase'
import { collection, addDoc } from 'firebase/firestore'

const addBillToFirebase = async (bill) => {
  if (!db) return // Firebase not configured
  
  try {
    await addDoc(collection(db, 'bills'), {
      ...bill,
      createdAt: new Date(),
      userId: 'user-id-here' // You'll need auth first
    })
  } catch (error) {
    console.error('Error adding bill:', error)
  }
}
```

2. **Add user authentication** (see [Firebase Auth Docs](https://firebase.google.com/docs/auth))

3. **Setup real-time listeners** for automatic updates

## Useful Resources

- 🔗 [Firebase Web Setup Docs](https://firebase.google.com/docs/web/setup)
- 🔗 [Firestore Getting Started](https://firebase.google.com/docs/firestore/quickstart)
- 🔗 [Firebase Authentication](https://firebase.google.com/docs/auth)
- 🔗 [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- 🔗 [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## 🆘 Still Having Issues?

### Debug Steps

1. **Check `.env.local` exists**:
   ```bash
   ls -la .env.local
   ```

2. **Verify variables are loaded** (in browser console):
   ```javascript
   console.log(import.meta.env.VITE_FIREBASE_API_KEY)
   // Should show your actual API key, not undefined
   ```

3. **Check Firebase Console**:
   - Is your project created?
   - Is Firestore database created?
   - Are rules in test mode?

4. **Look at browser DevTools**:
   - Open DevTools (F12)
   - Go to Network tab
   - Reload page
   - Look for any failed requests

5. **Check if Service Worker is blocking things**:
   - Go to DevTools → Application → Service Workers
   - Unregister the service worker
   - Reload page

### If Still Stuck

1. Check the main [README.md](./README.md) for general help
2. Visit [Firebase Support](https://firebase.google.com/support)
3. Check [Firebase Community](https://stackoverflow.com/questions/tagged/firebase)
4. Open an [Issue on GitHub](https://github.com/janiX2545/paocheek-app/issues)

---

**Your Firebase setup is complete! 🎉**

Now you can:
- ✅ Run the app locally with `npm run dev`
- ✅ Create bills and save them locally
- ✅ (Optional) Implement Firebase sync for cloud backup
- ✅ Deploy to production when ready

Happy splitting! 🧾💰

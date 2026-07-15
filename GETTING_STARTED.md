# 🚀 Getting Started with PaoCheek

Welcome to PaoCheek! This guide will help you get up and running in 5 minutes.

## 📦 Installation (2 minutes)

### Step 1: Clone the repo

```bash
git clone https://github.com/janiX2545/paocheek-app.git
cd paocheek-app
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Start the dev server

```bash
npm run dev
```

That's it! Open http://localhost:5173 in your browser. 🎉

## 🧾 Your First Bill (3 minutes)

### 1. Create a Bill

- Enter bill name: `Dinner at Somboon`
- Add friends: `Alice`, `Bob`, `Charlie`

### 2. Add Menu Items

1. **Pad Thai** - ฿150
   - Select: Alice, Bob (they share)
   
2. **Green Curry** - ฿200
   - Select: Bob, Charlie (they share)
   
3. **Mango Sticky Rice** - ฿80
   - Select: All 3 (everyone shares)

### 3. See Results

- Alice pays: ฿75 + ฿26.67 = **฿101.67**
- Bob pays: ฿75 + ฿100 + ฿26.67 = **฿201.67**
- Charlie pays: ฿100 + ฿26.67 = **฿126.67**

### 4. View Details

Click "View Details" to see:
- 📋 Full bill breakdown
- 👥 Everyone's totals
- 💳 Payment details
- 📱 PromptPay QR code (placeholder)

## 💡 Tips & Tricks

### Quick Actions

- **Delete a friend**: Click the X button
- **Remove an item**: Click the X button on the item
- **Expand item details**: Click the dropdown arrow
- **Mark as paid**: Click on a person's card (turns green ✅)

### Keyboard Shortcuts

- `Enter` in friend input → Add friend
- `Enter` in item input → Add item (if all fields filled)

### Best Practices

1. **Use clear names**: "Pad Thai" instead of "Food"
2. **Be specific with amounts**: Include taxes and service charge
3. **Double-check selections**: Make sure all items have at least 1 person
4. **Review before creating**: Check totals before finalizing

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'pastel-pink': '#FFB3D9',      // Change these
  'pastel-blue': '#ADD8E6',
  // ... etc
}
```

### Change Payment Info

Edit `src/components/ReceiptSlip.jsx`:

```javascript
// Find this section and update:
<input
  type="text"
  value="0123456789"  // ← Change account number
  readOnly
/>
```

## 🔄 Local Storage vs Firebase

### Default (Local Storage)

- Bills saved in browser
- No account needed
- Survives page refresh
- Lost if you clear cache/cookies

### With Firebase (Optional)

See [FIREBASE_SETUP_GUIDE.md](./FIREBASE_SETUP_GUIDE.md)

Benefits:
- ☁️ Cloud backup
- 📱 Multiple devices
- 🔐 Secure with authentication
- 📊 Analytics

## 📱 Install as App (PWA)

### Mobile

1. Open app in browser
2. Tap the share icon
3. Select "Add to Home Screen"
4. It appears like a native app!

### Desktop

1. Click the install icon in address bar
2. Click "Install"
3. App appears in your app drawer

## 🛠️ Development

### Available Commands

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

### Project Structure

```
src/
├── components/
│   ├── Header.jsx         # Top bar
│   ├── BillForm.jsx       # Create bills
│   ├── BillList.jsx       # List all bills
│   ├── ReceiptSlip.jsx    # Receipt & payment
│   └── FriendTag.jsx      # Friend indicator
├── config/
│   └── firebase.js        # Firebase setup
├── hooks/
│   └── useLocalStorage.js # Storage hook
├── App.jsx                # Main component
├── main.jsx               # Entry point
└── index.css              # Styles
```

### File Size

- React + Tailwind: ~50KB
- QR Code library: ~20KB
- Firebase (if used): ~50KB
- **Total**: ~70KB (production build)

## 🐛 Debugging

### Check LocalStorage

In browser console:

```javascript
// See all bills
console.log(JSON.parse(localStorage.getItem('paocheek-bills')))

// Clear all bills
localStorage.removeItem('paocheek-bills')
```

### Check Service Worker

In DevTools:
1. Application → Service Workers
2. See registered workers
3. Click "unregister" to disable offline mode

### Check Performance

```bash
npm run build
npm run preview
# Opens optimized build in browser
```

## 📖 Learn More

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [Firebase Docs](https://firebase.google.com/docs)

## 🎯 Next Features (Roadmap)

- [ ] Export bills as PDF
- [ ] Share bills via link
- [ ] Recurring bills
- [ ] Dark mode
- [ ] Multiple currencies
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

## 🤝 Contributing

Found a bug? Want to add a feature?

1. Fork the repo
2. Create a branch: `git checkout -b feature/cool-feature`
3. Make changes
4. Commit: `git commit -m 'Add cool feature'`
5. Push: `git push origin feature/cool-feature`
6. Open a Pull Request

## 💬 FAQ

### Q: My bills disappeared!

**A**: Check localStorage settings:
- Some browsers clear it automatically
- Private/Incognito mode doesn't persist
- Use Firebase for permanent cloud storage

### Q: Can I share bills with others?

**A**: Currently, bills are personal. To share:
1. Share your screen/screenshot
2. Write down the QR code
3. Future: Share link feature coming!

### Q: How do I export a bill?

**A**: Currently not supported, but you can:
1. Take a screenshot
2. Print from browser (Ctrl+P)
3. Future: PDF export coming!

### Q: Can I use this on my phone?

**A**: Yes! Two ways:
1. Open in mobile browser
2. Install as PWA (Add to Home Screen)

### Q: Is my data private?

**A**: Yes:
- Local storage: Only on your device
- Firebase: Only if you set it up with your own project
- Read [FIREBASE_SETUP_GUIDE.md](./FIREBASE_SETUP_GUIDE.md) for security rules

## 🆘 Need Help?

- 📖 Check [README.md](./README.md)
- 🔥 See [FIREBASE_SETUP_GUIDE.md](./FIREBASE_SETUP_GUIDE.md)
- 🐛 Open an [Issue on GitHub](https://github.com/janiX2545/paocheek-app/issues)
- 💬 Start a [Discussion](https://github.com/janiX2545/paocheek-app/discussions)

---

**Ready to split some bills? Let's go! 🧾💰**

Happy splitting! ✨

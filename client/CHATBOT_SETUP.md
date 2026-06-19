# 🤖 SheCurity AI Chatbot Setup Guide

## Get Your FREE Gemini API Key

### Step 1: Create API Key
1. Visit: **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Select **"Create API key in new project"** (or use existing project)
5. Copy the generated API key

### Step 2: Add API Key to Project
1. Open `SheCurity-main/client/.env` file
2. Replace `your_api_key_here` with your actual API key:
   ```
   REACT_APP_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
3. Save the file

### Step 3: Restart Development Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm start
```

## ✅ Verify It's Working

1. Open the app in browser
2. Click the **"Safety AI"** floating button
3. Type any question like:
   - "What should I do in an emergency?"
   - "Tell me about women's safety laws"
   - "How to stay safe while traveling?"

4. Check browser console (F12) for any errors

## 🔍 Troubleshooting

### Issue: Still getting static responses
- **Solution**: Make sure you restarted the dev server after adding API key
- Check console for "API Key missing" warning

### Issue: "API Error: 400"
- **Solution**: Your API key might be invalid. Generate a new one

### Issue: "API Error: 429"
- **Solution**: You've hit the free tier limit. Wait a few minutes or upgrade

### Issue: Translation not working
- **Solution**: LibreTranslate is free but can be slow. Responses will still work in English

## 📊 API Limits (Free Tier)

- **60 requests per minute**
- **1,500 requests per day**
- Perfect for development and testing!

## 🚀 Features

✅ Dynamic AI responses using Google Gemini  
✅ Multi-language support (7 languages)  
✅ Safety-focused context  
✅ Fallback responses if API fails  
✅ Smart error handling  
✅ Beautiful glassmorphism UI  

## 💡 Tips

- Keep your API key secret (don't commit .env to git)
- The chatbot works offline with fallback responses
- For production, consider rate limiting and caching

---

Need help? Check the console logs or contact support!

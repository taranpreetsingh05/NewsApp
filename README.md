# 📰 NewsMonkey

A responsive news application built with **React.js** that fetches the latest headlines across multiple categories using the **GNews API**.

## 🚀 Features

- Browse news by category
- Infinite scrolling
- Responsive UI
- React Router navigation
- Top loading progress bar
- Environment variable support

## 🛠 Tech Stack

- React.js
- React Router DOM
- Bootstrap
- GNews API
- React Infinite Scroll Component

## ⚙️ Installation

```bash
git clone https://github.com/taranpreetsingh05/NewsApp.git
cd NewsApp
npm install --legacy-peer-deps
npm start
```

Create a `.env.local` file:

```env
REACT_APP_GNEWS_API_KEY=YOUR_API_KEY
```

## ⚠️ Note

The live demo is not deployed because the free **GNews API** blocks client-side requests from deployed domains due to CORS restrictions. The application runs correctly in local development.

## 👨‍💻 Author

**Taranpreet Singh**
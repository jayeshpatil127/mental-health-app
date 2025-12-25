# 🧠 MindWell – Mental Health Support Platform

MindWell is a full-stack mental health web application designed to help users
track their emotional well-being, assess mental health using standard tools,
and receive AI-powered support.

This project focuses on **real backend logic**, **data handling**, and
**AI integration**, not just UI.

---

## 🚀 Features

### 👤 Authentication
- User registration & login (Passport.js)
- Session-based authentication
- Role-based access (User / Admin ready)

### 📝 Daily Check-In (CRUD)
- One check-in per day per user
- Tracks:
  - Mood
  - Anxiety
  - Stress
  - Sleep hours
  - Personal notes
- Update same day’s entry instead of duplicate records

### 📊 Dashboard & Insights
- Today’s mood status
- Weekly average mood
- Streak tracking
- Visual trend overview

### 🧠 Self-Assessment Quizzes
- PHQ-5 (Depression)
- PHQ-9 (Depression – detailed)
- GAD-7 (Anxiety)
- Score-based result interpretation
- Non-diagnostic disclaimer included

### 🚨 Risk Detection System
- Rule-based logic (NO fake AI)
- Detects:
  - High anxiety
  - High stress
  - Poor sleep patterns
- Automatically shows crisis alert banner

### 🤖 AI Chatbot (REAL AI)
- Powered by **OpenRouter API**
- Provides supportive, non-diagnostic responses
- Secure backend API integration

### 📚 Resources
- Curated mental health articles & videos
- Categorized (Anxiety, Sleep, Mindfulness)
- Expandable for user-added resources

### ☎️ Crisis Support
- Emergency helplines
- Immediate coping strategies
- Visible when high-risk patterns detected

---

## 🛠 Tech Stack

**Frontend**
- EJS (Server-side rendering)
- Bootstrap 5
- JavaScript

**Backend**
- Node.js
- Express.js
- Passport.js (Authentication)

**Database**
- MongoDB (Mongoose)
- Indexed & validated schemas

**AI Integration**
- OpenRouter API (LLM-based chatbot)

---

## 🔐 Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection
SESSION_SECRET=your_secret_key
OPENROUTER_API_KEY=your_openrouter_key


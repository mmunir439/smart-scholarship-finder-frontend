Smart Scholarship Finder 🎓

An intelligent scholarship guidance system for Pakistani students that helps users discover international scholarships based on their academic profile using rule-based eligibility analysis.

📌 Project Overview

Smart Scholarship Finder is a MERN stack web application designed to centralize scholarship information and provide personalized scholarship guidance for students planning to study abroad.

The platform uses:

Rule-based eligibility analysis
JWT authentication
Web scraping for scholarship collection
Data visualization using Chart.js
Multilingual accessibility support

This project was developed as a Final Year Project (FYP) for BS Computer Science at International Islamic University Islamabad (IIUI).

🚀 Features
👨‍🎓 Student Features
Student Registration & Login
Academic Profile Management
Scholarship Eligibility Checking
Personalized Scholarship Recommendations
Dashboard Analytics
Scholarship Filtering
Profile-based Guidance
Responsive UI
👨‍💼 Admin Features
Admin Dashboard
Manage Scholarships
Manage Users
Monitor System Data
Scholarship Data Updates
🤖 Intelligent Guidance System

The system uses a Decision Tree–based rule system to evaluate:

CGPA
IELTS Score
Degree Level
Academic Field

Students are categorized as:

Eligible
Partially Eligible
Not Eligible

for specific scholarships.

🛠️ Tech Stack
Frontend
Next.js
React.js
Tailwind CSS
Chart.js
Backend
Node.js
Express.js
Database
MongoDB
Mongoose
Authentication
JWT Authentication
Web Scraping
Axios
Cheerio
📂 Project Structure
src/
│
├── app/
│   ├── admin/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   ├── scholarships/
│   └── ...
│
├── components/
├── locales/
├── proxy.js
└── ...
⚙️ Getting Started
1️⃣ Clone Repository
git clone <your-repository-url>
cd smart-scholarship-finder
📦 Install Dependencies
npm install
🔐 Environment Variables

Create a .env.local file in the root directory:

JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:5000
▶️ Run Frontend

Frontend runs on:

http://localhost:3001

Start frontend server:

npm run dev
▶️ Run Backend

Make sure your backend server is running separately on:

http://localhost:5000
🔒 Protected Routes

This project uses proxy.js for route protection in Next.js.

Protected routes include:

/dashboard
/admin

Unauthorized users are redirected to /login.

📊 Data Visualization

Chart.js is used for:
Scholarship distribution by country
Eligibility statistics
Degree-level analysis

🌍 Scope of the Project
In Scope
USA & Europe Scholarships
Bachelor’s, Master’s, PhD Programs
Academic Eligibility Guidance
Web-Based System
Out of Scope
Visa Processing
Admission Guarantees
SOP Writing Services

🎯 Expected Outcomes
Centralized Scholarship Platform
Personalized Guidance System
Automated Scholarship Collection
Interactive Dashboard & Analytics
Practical AI-based Eligibility System

👨‍💻 Authors
Muhammad Munir
Diini Isaq Farah

BS Computer Science
International Islamic University Islamabad (IIUI)

Supervisor: Dr. Majid Bashir

📜 License

This project is developed for academic and educational purposes.
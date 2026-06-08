# 🚀 React Recruitment Portal

A modern, highly responsive, and interactive **Job Portal Web Application** built with React. This platform bridges the gap between companies looking for top talent and professionals seeking their next big opportunity. 

Featuring a sleek **Glassmorphism** UI, dynamic scroll animations, and a centralized role-based dashboard system, this project provides a premium user experience from end to end.

---

## ✨ Key Features

### 👤 Role-Based Access
- **Candidates**: Browse open positions, view detailed job descriptions, submit applications with cover letters, and track application statuses via a personal dashboard.
- **Employers (Admin)**: Post new job openings, manage active listings, and utilize a powerful global dashboard to review applications via an interactive Data Table and Pop-up Modal system.

### 🎨 Premium UI & Animations
- **Glassmorphism Design**: Clean, frosted-glass aesthetics utilizing a vibrant **Slate & Teal** color palette.
- **Scroll Reveal Animations**: Custom React hooks utilizing `IntersectionObserver` for highly performant, staggered fade-in animations as the user scrolls.
- **Responsive Layout**: Fluid design that works flawlessly on mobile, tablet, and desktop devices.

### ⚙️ Core Functionality
- **User Profiles**: Centralized profile management where users can edit their bio, portfolio links, phone numbers, and upload interactive profile avatars.
- **Real-time Search**: Instantaneous search filtering on the Employer Dashboard to quickly find applications by Job Title, Email, or Applicant ID.
- **Data Persistence**: State management entirely driven by Context API and synchronized with `localStorage` for a seamless, backend-free simulation.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Routing**: React Router DOM (v6)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, CSS Grid)
- **State Management**: React Context API & Hooks (`useState`, `useEffect`)
- **Storage**: Browser `localStorage`

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone https://github.com/your-username/job-portal.git
   cd job-portal
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **View the app**:
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will automatically reload when you make changes.

---

## 📂 Project Structure

```text
job-portal/
├── public/               # Static assets
└── src/
    ├── components/       # Reusable UI components (Navbar, JobCard, Modal, Button)
    ├── context/          # React Context (AuthContext for user state)
    ├── css/              # Vanilla CSS stylesheets and Design System variables
    ├── hooks/            # Custom React Hooks (useJobs, useApplications, useScrollReveal)
    ├── pages/            # Main page layouts (Home, Profile, Dashboards, Login)
    ├── App.js            # Core routing and application wrapper
    └── index.js          # React entry point
```

---

## 📝 Usage Guide (Demo Data)
Upon loading the application for the first time, a suite of **mock jobs** will be automatically seeded into your browser's local storage so you can test the platform immediately. 
- Create a test account by clicking **Sign Up**.
- Choose your role (**Candidate** or **Employer**) to experience the different dashboards.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

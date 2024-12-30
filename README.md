# Task Manager Application

A modern task management application built with React and Node.js, featuring user authentication, CRUD operations for tasks, and a responsive design.

## 🚀 Live Demo

You can access the live application here: https://task-manager-client-lac.vercel.app


## ✨ Features

- 👤 User authentication (login/register)
- ✅ Create, read, update, and delete tasks
- 🔍 Filter tasks by status
- 📱 Responsive design
- 🎯 Mark tasks as complete/incomplete
- ⚡ Real-time updates

## 🛠️ Tech Stack

- **Frontend:**
  - React 18
  - React Router v6
  - React Hook Form
  - Framer Motion
  - Tailwind CSS
  - Zod (form validation)

- **Additional Tools:**
  - date-fns
  - Lucide Icons
  - Context API for state management

## 🚀 Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/germanWalton/task-manager-client.git
cd task-manager-client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── tasks/
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   └── TaskItem.jsx
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── ProtectedRoute.jsx
│   └── ui/
│       └── LoadingSpinner.jsx
├── context/
│   ├── AuthContext.jsx
│   └── TaskContext.jsx
├── hooks/
│   ├── useAuth.js
│   └── useTask.js
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Tasks.jsx
│   └── NotFound.jsx
├── services/
│   ├── authService.js
│   └── taskService.js
└── router/
    ├── index.jsx
    └── routes.js
```

## 🔧 Configuration

### Environment Variables

|
 Variable 
|
 Description 
|
 Default 
|
|
----------
|
-------------
|
---------
|
|
 VITE_API_URL 
|
 Backend API URL 
|
 http://localhost:5000/api 
|

### Available Scripts

|
 Command 
|
 Description 
|
|
---------
|
-------------
|
|
`npm run dev`
|
 Start development server 
|
|
`npm run build`
|
 Build for production 
|
|
`npm run preview`
|
 Preview production build 
|
|
`npm run lint`
|
 Run ESLint 
|

## 📱 Screenshots

[Add screenshots of your application here]

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Tokens are stored in localStorage and automatically included in API requests.

## 💻 Development

### Code Style

- Uses ESLint for code linting
- Follows Airbnb style guide
- Prettier for code formatting

### Best Practices

- Component-based architecture
- Custom hooks for logic reuse
- Context API for state management
- Form validation with React Hook Form and Zod
- Protected routes for authenticated users

## 🚀 Deployment

This project is configured for deployment on Vercel. To deploy:

1. Create a Vercel account
2. Install Vercel CLI: `npm i -g vercel`
3. Run: `vercel`

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Your Name
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Mention any resources or people that helped you
- Credit any third-party assets or inspiration

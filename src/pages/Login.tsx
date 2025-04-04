
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const handleSwitchToRegister = () => {
    setShowLogin(false);
  };

  const handleSwitchToLogin = () => {
    setShowLogin(true);
  };

  // Mock user data with expanded options and Indian names
  const mockUsers = {
    students: [
      { email: "student1@gmail.com", password: "student1", name: "Alex Morgan" },
      { email: "student2@gmail.com", password: "student2", name: "Jamie Taylor" },
      { email: "student3@gmail.com", password: "student3", name: "Chris Johnson" },
      { email: "rahul@gmail.com", password: "rahul123", name: "Rahul Sharma" },
      { email: "priya@gmail.com", password: "priya123", name: "Priya Patel" },
      { email: "arjun@gmail.com", password: "arjun123", name: "Arjun Singh" }
    ],
    coaches: [
      { email: "coach1@gmail.com", password: "coach1", name: "David Smith" },
      { email: "coach2@gmail.com", password: "coach2", name: "Lisa Johnson" },
      { email: "coach3@gmail.com", password: "coach3", name: "Michael Chen" },
      { email: "ananya@gmail.com", password: "ananya123", name: "Ananya Gupta" },
      { email: "vikram@gmail.com", password: "vikram123", name: "Vikram Reddy" },
      { email: "gmsoundariyalakshmi@gmail.com", password: "chesscoach", name: "Soundariya Lakshmi" }
    ],
    admins: [
      { email: "admin1@gmail.com", password: "admin1", name: "Admin User" },
      { email: "admin2@gmail.com", password: "admin2", name: "System Admin" },
      { email: "admin3@gmail.com", password: "admin3", name: "Super Admin" }
    ]
  };

  const handleLoginSuccess = (userData, role) => {
    // Add console log to debug
    console.log(`Login successful for ${userData.name} with role ${role}`);
    
    // Store user data in localStorage with role information
    localStorage.setItem('user', JSON.stringify({
      ...userData,
      role: role,
      isLoggedIn: true,
    }));
    
    // Redirect based on role
    switch(role) {
      case 'student':
        navigate('/student-dashboard');
        break;
      case 'coach':
        navigate('/coach-dashboard');
        break;
      case 'admin':
        navigate('/admin-dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {showLogin ? 'Welcome Back' : 'Join BeyondTheBoard'}
            </h1>
            <p className="text-gray-400">
              {showLogin 
                ? 'Sign in to access your personalized chess training dashboard'
                : 'Create your account and start your chess journey today'
              }
            </p>
          </div>

          {showLogin ? (
            <LoginForm 
              onSwitchToRegister={handleSwitchToRegister} 
              mockUsers={mockUsers}
              onLoginSuccess={handleLoginSuccess}
            />
          ) : (
            <RegisterForm 
              onSwitchToLogin={handleSwitchToLogin} 
              mockUsers={mockUsers}
              onLoginSuccess={handleLoginSuccess}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

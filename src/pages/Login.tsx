
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
  };

  const handleSwitchToLogin = () => {
    setShowLogin(true);
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
            <LoginForm onSwitchToRegister={handleSwitchToRegister} />
          ) : (
            <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

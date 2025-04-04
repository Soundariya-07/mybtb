
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface User {
  name?: string;
  email: string;
  isLoggedIn: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      toast.error("Please login to access the dashboard");
      navigate('/login');
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      if (!userData.isLoggedIn) {
        navigate('/login');
        return;
      }
      setUser(userData);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
    navigate('/');
  };

  if (!user) {
    return <div className="min-h-screen bg-chess-deepNavy flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-chess-blue border-t-transparent rounded-full"></div>
    </div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome, {user.name || 'Chess Player'}</h1>
              <p className="text-gray-400">{user.email}</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10">
              Logout
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <Card className="bg-chess-navy border-chess-blue/20">
              <CardHeader>
                <CardTitle className="text-white">Your Progress</CardTitle>
                <CardDescription>Track your chess improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Your dashboard is currently in setup mode. Complete your profile to see personalized statistics.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-chess-navy border-chess-blue/20">
              <CardHeader>
                <CardTitle className="text-white">Upcoming Lessons</CardTitle>
                <CardDescription>Your scheduled sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">You don't have any upcoming lessons scheduled. Book a free demo to get started.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-chess-navy border-chess-blue/20">
              <CardHeader>
                <CardTitle className="text-white">Study Plan</CardTitle>
                <CardDescription>Your personalized learning path</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Complete your skill assessment to receive a customized study plan from our coaches.</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-chess-navy rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to start your chess journey?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Book a free demo session with one of our expert coaches to discuss your goals and find the right program for you.
            </p>
            <Button className="bg-chess-blue hover:bg-chess-blue/90 text-white px-8">
              Book Your Free Demo
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

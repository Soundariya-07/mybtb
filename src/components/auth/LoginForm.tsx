
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { toast } from "sonner";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  mockUsers?: any;
  onLoginSuccess?: (userData: any, role: string) => void;
}

const LoginForm = ({ onSwitchToRegister, mockUsers, onLoginSuccess }: LoginFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you'd call your authentication API here
      console.log("Login data:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication with sample users
      if (mockUsers) {
        const role = formData.role;
        const userArray = mockUsers[`${role}s`] || [];
        
        // Debug logs to help troubleshoot
        console.log("Looking for user with credentials:", { 
          email: formData.email,
          role: role
        });
        
        const user = userArray.find(
          (u: any) => u.email === formData.email && u.password === formData.password
        );
        
        if (user) {
          // If using the callback for login success
          if (onLoginSuccess) {
            onLoginSuccess(user, role);
            toast.success("Login successful!");
            return;
          }
          
          // Default login success behavior
          localStorage.setItem('user', JSON.stringify({
            ...user,
            role: role,
            isLoggedIn: true,
          }));
          
          toast.success("Login successful!");
          
          // Navigate based on role
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
          return;
        } else {
          throw new Error("Invalid credentials");
        }
      }
      
      // Fallback for when no mock users are provided
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        role: formData.role,
        isLoggedIn: true,
      }));
      
      toast.success("Login successful!");
      navigate('/dashboard');
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-chess-navy border-chess-blue/20">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
        <CardDescription>Login to access your chess training dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">I am a:</Label>
            <RadioGroup 
              defaultValue={formData.role} 
              onValueChange={handleRoleChange}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="coach" id="coach" />
                <Label htmlFor="coach">Coach</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin">Admin</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-chess-deepNavy border-chess-blue/20"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-chess-blue hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="bg-chess-deepNavy border-chess-blue/20"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-chess-blue hover:bg-chess-blue/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Logging in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn size={18} />
                Sign In
              </span>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-gray-400">
          Don't have an account?{' '}
          <button 
            onClick={onSwitchToRegister}
            className="text-chess-blue hover:underline"
          >
            Create one now
          </button>
        </div>
        <Button 
          variant="outline" 
          className="w-full border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10"
          onClick={() => navigate('/')}
        >
          <span className="flex items-center gap-2">
            Return to Homepage
            <ArrowRight size={16} />
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { toast } from "sonner";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      agreeToTerms: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (!formData.agreeToTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you'd call your authentication API here
      console.log("Registration data:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        name: formData.name,
        email: formData.email,
        isLoggedIn: true,
      }));
      
      toast.success("Registration successful!");
      navigate('/dashboard');
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-chess-navy border-chess-blue/20">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Create an account</CardTitle>
        <CardDescription>Join BeyondTheBoard and start your chess journey</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="bg-chess-deepNavy border-chess-blue/20"
              required
            />
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
            <Label htmlFor="password">Password</Label>
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
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-chess-deepNavy border-chess-blue/20"
              required
            />
          </div>
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox 
              id="agreeToTerms" 
              checked={formData.agreeToTerms} 
              onCheckedChange={handleCheckboxChange}
              className="data-[state=checked]:bg-chess-blue data-[state=checked]:border-chess-blue"
            />
            <Label 
              htmlFor="agreeToTerms" 
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the <a href="#" className="text-chess-blue hover:underline">terms of service</a> and <a href="#" className="text-chess-blue hover:underline">privacy policy</a>
            </Label>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-chess-blue hover:bg-chess-blue/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Creating account...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <UserPlus size={18} />
                Create Account
              </span>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-gray-400">
          Already have an account?{' '}
          <button 
            onClick={onSwitchToLogin}
            className="text-chess-blue hover:underline"
          >
            Sign in
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

export default RegisterForm;

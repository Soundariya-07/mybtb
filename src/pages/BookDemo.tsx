
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const BookDemo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      experience: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.experience) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you'd call your API here
      console.log("Demo request data:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast.success("Your demo request has been submitted!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Book Your Free Demo Session</h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Get a personalized introduction to our chess academy and discuss your goals with an expert coach.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-chess-navy rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">What to Expect</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-chess-blue/20 flex items-center justify-center mt-1 flex-shrink-0">
                        <span className="text-chess-blue font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Personal Introduction</h3>
                        <p className="text-gray-400 text-sm">Meet one of our experienced chess coaches who will understand your current level.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-chess-blue/20 flex items-center justify-center mt-1 flex-shrink-0">
                        <span className="text-chess-blue font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Skill Assessment</h3>
                        <p className="text-gray-400 text-sm">A quick evaluation to determine your strengths and areas for improvement.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-chess-blue/20 flex items-center justify-center mt-1 flex-shrink-0">
                        <span className="text-chess-blue font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Program Recommendation</h3>
                        <p className="text-gray-400 text-sm">Receive a customized program recommendation based on your goals.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-chess-blue/20 flex items-center justify-center mt-1 flex-shrink-0">
                        <span className="text-chess-blue font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Q&A Session</h3>
                        <p className="text-gray-400 text-sm">Get answers to all your questions about our academy and teaching methods.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-chess-navy rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Request Your Free Demo</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name <span className="text-chess-blue">*</span></Label>
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
                      <Label htmlFor="email">Email <span className="text-chess-blue">*</span></Label>
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
                      <Label htmlFor="phone">Phone Number (optional)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-chess-deepNavy border-chess-blue/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Chess Experience <span className="text-chess-blue">*</span></Label>
                      <Select value={formData.experience} onValueChange={handleSelectChange} required>
                        <SelectTrigger className="bg-chess-deepNavy border-chess-blue/20">
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner - New to chess</SelectItem>
                          <SelectItem value="casual">Casual - Play occasionally</SelectItem>
                          <SelectItem value="intermediate">Intermediate - Regular player</SelectItem>
                          <SelectItem value="advanced">Advanced - Tournament player</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (optional)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your chess goals and any specific areas you'd like to improve..."
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-chess-deepNavy border-chess-blue/20 min-h-[100px]"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-chess-blue hover:bg-chess-blue/90 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                          Submitting...
                        </span>
                      ) : (
                        "Book My Free Demo"
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center bg-chess-navy rounded-xl p-12 max-w-3xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-chess-blue/20 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-chess-blue" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
              <p className="text-gray-400 mb-6">
                Your demo session request has been received. One of our chess coaches will contact you within 24 hours to schedule your free demo.
              </p>
              <p className="text-gray-400 mb-8">
                Meanwhile, feel free to explore our programs and resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-chess-blue hover:bg-chess-blue/90 text-white" onClick={() => window.location.href = '/'}>
                  Return to Homepage
                </Button>
                <Button variant="outline" className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10" onClick={() => window.location.href = '/programs'}>
                  Explore Programs
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDemo;

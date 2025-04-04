
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const pricingPlans = [
  {
    title: "One-to-One Classes",
    description: "Personalized coaching tailored to your specific needs and goals.",
    plans: [
      {
        name: "1 Class per Week",
        price: "$34",
        period: "per week",
        features: [
          "45-minute one-to-one session with a coach",
          "Personalized curriculum",
          "Homework assignments",
          "Access to premium chess platform",
          "Progress tracking",
        ]
      },
      {
        name: "2 Classes per Week",
        price: "$68",
        period: "per week",
        features: [
          "Two 45-minute one-to-one sessions with a coach",
          "Accelerated learning plan",
          "Priority scheduling",
          "Access to premium chess platform",
          "Detailed performance analysis",
          "Monthly progress reports"
        ]
      }
    ]
  },
  {
    title: "Group Classes",
    description: "Learn chess in a collaborative environment with peers at your level.",
    plans: [
      {
        name: "1 Class per Week",
        price: "$22",
        period: "per week",
        features: [
          "60-minute small group session (4-6 students)",
          "Structured curriculum based on level",
          "Collaborative learning environment",
          "Weekly challenges",
          "Access to premium chess platform"
        ]
      },
      {
        name: "2 Classes per Week",
        price: "$45",
        period: "per week",
        features: [
          "Two 60-minute small group sessions",
          "Structured curriculum based on level",
          "Collaborative learning environment",
          "Weekly challenges and tournaments",
          "Access to premium chess platform",
          "Monthly assessment sessions"
        ]
      }
    ]
  }
];

const EnrollmentForm = ({ isOpen, onClose, selectedPlan = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    program: selectedPlan ? `${selectedPlan.title} - ${selectedPlan.name}` : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, program: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.age || !formData.program) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Send form data (in a real app, this would go to a backend)
    console.log("Enrollment form submitted:", formData);
    
    // Show success message
    toast.success("Enrollment submitted successfully! Our team will contact you soon.");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-chess-navy border-chess-blue/20">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Enroll Now</DialogTitle>
          <DialogDescription>
            Complete this form to enroll in our chess program. Our team will contact you shortly.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              className="bg-chess-deepNavy border-chess-blue/20"
              placeholder="Your full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange}
              className="bg-chess-deepNavy border-chess-blue/20"
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input 
              id="age" 
              name="age" 
              type="number" 
              value={formData.age} 
              onChange={handleChange}
              className="bg-chess-deepNavy border-chess-blue/20"
              placeholder="Your age"
              min="4"
              max="100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="program">Program</Label>
            <Select value={formData.program} onValueChange={handleSelectChange} required>
              <SelectTrigger className="bg-chess-deepNavy border-chess-blue/20">
                <SelectValue placeholder="Select a program" />
              </SelectTrigger>
              <SelectContent>
                {pricingPlans.flatMap(category => 
                  category.plans.map(plan => (
                    <SelectItem 
                      key={`${category.title}-${plan.name}`} 
                      value={`${category.title} - ${plan.name}`}
                    >
                      {category.title} - {plan.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-chess-blue/20 text-chess-blue hover:bg-chess-blue/10"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-chess-blue hover:bg-chess-blue/90 text-white"
            >
              Submit Enrollment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const PricingCard = ({ category, plan, onEnroll }) => {
  return (
    <div className="bg-chess-navy rounded-xl p-8 shadow-lg shadow-chess-blue/5 hover:shadow-chess-blue/10 transition-all">
      <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
      <div className="flex items-end mb-6">
        <span className="text-4xl font-bold text-chess-blue">{plan.price}</span>
        <span className="text-gray-400 ml-2">{plan.period}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start text-gray-300">
            <Check size={18} className="text-chess-blue mr-2 mt-1 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button 
        className="w-full bg-chess-blue hover:bg-chess-blue/90 text-white"
        onClick={() => onEnroll({ title: category.title, name: plan.name })}
      >
        Enroll Now
      </Button>
    </div>
  );
};

const Pricing = () => {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleEnroll = (plan) => {
    setSelectedPlan(plan);
    setIsEnrollmentOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="py-16 bg-chess-navy/30">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Pricing</h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Affordable chess education tailored to your learning style and goals.
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid gap-16">
              {pricingPlans.map((category, idx) => (
                <div key={idx}>
                  <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-3">{category.title}</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">{category.description}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {category.plans.map((plan, planIdx) => (
                      <PricingCard 
                        key={planIdx} 
                        category={category} 
                        plan={plan} 
                        onEnroll={handleEnroll} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 bg-chess-deepNavy/60 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Not sure which plan is right for you?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Book a free 30-minute consultation with one of our chess coaches to discuss your goals and find the perfect learning path.
              </p>
              <Link to="/book-demo">
                <Button className="bg-chess-blue hover:bg-chess-blue/90 text-white flex items-center gap-2 mx-auto">
                  Book Free Consultation
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Enrollment Form Dialog */}
        <EnrollmentForm 
          isOpen={isEnrollmentOpen} 
          onClose={() => setIsEnrollmentOpen(false)} 
          selectedPlan={selectedPlan}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;

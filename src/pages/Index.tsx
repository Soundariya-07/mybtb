
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProgramsSection from "@/components/ProgramsSection";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

// Mock testimonials data
const testimonials = [
  {
    id: 1,
    content: "BeyondTheBoard has completely transformed my approach to chess. The personalized coaching has helped me increase my rating by over 300 points in just six months.",
    name: "Michael Chen",
    title: "FIDE Rating 2100+",
    avatar: "/lovable-uploads/f4184eb7-c262-47fc-9d1e-fe309c2ebdf6.png"
  },
  {
    id: 2,
    content: "The group classes are engaging and the coaches make complex concepts easy to understand. My daughter loves the interactive sessions and the global community.",
    name: "Sarah Johnson",
    title: "Parent of a chess prodigy",
    avatar: "/lovable-uploads/9051c81a-ebc3-4a44-bc96-0a0b7d627393.png"
  },
  {
    id: 3,
    content: "As a beginner, I was intimidated by chess, but the coaches at BeyondTheBoard created such a welcoming environment. Now I play confidently and understand the game deeply.",
    name: "David Rodriguez",
    title: "Beginner turned enthusiast",
    avatar: "/lovable-uploads/e6abee08-2d7f-423b-8d9e-d6d18d1600f3.png"
  }
];

// Sample FAQ items
const faqItems = [
  {
    question: "What age groups do you teach?",
    answer: "We teach chess to students of all ages, from young beginners (as young as 5 years old) to seniors. Our coaches tailor their teaching methods to match the student's age and experience level."
  },
  {
    question: "How do online chess lessons work?",
    answer: "Our online chess lessons take place on a secure video conferencing platform with an integrated interactive chess board. Students can see and hear the coach, view the digital chess board, and make moves."
  },
  {
    question: "Do I need special equipment for online chess lessons?",
    answer: "No special equipment is required beyond a computer, tablet, or smartphone with a stable internet connection. A larger screen is recommended for the best experience, but not mandatory."
  }
];

// Pricing plans data
const pricingPlans = [
  {
    title: "One-to-One Classes",
    plans: [
      {
        name: "1 Class per Week",
        price: "$34",
        period: "per week",
      },
      {
        name: "2 Classes per Week",
        price: "$68",
        period: "per week",
      }
    ]
  },
  {
    title: "Group Classes",
    plans: [
      {
        name: "1 Class per Week",
        price: "$22",
        period: "per week",
      },
      {
        name: "2 Classes per Week",
        price: "$45",
        period: "per week",
      }
    ]
  }
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-chess-navy rounded-xl p-8 h-full flex flex-col">
      <div className="flex mb-4">
        {Array(5).fill(0).map((_, index) => (
          <Star key={index} className="text-chess-blue fill-chess-blue" size={20} />
        ))}
      </div>
      <blockquote className="text-gray-300 flex-grow mb-6 italic">
        "{testimonial.content}"
      </blockquote>
      <div className="flex items-center mt-auto">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-400">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ProgramsSection />
        <BenefitsSection />
        
        {/* Testimonials Section */}
        <section className="py-16 bg-chess-deepNavy/80">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block bg-chess-navy px-4 py-1 rounded-full text-chess-blue text-sm font-medium mb-4">
                Success Stories
              </span>
              <h2 className="text-4xl font-bold text-white mb-4">What Our Students Say</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Join thousands of satisfied students from around the world who have transformed their chess game with BeyondTheBoard.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map(testimonial => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link to="/testimonials">
                <Button variant="outline" className="border-chess-blue text-chess-blue hover:bg-chess-blue/10 inline-flex items-center">
                  Read More Testimonials
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-16 bg-chess-navy/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block bg-chess-navy px-4 py-1 rounded-full text-chess-blue text-sm font-medium mb-4">
                Pricing
              </span>
              <h2 className="text-4xl font-bold text-white mb-4">Affordable Chess Education</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Choose the plan that works best for your learning style and goals.
                All plans include a subscription to our premium chess platform.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {pricingPlans.map((category, idx) => (
                <div key={idx} className="bg-chess-navy rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-white mb-4">{category.title}</h3>
                  <div className="space-y-6">
                    {category.plans.map((plan, planIdx) => (
                      <div key={planIdx} className="border-b border-chess-blue/20 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-end">
                          <h4 className="text-lg font-medium text-white">{plan.name}</h4>
                          <div className="flex items-end">
                            <span className="text-2xl font-bold text-chess-blue">{plan.price}</span>
                            <span className="text-gray-400 ml-1">{plan.period}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link to="/pricing">
                <Button className="bg-chess-blue hover:bg-chess-blue/90 text-white">
                  View Full Pricing Details
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-chess-deepNavy">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block bg-chess-navy px-4 py-1 rounded-full text-chess-blue text-sm font-medium mb-4">
                Common Questions
              </span>
              <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Everything you need to know about our chess programs and online learning process.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-chess-navy rounded-lg px-6 py-2 border-none"
                  >
                    <AccordionTrigger className="text-white hover:text-chess-blue text-lg font-medium py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="text-center mt-10">
              <Link to="/faq">
                <Button variant="outline" className="border-chess-blue text-chess-blue hover:bg-chess-blue/10 inline-flex items-center">
                  View All FAQs
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-chess-navy/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Your Chess Journey?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Book a free demo session with one of our coaches today and take the first step toward mastering chess.
            </p>
            <Link to="/book-demo">
              <Button className="bg-chess-blue hover:bg-chess-blue/90 text-white px-8 py-6 text-lg">
                Book Your Free Demo
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

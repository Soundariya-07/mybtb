
import { Star } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const testimonials = [
  {
    id: 1,
    content: "BeyondTheBoard has completely transformed my approach to chess. The personalized coaching has helped me increase my rating by over 300 points in just six months.",
    name: "Vikram Reddy",
    title: "FIDE Rating 2100+",
    avatar: "/lovable-uploads/f4184eb7-c262-47fc-9d1e-fe309c2ebdf6.png"
  },
  {
    id: 2,
    content: "The group classes are engaging and the coaches make complex concepts easy to understand. My daughter loves the interactive sessions and the global community.",
    name: "Priya Patel",
    title: "Parent of a chess prodigy",
    avatar: "/lovable-uploads/9051c81a-ebc3-4a44-bc96-0a0b7d627393.png"
  },
  {
    id: 3,
    content: "As a beginner, I was intimidated by chess, but the coaches at BeyondTheBoard created such a welcoming environment. Now I play confidently and understand the game deeply.",
    name: "Rahul Sharma",
    title: "Beginner turned enthusiast",
    avatar: "/lovable-uploads/e6abee08-2d7f-423b-8d9e-d6d18d1600f3.png"
  },
  {
    id: 4,
    content: "The one-on-one coaching I've received at BeyondTheBoard has been exceptional. My coach identifies my weaknesses and gives me targeted exercises that have rapidly improved my endgame play.",
    name: "Ananya Gupta",
    title: "Tournament player",
    avatar: "/lovable-uploads/9051c81a-ebc3-4a44-bc96-0a0b7d627393.png"
  },
  {
    id: 5,
    content: "I've tried several online chess platforms, but the quality of instruction at BeyondTheBoard is unmatched. The coaches don't just teach moves; they instill a deep understanding of chess principles.",
    name: "Arjun Singh",
    title: "Intermediate player",
    avatar: "/lovable-uploads/f4184eb7-c262-47fc-9d1e-fe309c2ebdf6.png"
  },
  {
    id: 6,
    content: "My son has been taking classes for just three months, and he's already competing confidently in local tournaments. The coaches make learning chess fun and engaging for kids.",
    name: "Neha Gupta",
    title: "Parent",
    avatar: "/lovable-uploads/9051c81a-ebc3-4a44-bc96-0a0b7d627393.png"
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
      <blockquote className="text-gray-300 flex-grow mb-6 italic text-lg">
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

const Testimonials = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="py-16 bg-chess-navy/30">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">What Our Students Say</h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Join thousands of satisfied students from around the world who have transformed their chess game with BeyondTheBoard.
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Ready to join our community of chess enthusiasts and start your journey toward mastery?
              </p>
              <div className="inline-block">
                <a href="/book-demo" className="btn-primary px-8 py-3">Book Your Free Demo</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;

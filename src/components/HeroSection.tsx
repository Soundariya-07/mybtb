
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <div className="mb-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-1">
                BeyondTheBoard
              </h1>
              <p className="text-xl text-chess-blue font-medium mb-6">
                An online global chess academy
              </p>
            </div>
            <p className="text-gray-300 text-lg mb-8">
              Elevate your chess game with expert coaches from around the world. 
              Our online academy brings world-class chess instruction directly to you, 
              no matter where you are.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book-demo">
                <Button className="btn-primary flex items-center gap-2">
                  Book Free Demo
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/programs">
                <Button variant="outline" className="btn-outlined">
                  View Programs
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560174038-594a6e2e1c38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Chess pieces on a chess board with a player deep in thought" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-chess-deepNavy/60 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

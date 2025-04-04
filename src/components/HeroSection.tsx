
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <div className="inline-block mb-4">
              <span className="px-4 py-1 rounded-full bg-chess-navy text-chess-blue text-sm font-medium">
                Learn Chess Online
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Making Chess <br />
              Reach Across <br />
              <span className="text-chess-blue">the Globe</span>
            </h1>
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
                src="/lovable-uploads/e6abee08-2d7f-423b-8d9e-d6d18d1600f3.png" 
                alt="Chess player making a move" 
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

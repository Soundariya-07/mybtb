
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full py-4 bg-chess-deepNavy/90 backdrop-blur-sm fixed top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">
              <span className="text-chess-blue">Beyond</span>TheBoard
            </span>
            <span className="text-xs text-gray-400 ml-2 hidden sm:block">An online global chess academy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/programs" className="nav-link">Programs</Link>
            <Link to="/pricing" className="nav-link">Pricing</Link>
            <Link to="/testimonials" className="nav-link">Testimonials</Link>
            <Link to="/benefits" className="nav-link">Benefits</Link>
            <Link to="/faq" className="nav-link">FAQ</Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/book-demo">
              <Button variant="outline" className="border-chess-blue text-chess-blue hover:bg-chess-blue/10">
                Book Free Demo
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-chess-lightBlue text-white flex items-center gap-2 hover:bg-chess-blue">
                <LogIn size={18} />
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-chess-navy rounded-lg">
            <div className="flex flex-col space-y-4 px-4">
              <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
              <Link to="/programs" className="nav-link" onClick={toggleMenu}>Programs</Link>
              <Link to="/pricing" className="nav-link" onClick={toggleMenu}>Pricing</Link>
              <Link to="/testimonials" className="nav-link" onClick={toggleMenu}>Testimonials</Link>
              <Link to="/benefits" className="nav-link" onClick={toggleMenu}>Benefits</Link>
              <Link to="/faq" className="nav-link" onClick={toggleMenu}>FAQ</Link>
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/book-demo" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full border-chess-blue text-chess-blue hover:bg-chess-blue/10">
                    Book Free Demo
                  </Button>
                </Link>
                <Link to="/login" onClick={toggleMenu}>
                  <Button className="w-full bg-chess-lightBlue text-white flex items-center justify-center gap-2 hover:bg-chess-blue">
                    <LogIn size={18} />
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

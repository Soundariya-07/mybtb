
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-chess-navy pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              <span className="text-chess-blue">Beyond</span>TheBoard
            </h3>
            <p className="text-gray-400 mb-4">
              An online global chess academy bringing world-class instruction to players of all levels.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-chess-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-chess-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-chess-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-chess-blue transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-chess-blue transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-400 hover:text-chess-blue transition-colors">Programs</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-chess-blue transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-400 hover:text-chess-blue transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-chess-blue transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-chess-blue transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-chess-blue transition-colors">Study Materials</Link>
              </li>
              <li>
                <Link to="/coaches" className="text-gray-400 hover:text-chess-blue transition-colors">Our Coaches</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-chess-blue transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-chess-blue transition-colors">Support</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-chess-blue" />
                <span className="text-gray-400">info@beyondtheboard.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-chess-blue" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BeyondTheBoard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

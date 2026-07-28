import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-primary/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="font-heading font-bold text-2xl text-dark-background">Plant<span className="text-primary">X</span></span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-text hover:text-primary transition-colors font-medium">Home</Link>
            <Link to="/scan" className="text-text hover:text-primary transition-colors font-medium">Scan Plant</Link>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button could go here */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

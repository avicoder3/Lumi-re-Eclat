import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Catalogue', path: '/catalog' },
    { name: 'À Propos', path: '/about' }, // Placeholder link
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-stone-900 hover:text-gold-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none md:justify-start">
            <Link to="/" className="text-2xl font-serif font-bold text-stone-900 tracking-wider">
              LUMIÈRE & <span className="text-gold-500">ÉCLAT</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold tracking-widest transition-all duration-300 relative group ${
                  isActive(link.path) ? 'text-stone-900' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {link.name.toUpperCase()}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gold-500 transform transition-transform duration-300 origin-left ${
                  isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button className="text-stone-900 hover:text-gold-600 transition-colors hidden sm:block">
              <Search size={20} strokeWidth={2} />
            </button>
            <Link to="/contact" className="text-stone-900 hover:text-gold-600 transition-colors hidden sm:block">
              <User size={20} strokeWidth={2} />
            </Link>
            <button 
              onClick={onCartClick}
              className="text-stone-900 hover:text-gold-600 transition-colors relative p-1"
            >
              <ShoppingBag size={22} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-100 animate-fade-in-down">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-bold tracking-wide ${
                  isActive(link.path) 
                    ? 'bg-stone-50 text-stone-900 border-l-4 border-gold-500' 
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex items-center space-x-4 px-3 border-t border-stone-100 mt-2">
               <span className="text-stone-900 font-medium text-sm">Mon Compte</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
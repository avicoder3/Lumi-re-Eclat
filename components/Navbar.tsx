import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, Search, User, ArrowRight, ChevronRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../constants';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Catalogue', path: '/catalog' },
    { name: 'Journal', path: '/journal' },
    { name: 'À Propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Lock body scroll when search is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isSearchOpen]);

  // Close search on route change
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  // Filter products logic
  const searchResults = searchQuery.length > 1 
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4) // Limit to 4 results for the preview
    : [];

  return (
    <>
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
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-stone-900 hover:text-gold-600 transition-colors hidden sm:block"
              >
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
              <div className="pb-4 mb-4 border-b border-stone-100">
                 <button 
                    onClick={() => { setIsMenuOpen(false); setIsSearchOpen(true); }}
                    className="flex items-center gap-2 text-stone-500 w-full px-3 py-2 bg-stone-50 rounded-sm"
                 >
                    <Search size={16} />
                    <span className="text-sm">Rechercher...</span>
                 </button>
              </div>
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

      {/* FULL SCREEN SEARCH OVERLAY */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white animate-fade-in">
          {/* Close Button */}
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 md:top-10 md:right-10 p-2 text-stone-400 hover:text-stone-900 transition-colors z-50"
          >
            <X size={32} strokeWidth={1} />
          </button>

          <div className="max-w-4xl mx-auto px-4 pt-32 pb-12 h-full flex flex-col">
            
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative mb-16">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Que recherchez-vous ?"
                className="w-full text-3xl md:text-5xl font-serif text-stone-900 placeholder-stone-300 border-b-2 border-stone-200 py-4 focus:outline-none focus:border-gold-500 bg-transparent transition-colors"
              />
              <button 
                type="submit" 
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gold-500 hover:text-gold-600"
              >
                <ArrowRight size={32} />
              </button>
            </form>

            {/* Results Area */}
            <div className="flex-1 overflow-y-auto">
              {!searchQuery && (
                <div className="space-y-12 animate-fade-in-up">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">Suggestions</h3>
                    <div className="flex flex-wrap gap-4">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            navigate(`/catalog?category=${cat.id}`);
                            setIsSearchOpen(false);
                          }}
                          className="px-6 py-3 bg-stone-50 hover:bg-stone-900 hover:text-white transition-colors rounded-sm text-sm font-medium"
                        >
                          {cat.label}
                        </button>
                      ))}
                      <button onClick={() => {navigate('/catalog?filter=new'); setIsSearchOpen(false);}} className="px-6 py-3 bg-stone-50 hover:bg-stone-900 hover:text-white transition-colors rounded-sm text-sm font-medium">Nouveautés</button>
                    </div>
                  </div>
                </div>
              )}

              {searchQuery && searchResults.length === 0 && (
                <div className="text-center py-12 text-stone-500">
                  <p>Aucun résultat pour "{searchQuery}"</p>
                  <Link to="/catalog" onClick={() => setIsSearchOpen(false)} className="text-gold-600 underline mt-2 inline-block">Voir tout le catalogue</Link>
                </div>
              )}

              {searchQuery && searchResults.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">Résultats</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {searchResults.map(product => (
                      <Link 
                        to={`/product/${product.id}`} 
                        key={product.id}
                        onClick={() => setIsSearchOpen(false)}
                        className="group block"
                      >
                        <div className="aspect-square bg-stone-100 overflow-hidden mb-3">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h4 className="font-serif font-bold text-lg text-stone-900 group-hover:text-gold-600 transition-colors truncate">{product.name}</h4>
                        <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">{product.category.replace('_', ' ')}</p>
                        <p className="text-gold-600 font-medium">{product.price.toLocaleString('fr-FR')} FCFA</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-8 text-center border-t border-stone-100 pt-8">
                    <button 
                      onClick={handleSearchSubmit}
                      className="inline-flex items-center gap-2 text-stone-900 font-bold hover:text-gold-600 transition-colors uppercase text-sm tracking-wide"
                    >
                      Voir tous les résultats <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
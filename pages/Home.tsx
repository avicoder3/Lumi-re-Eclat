import React from 'react';
import { ArrowRight, Truck, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const featuredProducts = PRODUCTS.filter(p => p.isPopular).slice(0, 4);
  const newProducts = PRODUCTS.filter(p => p.isNew).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-stone-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2075&auto=format&fit=crop" 
            alt="Femme élégante portant des bijoux" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl space-y-6 animate-fade-in-up">
            <span className="text-gold-400 uppercase tracking-[0.2em] text-sm font-bold">Nouvelle Collection 2024</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white font-medium leading-tight">
              L'Art de la <br /> <span className="italic text-gold-200">Délicatesse</span>
            </h1>
            <p className="text-stone-200 text-lg md:text-xl font-light max-w-2xl mx-auto">
              Découvrez des pièces uniques conçues pour sublimer votre beauté naturelle. Bijoux, montres et extensions d'exception.
            </p>
            <div className="pt-8">
              <Link 
                to="/catalog" 
                className="inline-flex items-center gap-2 bg-white text-stone-900 px-8 py-4 rounded-sm hover:bg-gold-500 hover:text-white transition-all duration-300 font-medium tracking-wide"
              >
                Découvrir la Boutique <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-stone-50 py-12 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 p-4">
            <div className="p-3 bg-gold-100 text-gold-600 rounded-full">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-stone-900">Livraison Rapide</h3>
              <p className="text-sm text-stone-500">Expédition sous 24h à Abidjan</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4">
             <div className="p-3 bg-gold-100 text-gold-600 rounded-full">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-stone-900">Paiement Sécurisé</h3>
              <p className="text-sm text-stone-500">Mobile Money & Carte Bancaire</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4">
             <div className="p-3 bg-gold-100 text-gold-600 rounded-full">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="font-bold text-stone-900">Support 24/7</h3>
              <p className="text-sm text-stone-500">Une équipe à votre écoute</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Nos Univers</h2>
          <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/catalog?category=${cat.id}`}
              className="group relative h-80 overflow-hidden rounded-sm cursor-pointer"
            >
              <img 
                src={cat.image} 
                alt={cat.label} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <h3 className="text-white text-xl font-bold tracking-widest border border-white/50 px-6 py-3 uppercase backdrop-blur-sm">
                  {cat.label}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">Les Incontournables</h2>
              <p className="text-stone-500">Les pièces favorites de nos clients.</p>
            </div>
            <Link to="/catalog" className="text-gold-600 hover:text-stone-900 font-medium transition-colors hidden md:block">
              Voir tout le catalogue
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

       {/* New Arrivals Banner */}
      <section className="relative py-24 bg-stone-100">
        <div className="absolute inset-0">
           <img 
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop" 
            alt="Montre de luxe" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-serif text-stone-900 mb-6">Nouveautés de la Saison</h2>
            <p className="text-stone-600 max-w-2xl mx-auto mb-10">
              Explorez nos dernières créations. Des designs audacieux et sophistiqués pour affirmer votre style unique.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-left">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))}
            </div>
             <Link 
                to="/catalog?filter=new" 
                className="inline-block border-2 border-stone-900 text-stone-900 px-8 py-3 rounded-sm hover:bg-stone-900 hover:text-white transition-all duration-300 font-bold tracking-wide uppercase text-sm"
              >
                Voir toutes les nouveautés
              </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Truck, ShieldCheck, Clock, 
  Timer, Heart, ChevronLeft, ChevronRight, 
  Instagram, Mail, Star, Quote 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES, PRODUCTS, TESTIMONIALS, LOOKBOOK_IMAGES } from '../constants';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featuredProducts = PRODUCTS.filter(p => p.isPopular).slice(0, 6);
  const newProducts = PRODUCTS.filter(p => p.isNew).slice(0, 6);

  // Timer Logic
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 24); // 24 hour countdown

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Testimonial Navigation
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Newsletter Submit
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] bg-stone-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2075&auto=format&fit=crop" 
            alt="Femme élégante portant des bijoux" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl space-y-8 animate-fade-in-up">
            <span className="inline-block py-1 px-3 border border-gold-400 text-gold-400 uppercase tracking-[0.3em] text-xs font-bold rounded-sm backdrop-blur-sm">
              Nouvelle Collection 2024
            </span>
            <h1 className="text-5xl md:text-8xl font-serif text-white font-medium leading-tight tracking-tight">
              L'Art de la <br /> <span className="italic text-gold-300">Sublimation</span>
            </h1>
            <p className="text-stone-200 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Découvrez des pièces uniques conçues pour révéler votre beauté naturelle. Bijoux, montres et extensions d'exception.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/catalog" 
                className="inline-flex items-center justify-center gap-2 bg-gold-500 text-white px-8 py-4 rounded-sm hover:bg-gold-600 transition-all duration-300 font-medium tracking-wide shadow-lg hover:shadow-gold-500/20"
              >
                Découvrir la Boutique <ArrowRight size={20} />
              </Link>
              <Link 
                to="/catalog?category=bijoux_femme" 
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-white text-white px-8 py-4 rounded-sm hover:bg-white hover:text-stone-900 transition-all duration-300 font-medium tracking-wide"
              >
                Voir les Bijoux
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b border-stone-100 shadow-sm relative z-20 -mt-8 mx-4 md:mx-12 rounded-sm max-w-7xl lg:mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-stone-100">
          <div className="flex items-center justify-center gap-4 p-6 hover:bg-stone-50 transition-colors">
            <div className="p-3 bg-gold-50 text-gold-600 rounded-full">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 uppercase text-xs tracking-wider">Livraison Rapide</h3>
              <p className="text-sm text-stone-500">Expédition sous 24h à Abidjan</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 p-6 hover:bg-stone-50 transition-colors">
             <div className="p-3 bg-gold-50 text-gold-600 rounded-full">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 uppercase text-xs tracking-wider">Paiement Sécurisé</h3>
              <p className="text-sm text-stone-500">Mobile Money & Carte Bancaire</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 p-6 hover:bg-stone-50 transition-colors">
             <div className="p-3 bg-gold-50 text-gold-600 rounded-full">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 uppercase text-xs tracking-wider">Support 24/7</h3>
              <p className="text-sm text-stone-500">Une équipe à votre écoute</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">Nos Univers</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
          <p className="text-stone-500 max-w-2xl mx-auto">Explorez nos collections soigneusement sélectionnées pour chaque aspect de votre style.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/catalog?category=${cat.id}`}
              className="group relative h-96 overflow-hidden rounded-sm cursor-pointer shadow-lg"
            >
              <img 
                src={cat.image} 
                alt={cat.label} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 transition-colors flex flex-col justify-end p-8">
                <h3 className="text-white text-xl font-bold tracking-widest uppercase mb-2 translate-y-0 transition-transform duration-300">
                  {cat.label}
                </h3>
                <span className="text-gold-400 text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Explorer la collection <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FLASH SALE SECTION */}
      <section className="bg-stone-900 py-16 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-6 max-w-xl">
              <div className="inline-flex items-center gap-2 text-gold-500 font-bold tracking-widest uppercase text-sm animate-pulse">
                <Timer size={18} /> Vente Flash
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                Offre Exclusive <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">
                  Jusqu'à -30%
                </span>
              </h2>
              <p className="text-stone-400 text-lg">
                Profitez de réductions exceptionnelles sur une sélection de montres et parures. Offre limitée dans le temps.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                 <Link 
                  to="/catalog"
                  className="bg-white text-stone-900 px-8 py-3 rounded-sm font-bold hover:bg-gold-500 hover:text-white transition-colors duration-300"
                >
                  J'en profite
                </Link>
                <button className="flex items-center gap-2 px-8 py-3 rounded-sm border border-stone-700 hover:border-gold-500 hover:text-gold-500 transition-colors duration-300">
                  <Heart size={18} /> Ma Wishlist
                </button>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex gap-4 md:gap-8">
              {[
                { label: 'Heures', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Secondes', value: timeLeft.seconds }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-stone-800 border border-stone-700 rounded-sm flex items-center justify-center mb-2 shadow-inner">
                    <span className="text-3xl md:text-4xl font-serif font-bold text-gold-500">
                      {item.value.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-stone-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">Les Incontournables</h2>
              <p className="text-stone-500">Les pièces favorites de nos clients ce mois-ci.</p>
            </div>
            <Link to="/catalog" className="group flex items-center gap-2 text-stone-900 font-bold border-b-2 border-transparent hover:border-gold-500 transition-all pb-1">
              Voir tout le catalogue <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* LOOKBOOK SECTION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-2 text-gold-600">
              <Instagram size={20} />
              <span className="font-bold uppercase tracking-widest text-xs">@LumiereEclat</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">Le Lookbook</h2>
            <p className="text-stone-500 mt-4">Inspirez-vous de notre communauté. Identifiez-nous pour apparaître ici.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {LOOKBOOK_IMAGES.map((item) => (
              <div key={item.id} className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer">
                <img 
                  src={item.image} 
                  alt="Inspiration client" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                  <Heart className="fill-white text-white mb-2 animate-bounce" size={24} />
                  <span className="font-bold">{item.likes} J'aime</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-stone-100 py-24 relative">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-stone-900">Ce qu'ils disent de nous</h2>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm relative">
            <Quote className="absolute top-8 left-8 text-gold-200 transform -scale-x-100" size={64} />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-stone-50 mb-6 shadow-md">
                <img 
                  src={TESTIMONIALS[currentTestimonial].image} 
                  alt={TESTIMONIALS[currentTestimonial].name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex gap-1 mb-6 text-gold-400">
                 {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < TESTIMONIALS[currentTestimonial].rating ? "currentColor" : "none"} />
                 ))}
              </div>

              <p className="text-xl md:text-2xl font-serif text-stone-800 italic mb-8 leading-relaxed">
                "{TESTIMONIALS[currentTestimonial].text}"
              </p>

              <div>
                <h4 className="font-bold text-stone-900">{TESTIMONIALS[currentTestimonial].name}</h4>
                <p className="text-sm text-stone-500">{TESTIMONIALS[currentTestimonial].role} - {TESTIMONIALS[currentTestimonial].location}</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-12 bg-white text-stone-900 p-3 rounded-full shadow-lg hover:bg-gold-500 hover:text-white transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-12 bg-white text-stone-900 p-3 rounded-full shadow-lg hover:bg-gold-500 hover:text-white transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* New Arrivals Banner */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif text-stone-900 mb-6">Nouveautés de la Saison</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                Explorez nos dernières créations. Des designs audacieux et sophistiqués pour affirmer votre style unique.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))}
            </div>
             <div className="text-center">
               <Link 
                  to="/catalog?filter=new" 
                  className="inline-block border-2 border-stone-900 text-stone-900 px-10 py-3 rounded-sm hover:bg-stone-900 hover:text-white transition-all duration-300 font-bold tracking-wide uppercase text-sm"
                >
                  Voir toutes les nouveautés
                </Link>
             </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="bg-stone-900 py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-stone-800 rounded-full mb-6">
            <Mail className="text-gold-500" size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Rejoignez le Cercle Privé
          </h2>
          <p className="text-stone-300 mb-8 max-w-xl mx-auto">
            Inscrivez-vous à notre newsletter et recevez <span className="text-gold-400 font-bold">-10% sur votre première commande</span>, ainsi que nos ventes privées en avant-première.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email" 
                className="flex-1 bg-stone-800 border border-stone-700 text-white px-6 py-4 rounded-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 placeholder-stone-500"
              />
              <button 
                type="submit"
                className="bg-gold-500 text-white px-8 py-4 rounded-sm font-bold hover:bg-gold-600 transition-colors duration-300 uppercase tracking-wide text-sm"
              >
                S'inscrire
              </button>
            </form>
          ) : (
            <div className="bg-green-900/30 border border-green-800 text-green-400 p-4 rounded-sm max-w-md mx-auto animate-fade-in">
              <p className="font-medium flex items-center justify-center gap-2">
                <ShieldCheck size={18} /> Inscription confirmée ! Vérifiez votre boîte mail pour votre code promo.
              </p>
            </div>
          )}
          
          <p className="text-stone-600 text-xs mt-6">
            En vous inscrivant, vous acceptez notre politique de confidentialité. Désinscription possible à tout moment.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
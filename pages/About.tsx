import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Gem, Users, Globe, ArrowRight, Clock, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, BLOG_POSTS } from '../constants';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface AboutProps {
  onAddToCart: (product: Product) => void;
}

const About: React.FC<AboutProps> = ({ onAddToCart }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const newProducts = PRODUCTS.filter(p => p.isNew).slice(0, 3);
  const journalPreview = BLOG_POSTS.slice(0, 3);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const FAQS = [
    {
      question: "Vos bijoux sont-ils garantis ?",
      answer: "Absolument. Toutes nos pièces de joaillerie et nos montres bénéficient une garantie internationale de 2 ans couvrant tout défaut de fabrication. Nous incluons un certificat d'authenticité avec chaque commande."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Pour Abidjan, nous livrons en moins de 24 heures. Pour l'intérieur du pays et la sous-région, comptez 2 à 5 jours ouvrés via DHL ou nos partenaires logistiques locaux."
    },
    {
      question: "Puis-je retourner un article ?",
      answer: "Nous acceptons les retours sous 14 jours si le produit n'a pas été porté et est dans son emballage d'origine. Les mèches et produits capillaires ne sont pas repris par mesure d'hygiène si le paquet a été ouvert."
    },
    {
      question: "D'où proviennent vos matériaux ?",
      answer: "Nous sourçons notre or et nos pierres précieuses de manière éthique. Nos mèches proviennent directement de fournisseurs certifiés au Brésil, en Inde et au Pérou pour garantir une qualité Grade 12A+."
    }
  ];

  return (
    <div className="bg-white">
      
      {/* 1. Medium Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2000&auto=format&fit=crop" 
            alt="Atelier de bijouterie" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-4 animate-fade-in-up">
          <span className="text-gold-500 font-bold tracking-[0.3em] uppercase text-xs">Depuis 2018</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white font-medium">L'Excellence & L'Authenticité</h1>
          <p className="text-stone-300 text-lg max-w-2xl mx-auto font-light">
            Plus qu'une marque, Lumière & Éclat est une célébration du raffinement moderne ancré dans un héritage précieux.
          </p>
        </div>
      </section>

      {/* 2. Notre Histoire */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
              Notre Histoire <br />
              <span className="text-gold-600 italic">Un voyage de passion</span>
            </h2>
            <div className="w-20 h-1 bg-stone-900"></div>
            <div className="space-y-6 text-stone-600 leading-relaxed font-light text-lg">
              <p>
                Lumière & Éclat est née d'une vision simple : offrir à la clientèle africaine et internationale des accessoires de luxe qui rivalisent avec les plus grandes maisons, tout en conservant une âme chaleureuse et un service de proximité.
              </p>
              <p>
                Fondée à Abidjan par une passionnée de gemmologie et de mode, notre maison a commencé comme un atelier confidentiel proposant des pièces sur mesure. Aujourd'hui, nous sommes fiers de servir des milliers de clients à travers le monde, en maintenant cette promesse de qualité intransigeante.
              </p>
              <p>
                Chaque montre, chaque bijou et chaque mèche que nous proposons a été rigoureusement sélectionné pour sa durabilité et son esthétique intemporelle.
              </p>
            </div>
            <div className="pt-4">
              <div className="font-script text-5xl text-stone-400 opacity-80 transform -rotate-3 origin-left py-2">
                Elodie Martin
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mt-2">La Fondatrice</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold-500 z-0 hidden md:block"></div>
            <img 
              src="https://images.unsplash.com/photo-1623699654653-5f03c0168a6a?q=80&w=764&auto=format&fit=crop" 
              alt="Femme portant nos bijoux" 
              className="relative z-10 w-full h-auto object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* 3. Nos Valeurs (Enrichissement) */}
      <section className="bg-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-stone-900 text-gold-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Gem size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold font-serif text-stone-900 mb-4">Qualité Certifiée</h3>
              <p className="text-stone-600 font-light">
                Nous ne faisons aucun compromis sur les matériaux. Or 18K, acier inoxydable 316L, cheveux 100% humains.
              </p>
            </div>
            <div className="p-8 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-stone-900 text-gold-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold font-serif text-stone-900 mb-4">Service Personnalisé</h3>
              <p className="text-stone-600 font-light">
                Notre équipe de stylistes est disponible 7j/7 pour vous conseiller et vous accompagner dans vos choix.
              </p>
            </div>
            <div className="p-8 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-stone-900 text-gold-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Globe size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold font-serif text-stone-900 mb-4">Esprit Global</h3>
              <p className="text-stone-600 font-light">
                Inspiré par l'élégance parisienne, le dynamisme new-yorkais et la chaleur africaine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Craftsmanship Banner (Enrichissement visuel) */}
      <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
             <img src="https://images.unsplash.com/photo-1596917688002-397732009224?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-6">
           <PenTool className="mx-auto text-gold-500 mb-4" size={48} strokeWidth={1} />
           <h2 className="text-3xl md:text-5xl font-serif font-bold">L'Art du Détail</h2>
           <p className="text-lg text-stone-300 font-light leading-relaxed">
             "Le véritable luxe ne crie pas, il chuchote." Chaque pièce de notre collection est finie à la main avec une précision chirurgicale, garantissant un éclat qui traverse les années.
           </p>
        </div>
      </section>

      {/* 5. Le Journal (Updated with real link) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
             <span className="text-gold-600 font-bold uppercase tracking-widest text-xs mb-2 block">Lifestyle</span>
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">Le Journal</h2>
          </div>
          <Link to="/journal" className="hidden md:flex items-center gap-2 text-stone-900 font-bold border-b border-stone-900 pb-1 hover:text-gold-600 hover:border-gold-600 transition-colors">
            Lire tous les articles <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journalPreview.map((post) => (
            <Link to={`/journal/${post.id}`} key={post.id} className="group cursor-pointer">
              <div className="overflow-hidden mb-4 rounded-sm">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-2">
                <span className="text-xs text-gold-600 font-bold uppercase tracking-wider">{post.date}</span>
                <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-gold-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-stone-500 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="bg-stone-50 py-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">Questions Fréquentes</h2>
            <p className="text-stone-500">Tout ce que vous devez savoir pour commander en toute sérénité.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-white border border-stone-200 overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none hover:bg-stone-50"
                >
                  <span className={`font-bold ${openFaq === index ? 'text-gold-600' : 'text-stone-900'}`}>
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="text-gold-600" size={20} />
                  ) : (
                    <ChevronDown className="text-stone-400" size={20} />
                  )}
                </button>
                <div 
                  className={`px-6 text-stone-600 bg-stone-50 leading-relaxed overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-48 py-5 opacity-100 border-t border-stone-100' : 'max-h-0 py-0 opacity-0'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-stone-500 text-sm">
              Vous ne trouvez pas votre réponse ?{' '}
              <Link to="/contact" className="text-stone-900 font-bold underline hover:text-gold-600">Contactez-nous</Link>
            </p>
          </div>
        </div>
      </section>

      {/* 7. Nouveautés de la Saison */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">Nouveautés de la Saison</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
        <div className="text-center mt-12">
           <Link 
              to="/catalog" 
              className="inline-block bg-stone-900 text-white px-10 py-4 rounded-sm hover:bg-gold-500 transition-colors duration-300 font-bold tracking-wide uppercase text-sm"
            >
              Voir toute la collection
            </Link>
        </div>
      </section>

    </div>
  );
};

export default About;
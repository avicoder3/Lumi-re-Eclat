import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white tracking-wider">
              LUMIÈRE & <span className="text-gold-500">ÉCLAT</span>
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              L'élégance intemporelle pour la femme et l'homme moderne. Découvrez notre collection exclusive de bijoux, montres et accessoires.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Boutique</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-gold-400 transition-colors">Bijoux Femme</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Montres Homme</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Montres Femme</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Mèches & Extensions</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Nouveautés</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Service Client</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-gold-400 transition-colors">Suivi de commande</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Livraison & Retours</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Mentions Légales</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Politique de confidentialité</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Nous Contacter</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-gold-500 mt-0.5" />
                <span>123 Avenue de la Mode,<br />Abidjan, Côte d'Ivoire</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-gold-500" />
                <span>+225 07 07 00 00 00</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gold-500" />
                <span>contact@lumiere-eclat.com</span>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <a href="#" className="text-stone-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                <a href="#" className="text-stone-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-stone-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              </div>
            </div>
          </div>

        </div>
        
        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} Lumière & Éclat. Tous droits réservés. Site Démo.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

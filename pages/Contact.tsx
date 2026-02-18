import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Contactez-nous</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Une question sur un produit, une commande ou simplement envie de nous dire bonjour ? 
            Notre équipe est à votre disposition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-sm shadow-sm flex items-start space-x-4">
              <div className="p-3 bg-gold-100 text-gold-600 rounded-full">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 mb-1">Téléphone</h3>
                <p className="text-stone-600 mb-1">+225 07 07 00 00 00</p>
                <p className="text-xs text-stone-400">Lun - Ven, 9h à 18h</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-sm flex items-start space-x-4">
              <div className="p-3 bg-gold-100 text-gold-600 rounded-full">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 mb-1">Email</h3>
                <p className="text-stone-600">contact@lumiere-eclat.com</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-sm flex items-start space-x-4">
              <div className="p-3 bg-gold-100 text-gold-600 rounded-full">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 mb-1">Boutique</h3>
                <p className="text-stone-600">123 Avenue de la Mode, Abidjan</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Envoyez-nous un message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm font-medium text-stone-700 mb-1">Nom</label>
                   <input type="text" className="w-full border-stone-200 rounded-sm focus:ring-gold-500 focus:border-gold-500" placeholder="Votre nom" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                   <input type="email" className="w-full border-stone-200 rounded-sm focus:ring-gold-500 focus:border-gold-500" placeholder="votre@email.com" />
                </div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-stone-700 mb-1">Sujet</label>
                 <input type="text" className="w-full border-stone-200 rounded-sm focus:ring-gold-500 focus:border-gold-500" placeholder="Objet de votre message" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
                 <textarea rows={4} className="w-full border-stone-200 rounded-sm focus:ring-gold-500 focus:border-gold-500" placeholder="Comment pouvons-nous vous aider ?"></textarea>
              </div>
              <button className="w-full bg-stone-900 text-white py-4 rounded-sm hover:bg-gold-600 transition-colors flex items-center justify-center gap-2 font-medium tracking-wide">
                Envoyer <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

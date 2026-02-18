import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const labelClass = "block text-xs font-bold text-stone-900 mb-2 uppercase tracking-[0.2em]";
  const inputClass = "w-full bg-white border border-stone-200 px-4 py-4 text-stone-900 text-sm outline-none focus:border-stone-900 transition-all duration-300 placeholder:text-stone-400 rounded-none";

  return (
    <div className="min-h-screen bg-stone-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-20 animate-fade-in-up">
          <span className="text-gold-500 font-bold uppercase tracking-[0.4em] text-xs mb-4 block">Assistance & Conseil</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6">Contactez-nous</h1>
          <div className="w-20 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Une question sur une pièce d'exception ou besoin d'un conseil personnalisé ? 
            Nos conseillers sont à votre entière disposition pour vous accompagner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Contact Info Cards (Left Side - 5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 border border-stone-100 flex items-start space-x-6 transition-transform hover:-translate-y-1 duration-300">
              <div className="p-4 bg-stone-900 text-gold-400 flex-shrink-0">
                <Phone size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 uppercase tracking-widest text-sm mb-2">Service Client</h3>
                <p className="text-stone-800 text-lg">+225 07 07 00 00 00</p>
                <div className="flex items-center gap-2 mt-2 text-stone-400 text-xs">
                  <Clock size={14} />
                  <span>Lun - Ven, 09:00 — 18:00</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 border border-stone-100 flex items-start space-x-6 transition-transform hover:-translate-y-1 duration-300">
              <div className="p-4 bg-stone-900 text-gold-400 flex-shrink-0">
                <Mail size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 uppercase tracking-widest text-sm mb-2">Emailing</h3>
                <p className="text-stone-800 text-lg">concierge@lumiere-eclat.com</p>
                <p className="text-stone-400 text-xs mt-2 uppercase tracking-tight">Réponse sous 24h ouvrées</p>
              </div>
            </div>

            <div className="bg-white p-8 border border-stone-100 flex items-start space-x-6 transition-transform hover:-translate-y-1 duration-300">
              <div className="p-4 bg-stone-900 text-gold-400 flex-shrink-0">
                <MapPin size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 uppercase tracking-widest text-sm mb-2">Boutique Signature</h3>
                <p className="text-stone-800 text-lg leading-snug">123 Avenue de la Mode,<br />Abidjan, Côte d'Ivoire</p>
                <button className="mt-4 text-xs font-bold text-gold-600 uppercase border-b border-gold-600 pb-1 hover:text-stone-900 hover:border-stone-900 transition-colors">
                  Voir sur Google Maps
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Side - 7 columns) */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-stone-100 shadow-sm">
            <div className="flex items-center gap-3 mb-10">
              <MessageSquare className="text-gold-500" size={24} />
              <h2 className="text-2xl font-serif font-bold text-stone-900">Formulaire de Contact</h2>
            </div>
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                   <label className={labelClass}>Votre Nom complet</label>
                   <input 
                    type="text" 
                    className={inputClass} 
                    placeholder="ex: Marie Dupont" 
                   />
                </div>
                <div>
                   <label className={labelClass}>Adresse Email</label>
                   <input 
                    type="email" 
                    className={inputClass} 
                    placeholder="votre@email.com" 
                   />
                </div>
              </div>
              
              <div>
                 <label className={labelClass}>Sujet de votre demande</label>
                 <select className={inputClass + " appearance-none cursor-pointer"}>
                    <option>Information produit</option>
                    <option>Suivi de commande</option>
                    <option>Conseil style / Styliste IA</option>
                    <option>Réclamation</option>
                    <option>Autre</option>
                 </select>
              </div>

              <div>
                 <label className={labelClass}>Votre Message</label>
                 <textarea 
                  rows={5} 
                  className={inputClass + " resize-none"} 
                  placeholder="Comment pouvons-nous vous aider aujourd'hui ?"
                 ></textarea>
              </div>

              <div className="pt-4">
                <button className="group w-full bg-stone-900 text-white py-5 px-8 flex items-center justify-center gap-3 font-bold uppercase tracking-[0.2em] text-sm hover:bg-gold-500 transition-all duration-500">
                  Envoyer le Message 
                  <Send size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>

            <p className="text-center text-stone-400 text-[10px] mt-8 uppercase tracking-widest">
              Paiement sécurisé — Données protégées — Support client Premium
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
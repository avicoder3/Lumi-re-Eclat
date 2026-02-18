import React, { useState } from 'react';
import { CreditCard, Smartphone, Shield, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { useNavigate } from 'react-router-dom';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      clearCart();
      alert('Commande validée avec succès ! Merci de votre achat.');
      navigate('/');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-stone-50">
        <h2 className="text-2xl font-serif text-stone-900 mb-4">Votre panier est vide</h2>
        <button onClick={() => navigate('/catalog')} className="text-gold-600 underline">Retourner au catalogue</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8 text-center">Validation de la commande</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Steps Indicator */}
            <div className="flex items-center justify-between mb-8">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-gold-600' : 'text-stone-400'}`}>
                <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">1</div>
                <span className="font-medium hidden sm:inline">Coordonnées</span>
              </div>
              <div className="h-0.5 flex-1 bg-stone-200 mx-4"></div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-gold-600' : 'text-stone-400'}`}>
                <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">2</div>
                <span className="font-medium hidden sm:inline">Paiement</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-sm shadow-sm">
              {step === 1 ? (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-bold text-stone-900 mb-4">Informations de livraison</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Prénom</label>
                      <input required type="text" className="w-full border-stone-200 rounded-sm focus:ring-gold-500 focus:border-gold-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Nom</label>
                      <input required type="text" className="w-full border-stone-200 rounded-sm focus:ring-gold-500 focus:border-gold-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                    <input required type="email" className="w-full border-stone-200 rounded-sm focus:ring-gold-500 focus:border-gold-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Adresse</label>
                    <input required type="text" className="w-full border-stone-200 rounded-sm focus:ring-gold-500 focus:border-gold-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Ville</label>
                      <input required type="text" className="w-full border-stone-200 rounded-sm focus:ring-gold-500 focus:border-gold-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Téléphone</label>
                      <input required type="tel" className="w-full border-stone-200 rounded-sm focus:ring-gold-500 focus:border-gold-500" />
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="w-full bg-stone-900 text-white py-3 rounded-sm hover:bg-stone-800 flex items-center justify-center gap-2"
                  >
                    Continuer vers le paiement <ArrowRight size={18} />
                  </button>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-bold text-stone-900 mb-4">Moyen de paiement</h2>
                  
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gold-500 bg-gold-50 rounded-sm cursor-pointer">
                      <input type="radio" name="payment" className="text-gold-600 focus:ring-gold-500" defaultChecked />
                      <span className="ml-3 flex items-center gap-2 font-medium text-stone-900">
                        <CreditCard size={20} /> Carte Bancaire (Visa / Mastercard)
                      </span>
                    </label>
                    
                    <label className="flex items-center p-4 border border-stone-200 rounded-sm cursor-pointer hover:bg-stone-50">
                      <input type="radio" name="payment" className="text-gold-600 focus:ring-gold-500" />
                      <span className="ml-3 flex items-center gap-2 font-medium text-stone-900">
                        <Smartphone size={20} /> Mobile Money (MTN / Airtel)
                      </span>
                    </label>

                     <label className="flex items-center p-4 border border-stone-200 rounded-sm cursor-pointer hover:bg-stone-50">
                      <input type="radio" name="payment" className="text-gold-600 focus:ring-gold-500" />
                      <span className="ml-3 flex items-center gap-2 font-medium text-stone-900">
                        PayPal
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-4">
                    <Shield size={14} className="text-green-600" />
                    Paiement 100% sécurisé et crypté.
                  </div>

                  <div className="flex gap-4">
                    <button 
                      type="button" 
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 border border-stone-300 text-stone-600 rounded-sm hover:bg-stone-50"
                    >
                      Retour
                    </button>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="flex-1 bg-gold-600 text-white py-3 rounded-sm hover:bg-gold-700 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {loading ? 'Traitement...' : `Payer ${total.toLocaleString('fr-FR')} FCFA`}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-sm shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-stone-900 mb-4">Résumé de la commande</h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <div className="w-12 h-12 bg-stone-100 rounded-sm flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-stone-900 truncate">{item.name}</p>
                      <p className="text-stone-500">x{item.quantity}</p>
                    </div>
                    <div className="font-medium text-stone-900">
                      {(item.price * item.quantity).toLocaleString('fr-FR')}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-stone-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Sous-total</span>
                  <span>{total.toLocaleString('fr-FR')} FCFA</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Livraison</span>
                  <span>Gratuit</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-stone-900 pt-2">
                  <span>Total</span>
                  <span>{total.toLocaleString('fr-FR')} FCFA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

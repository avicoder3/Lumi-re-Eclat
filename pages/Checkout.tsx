import React, { useState } from 'react';
import { CreditCard, Smartphone, Shield, ArrowRight, ChevronLeft, Package, MapPin, Lock, CheckCircle, Truck, Tag } from 'lucide-react';
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
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? Math.round(total * 0.1) : 0;
  const finalTotal = total - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      clearCart();
      alert('Commande validée avec succès ! Merci de votre achat.');
      navigate('/');
    }, 2000);
  };

  const handlePromo = () => {
    if (promoCode.toUpperCase() === 'LUMIERE10') {
      setPromoApplied(true);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
        <Package size={48} className="text-stone-300 mb-4" />
        <h2 className="text-2xl font-serif text-stone-900 mb-2">Votre panier est vide</h2>
        <p className="text-stone-500 mb-6">Découvrez notre collection exclusive</p>
        <button onClick={() => navigate('/catalog')} className="bg-stone-900 text-white px-8 py-3 rounded-sm hover:bg-gold-500 transition-colors">
          Retourner au catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-white">
      <style>{`
        .checkout-input {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #e5e5e5;
          border-radius: 0px;
          background-color: #ffffff !important;
          color: #000000 !important;
          font-size: 14px;
          transition: border-color 0.2s;
          outline: none;
        }
        .checkout-input::placeholder {
          color: #a3a3a3;
        }
        .checkout-input:focus {
          border-color: #000000;
          background-color: #ffffff !important;
        }
        .step-dot {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          border: 1px solid currentColor;
          transition: all 0.3s;
        }
        .step-dot.active {
          background-color: #000000;
          color: white;
          border-color: #000000;
        }
        .step-dot.done {
          background-color: #C49A46;
          color: white;
          border-color: #C49A46;
        }
        .payment-card {
          border: 1px solid #e5e5e5;
          border-radius: 0px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
        }
        .payment-card:hover {
          border-color: #000000;
        }
        .payment-card.selected {
          border-color: #000000;
          background: #fafafa;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .btn-primary {
          width: 100%;
          padding: 16px 24px;
          background-color: #000000;
          color: white;
          border: none;
          border-radius: 0px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background-color 0.3s;
        }
        .btn-primary:hover {
          background-color: #C49A46;
        }
        .btn-secondary {
          width: 100%;
          padding: 16px 24px;
          background-color: white;
          color: #000000;
          border: 1px solid #e5e5e5;
          border-radius: 0px;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .btn-secondary:hover {
          background-color: #f5f5f5;
          border-color: #000000;
        }
        .section-card {
          background: white;
          padding: 0px;
        }
        .order-card {
          background: #fafafa;
          border: 1px solid #e5e5e5;
          border-radius: 0px;
          position: sticky;
          top: 100px;
        }
        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .divider { height: 1px; background: #e5e5e5; margin: 30px 0; }
        .trust-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #525252;
          font-size: 12px;
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: fadeSlide 0.3s ease forwards; }
        .promo-input-wrap {
          display: flex;
          gap: 0;
        }
        .promo-input-wrap .checkout-input {
          flex: 1;
        }
        .btn-promo {
          padding: 0 20px;
          background: #000000;
          color: white;
          border: none;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-promo:hover { background: #333; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-gold-500 uppercase mb-3 font-bold">Lumière & Éclat</p>
          <h1 className="text-4xl font-serif font-bold text-stone-900">Paiement Sécurisé</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT — Main Form */}
          <div className="lg:col-span-2 space-y-10">

            {/* Steps */}
            <div className="flex items-center gap-0">
              <div className="flex items-center gap-3">
                <div className={`step-dot ${step > 1 ? 'done' : 'active'}`}>
                  {step > 1 ? <CheckCircle size={16} /> : '1'}
                </div>
                <span className={`font-bold text-sm uppercase tracking-wide ${step >= 1 ? 'text-stone-900' : 'text-stone-300'}`}>Livraison</span>
              </div>
              <div className="flex-1 h-px mx-4 bg-stone-200"></div>
              <div className="flex items-center gap-3">
                <div className={`step-dot ${step >= 2 ? 'active' : ''}`} style={step < 2 ? { borderColor: '#e5e5e5', color: '#e5e5e5' } : {}}>
                  2
                </div>
                <span className={`font-bold text-sm uppercase tracking-wide ${step >= 2 ? 'text-stone-900' : 'text-stone-300'}`}>Paiement</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>

              {/* STEP 1 — Shipping */}
              {step === 1 && (
                <div className="section-card animate-in">
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-stone-100">
                    <MapPin size={20} className="text-stone-900" />
                    <h2 className="text-xl font-serif font-bold text-stone-900">Adresse de livraison</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="field-label">Prénom</label>
                        <input required type="text" placeholder="Marie" className="checkout-input" />
                      </div>
                      <div>
                        <label className="field-label">Nom</label>
                        <input required type="text" placeholder="Dupont" className="checkout-input" />
                      </div>
                    </div>

                    <div>
                      <label className="field-label">Adresse e-mail</label>
                      <input required type="email" placeholder="marie.dupont@exemple.com" className="checkout-input" />
                    </div>

                    <div>
                      <label className="field-label">Adresse de livraison</label>
                      <input required type="text" placeholder="12 rue des Fleurs, Apt 3" className="checkout-input" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="field-label">Ville</label>
                        <input required type="text" placeholder="Brazzaville" className="checkout-input" />
                      </div>
                      <div>
                        <label className="field-label">Téléphone</label>
                        <input required type="tel" placeholder="+242 06 000 00 00" className="checkout-input" />
                      </div>
                    </div>
                  </div>

                  <div className="divider"></div>

                  {/* Shipping options */}
                  <div className="mb-8">
                    <h3 className="font-bold text-sm text-stone-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                      <Truck size={16} /> Mode de livraison
                    </h3>
                    <div className="space-y-3">
                      <label className="payment-card selected" style={{ cursor: 'pointer' }}>
                        <input type="radio" name="shipping" defaultChecked className="accent-black mr-4" />
                        <div className="flex-1">
                          <p className="font-bold text-stone-900 text-sm">Livraison Standard</p>
                          <p className="text-xs text-stone-500 uppercase tracking-wide">3–5 jours ouvrés</p>
                        </div>
                        <span className="text-sm font-bold text-stone-900">Gratuit</span>
                      </label>
                      <label className="payment-card" style={{ cursor: 'pointer' }}>
                        <input type="radio" name="shipping" className="accent-black mr-4" />
                        <div className="flex-1">
                          <p className="font-bold text-stone-900 text-sm">Livraison Express</p>
                          <p className="text-xs text-stone-500 uppercase tracking-wide">1–2 jours ouvrés</p>
                        </div>
                        <span className="text-sm font-bold text-stone-900">2 500 FCFA</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-primary"
                  >
                    Continuer <ArrowRight size={18} />
                  </button>
                </div>
              )}

              {/* STEP 2 — Payment */}
              {step === 2 && (
                <div className="section-card animate-in">
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-stone-100">
                    <Lock size={20} className="text-stone-900" />
                    <h2 className="text-xl font-serif font-bold text-stone-900">Moyen de paiement</h2>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div
                      className={`payment-card ${paymentMethod === 'card' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-black" />
                      <CreditCard size={22} className="text-stone-900" />
                      <div className="flex-1">
                        <p className="font-bold text-stone-900 text-sm">Carte Bancaire</p>
                      </div>
                      <div className="flex gap-2 opacity-50">
                         {/* Simple visual placeholders for cards */}
                         <div className="w-8 h-5 bg-stone-300 rounded-sm"></div>
                         <div className="w-8 h-5 bg-stone-300 rounded-sm"></div>
                      </div>
                    </div>

                    <div
                      className={`payment-card ${paymentMethod === 'mobile' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('mobile')}
                    >
                      <input type="radio" name="payment" checked={paymentMethod === 'mobile'} onChange={() => setPaymentMethod('mobile')} className="accent-black" />
                      <Smartphone size={22} className="text-stone-900" />
                      <div className="flex-1">
                        <p className="font-bold text-stone-900 text-sm">Mobile Money</p>
                      </div>
                    </div>
                  </div>

                  {/* Card fields (conditionnels) */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-6 mb-8 p-6 bg-stone-50 border border-stone-100">
                      <div>
                        <label className="field-label">Numéro de carte</label>
                        <input type="text" placeholder="0000 0000 0000 0000" maxLength={19} className="checkout-input" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="field-label">Expiration</label>
                          <input type="text" placeholder="MM / AA" maxLength={7} className="checkout-input" />
                        </div>
                        <div>
                          <label className="field-label">CVC</label>
                          <input type="text" placeholder="123" maxLength={4} className="checkout-input" />
                        </div>
                      </div>
                      <div>
                        <label className="field-label">Nom du titulaire</label>
                        <input type="text" placeholder="NOM PRÉNOM" className="checkout-input" />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'mobile' && (
                    <div className="space-y-6 mb-8 p-6 bg-stone-50 border border-stone-100">
                      <div>
                        <label className="field-label">Numéro Mobile</label>
                        <input type="tel" placeholder="+242 06..." className="checkout-input" />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-secondary"
                      style={{ flex: '0 0 auto', width: 'auto' }}
                    >
                      <ChevronLeft size={16} /> Retour
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                      style={{ flex: 1, opacity: loading ? 0.7 : 1 }}
                    >
                      {loading ? 'Traitement...' : `Payer ${finalTotal.toLocaleString('fr-FR')} FCFA`}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="lg:col-span-1">
            <div className="order-card">
              <div className="px-6 py-5 bg-black border-b border-stone-800">
                <h3 className="text-white font-bold flex items-center gap-2 uppercase tracking-wider text-xs">
                  <Package size={14} className="text-gold-500" />
                  Votre Panier
                </h3>
              </div>

              <div className="p-6">
                {/* Items */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 pr-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 bg-white border border-stone-200 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <p className="text-sm font-bold text-stone-900 truncate">{item.name}</p>
                        <p className="text-xs text-stone-500 mt-1">Qté: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium text-stone-900 whitespace-nowrap flex items-center">
                        {(item.price * item.quantity).toLocaleString('fr-FR')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo code */}
                <div className="mb-6">
                  <div className="promo-input-wrap border border-stone-300">
                    <input
                      type="text"
                      placeholder="CODE PROMO"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      className="checkout-input border-none focus:ring-0"
                      disabled={promoApplied}
                    />
                    <button onClick={handlePromo} className="btn-promo" disabled={promoApplied}>
                      {promoApplied ? '✓' : 'OK'}
                    </button>
                  </div>
                  {promoApplied && <p className="text-xs text-green-600 mt-2 font-bold uppercase">Code Appliqué</p>}
                </div>

                <div className="border-t border-dashed border-stone-300 my-6"></div>

                {/* Totals */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-stone-600">
                    <span>Sous-total</span>
                    <span>{total.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Livraison</span>
                    <span className="text-stone-900 font-bold">Gratuit</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-gold-600">
                      <span>Réduction</span>
                      <span>−{discount.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  )}
                  <div className="border-t border-stone-900 my-4 pt-4">
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-stone-900 uppercase">Total</span>
                      <span className="font-serif text-2xl font-bold text-stone-900">{finalTotal.toLocaleString('fr-FR')} <span className="text-xs font-sans font-normal text-stone-500">FCFA</span></span>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-8 pt-6 border-t border-stone-200 space-y-3">
                  <div className="trust-badge"><Shield size={14} /> Paiement 100% Sécurisé</div>
                  <div className="trust-badge"><CheckCircle size={14} /> Garantie Satisfait ou Remboursé</div>
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
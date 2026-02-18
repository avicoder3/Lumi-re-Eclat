import React from 'react';
import { X, Plus, Minus, Trash2, CreditCard } from 'lucide-react';
import { CartItem } from '../types';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-stone-900">Votre Panier</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-900">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 mb-4">
                <ShoppingBag size={32} className="text-stone-400" />
              </div>
              <p className="text-stone-500 mb-6">Votre panier est vide.</p>
              <button 
                onClick={onClose}
                className="text-gold-600 font-medium hover:underline"
              >
                Continuer vos achats
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20 bg-stone-100 rounded-sm overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-stone-900 line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-stone-500">{item.price.toLocaleString('fr-FR')} FCFA</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-stone-200 rounded-sm">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:bg-stone-50 text-stone-600 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-2 text-xs font-medium w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:bg-stone-50 text-stone-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-stone-50 border-t border-stone-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-600">Sous-total</span>
              <span className="text-lg font-bold text-stone-900 font-serif">
                {total.toLocaleString('fr-FR')} FCFA
              </span>
            </div>
            <p className="text-xs text-stone-400 mb-6 text-center">
              Frais de livraison calculés à la caisse.
            </p>
            <Link 
              to="/checkout"
              onClick={onClose}
              className="w-full bg-stone-900 text-white py-4 flex items-center justify-center gap-2 hover:bg-gold-600 transition-colors duration-300 font-medium tracking-wide uppercase text-sm"
            >
              <span>Passer à la caisse</span>
              <CreditCard size={18} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

import { ShoppingBag } from 'lucide-react';

export default CartDrawer;

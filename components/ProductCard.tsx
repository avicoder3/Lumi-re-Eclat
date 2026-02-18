import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-stone-900 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
            Nouveau
          </span>
        )}
        {product.isPopular && (
          <span className="bg-gold-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
            Populaire
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Quick Add Button (Desktop) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(product);
          }}
          className="absolute bottom-4 right-4 bg-white text-stone-900 p-3 rounded-full shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold-500 hover:text-white z-20"
          title="Ajouter au panier"
        >
          <ShoppingBag size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-stone-900 hover:text-gold-600 transition-colors mb-1 truncate">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1 mb-2">
             <Star size={12} className="fill-gold-400 text-gold-400" />
             <span className="text-xs text-stone-500">{product.rating}</span>
          </div>
          <p className="text-gold-600 font-bold font-serif">
            {product.price.toLocaleString('fr-FR')} FCFA
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

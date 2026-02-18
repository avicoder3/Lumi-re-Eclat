import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Truck, RefreshCw, ShoppingBag, ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const found = PRODUCTS.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setSelectedImage(found.image);
    } else {
      navigate('/catalog'); // Redirect if not found
    }
  }, [id, navigate]);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-stone-500 hover:text-stone-900 mb-8 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" /> Retour
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12">
            
            {/* Gallery Section */}
            <div className="p-6 md:p-10 bg-white">
              <div className="aspect-square bg-stone-100 rounded-sm overflow-hidden mb-4">
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {/* Mocking multiple images with the same one for demo */}
                {[product.image, product.image, product.image].map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-square rounded-sm overflow-hidden border-2 transition-colors ${selectedImage === img && i === 0 ? 'border-gold-500' : 'border-transparent hover:border-gold-200'}`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info Section */}
            <div className="p-6 md:p-10 flex flex-col justify-center border-l border-stone-100">
              <div className="mb-2">
                <span className="text-sm font-medium text-gold-600 tracking-wider uppercase">
                  {product.category.replace('_', ' ')}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                 <div className="flex items-center text-gold-400">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                   ))}
                 </div>
                 <span className="text-stone-400 text-sm">({product.reviews} avis clients)</span>
              </div>

              <div className="text-3xl font-bold text-stone-900 mb-8 font-serif">
                {product.price.toLocaleString('fr-FR')} FCFA
              </div>

              <div className="prose text-stone-600 mb-8 leading-relaxed">
                <p>{product.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <div className="p-2 bg-stone-100 rounded-full text-stone-800">
                    <Truck size={18} />
                  </div>
                  <span>Livraison gratuite à partir de 50.000 FCFA</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <div className="p-2 bg-stone-100 rounded-full text-stone-800">
                    <RefreshCw size={18} />
                  </div>
                  <span>Retours acceptés sous 14 jours</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                 <button
                   onClick={() => onAddToCart(product)}
                   className="flex-1 bg-stone-900 text-white py-4 px-8 rounded-sm hover:bg-gold-600 transition-colors duration-300 flex items-center justify-center gap-2 font-bold uppercase tracking-wide"
                 >
                   <ShoppingBag size={20} /> Ajouter au panier
                 </button>
              </div>
              
              <div className="mt-4 text-center">
                 <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                   {product.stock > 0 ? `En stock (${product.stock} restants)` : 'Rupture de stock'}
                 </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

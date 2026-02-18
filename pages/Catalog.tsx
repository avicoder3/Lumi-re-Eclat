import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Product, SortOption } from '../types';
import ProductCard from '../components/ProductCard';

interface CatalogProps {
  onAddToCart: (product: Product) => void;
}

const Catalog: React.FC<CatalogProps> = ({ onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) setActiveCategory(categoryParam);
  }, [searchParams]);

  // Filtering Logic
  useEffect(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Sorting
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        result = result.filter(p => p.isPopular);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    setFilteredProducts(result);
  }, [activeCategory, sortBy]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
    setIsFilterOpen(false); // Close mobile drawer if open
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-stone-900">Catalogue</h1>
            <p className="text-stone-500 mt-2">
              {filteredProducts.length} produit(s) trouvé(s)
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Mobile Filter Toggle */}
            <button 
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-sm text-sm font-medium"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={18} /> Filtres
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex items-center gap-2 ml-auto">
               <span className="text-sm text-stone-500 hidden sm:inline">Trier par:</span>
               <select 
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value as SortOption)}
                 className="block w-full md:w-48 pl-3 pr-10 py-2 text-base border-stone-200 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm rounded-sm bg-white"
               >
                 <option value="newest">Nouveautés</option>
                 <option value="price_asc">Prix croissant</option>
                 <option value="price_desc">Prix décroissant</option>
                 <option value="popularity">Populaire</option>
               </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters (Desktop) */}
          <aside className={`md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-6 rounded-sm shadow-sm sticky top-24">
              <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                <SlidersHorizontal size={18} /> Catégories
              </h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`text-sm w-full text-left transition-colors ${activeCategory === 'all' ? 'text-gold-600 font-bold' : 'text-stone-600 hover:text-gold-500'}`}
                  >
                    Tout voir
                  </button>
                </li>
                {CATEGORIES.map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`text-sm w-full text-left transition-colors ${activeCategory === cat.id ? 'text-gold-600 font-bold' : 'text-stone-600 hover:text-gold-500'}`}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-stone-100">
                <h3 className="font-bold text-stone-900 mb-4">Prix</h3>
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <input type="range" className="w-full accent-gold-500" disabled />
                </div>
                <p className="text-xs text-stone-400 mt-2">Filtre prix bientôt disponible</p>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-sm">
                <p className="text-stone-500 text-lg">Aucun produit ne correspond à vos critères.</p>
                <button 
                  onClick={() => {setActiveCategory('all'); setSortBy('newest');}}
                  className="mt-4 text-gold-600 underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;

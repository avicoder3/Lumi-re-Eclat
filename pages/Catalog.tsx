import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 250000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Calculate price bounds
  const priceBounds = useMemo(() => {
    const prices = PRODUCTS.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, []);

  // Sync with URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    if (categoryParam) setActiveCategory(categoryParam);
    if (searchParam) setSearchQuery(searchParam);
  }, [searchParams]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Rating
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // Stock
    if (onlyInStock) {
      result = result.filter(p => p.stock > 0);
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
        result.sort((a, b) => {
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          return b.rating - a.rating;
        });
        break;
      case 'newest':
        result.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
    }

    return result;
  }, [activeCategory, sortBy, searchQuery, priceRange, minRating, onlyInStock]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
    setIsFilterOpen(false);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      searchParams.set('search', value);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setActiveCategory('all');
    setSortBy('newest');
    setSearchQuery('');
    setPriceRange([priceBounds.min, priceBounds.max]);
    setMinRating(0);
    setOnlyInStock(false);
    searchParams.delete('category');
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (activeCategory !== 'all') count++;
    if (searchQuery.trim()) count++;
    if (priceRange[0] !== priceBounds.min || priceRange[1] !== priceBounds.max) count++;
    if (minRating > 0) count++;
    if (onlyInStock) count++;
    return count;
  }, [activeCategory, searchQuery, priceRange, minRating, onlyInStock, priceBounds]);

  return (
    <div className="min-h-screen bg-stone-50 pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">
                Catalogue
              </h1>
              <p className="text-stone-500">
                {filteredProducts.length} produit(s) trouvé(s)
                {activeFiltersCount > 0 && (
                  <span className="ml-2 text-gold-600 font-medium">
                    · {activeFiltersCount} filtre(s) actif(s)
                  </span>
                )}
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-sm transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-gold-500 text-white' 
                    : 'bg-white text-stone-600 hover:bg-stone-100'
                }`}
                title="Vue grille"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-sm transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-gold-500 text-white' 
                    : 'bg-white text-stone-600 hover:bg-stone-100'
                }`}
                title="Vue liste"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Rechercher un produit, une catégorie..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-white rounded-sm shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-sm text-sm font-medium transition-colors"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtres
              {activeFiltersCount > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-gold-500 text-white text-xs rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gold-600 hover:text-gold-700 font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Réinitialiser
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-stone-500 hidden sm:inline">Trier par:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="block w-full sm:w-48 pl-3 pr-10 py-2 text-sm border-stone-200 focus:outline-none focus:ring-2 focus:ring-gold-500 rounded-sm bg-white cursor-pointer"
            >
              <option value="newest">🆕 Nouveautés</option>
              <option value="price_asc">💰 Prix croissant</option>
              <option value="price_desc">💎 Prix décroissant</option>
              <option value="popularity">🔥 Populaire</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className={`lg:w-72 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-sm shadow-sm sticky top-24 space-y-6">
              
              {/* Categories */}
              <div>
                <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Catégories
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleCategoryChange('all')}
                      className={`text-sm w-full text-left px-3 py-2 rounded-sm transition-all ${
                        activeCategory === 'all' 
                          ? 'bg-gold-50 text-gold-700 font-bold' 
                          : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Tout voir ({PRODUCTS.length})
                    </button>
                  </li>
                  {CATEGORIES.map(cat => {
                    const count = PRODUCTS.filter(p => p.category === cat.id).length;
                    return (
                      <li key={cat.id}>
                        <button
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`text-sm w-full text-left px-3 py-2 rounded-sm transition-all ${
                            activeCategory === cat.id 
                              ? 'bg-gold-50 text-gold-700 font-bold' 
                              : 'text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          {cat.label} ({count})
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Price */}
              <div className="pt-6 border-t border-stone-100">
                <h3 className="font-bold text-stone-900 mb-4">Prix</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min={priceBounds.min}
                    max={priceBounds.max}
                    step={5000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-sm gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-24 px-2 py-1 border border-stone-200 rounded-sm text-center focus:outline-none focus:ring-1 focus:ring-gold-500"
                      min={priceBounds.min}
                      max={priceRange[1]}
                    />
                    <span className="text-stone-400">—</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || priceBounds.max])}
                      className="w-24 px-2 py-1 border border-stone-200 rounded-sm text-center focus:outline-none focus:ring-1 focus:ring-gold-500"
                      min={priceRange[0]}
                      max={priceBounds.max}
                    />
                  </div>
                  <p className="text-xs text-stone-500 text-center">
                    {priceRange[0].toLocaleString('fr-FR')} - {priceRange[1].toLocaleString('fr-FR')} FCFA
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="pt-6 border-t border-stone-100">
                <h3 className="font-bold text-stone-900 mb-4">Note minimum</h3>
                <div className="space-y-2">
                  {[4.5, 4, 3.5, 3, 0].map(rating => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="accent-gold-500"
                      />
                      <span className="text-sm text-stone-600 group-hover:text-gold-600">
                        {rating > 0 ? `⭐ ${rating} & plus` : 'Toutes les notes'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stock */}
              <div className="pt-6 border-t border-stone-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 accent-gold-500"
                  />
                  <span className="text-sm font-medium text-stone-700 group-hover:text-gold-600">
                    📦 En stock uniquement
                  </span>
                </label>
              </div>

            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {filteredProducts.map(product => (
                  viewMode === 'grid' ? (
                    <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                  ) : (
                    <ProductListCard key={product.id} product={product} onAddToCart={onAddToCart} />
                  )
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-sm shadow-sm">
                <div className="w-20 h-20 mx-auto mb-4 bg-stone-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-stone-500 mb-6">
                  Aucun produit ne correspond à vos critères.
                </p>
                <button 
                  onClick={resetFilters}
                  className="px-6 py-3 bg-gold-500 text-white rounded-sm hover:bg-gold-600 transition-colors font-medium"
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

// List View Component
const ProductListCard: React.FC<{ product: Product; onAddToCart: (p: Product) => void }> = ({ 
  product, 
  onAddToCart 
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-sm shadow-sm hover:shadow-lg transition-all group">
      <div className="relative w-full sm:w-48 h-48 flex-shrink-0 overflow-hidden rounded-sm bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-stone-900 text-white text-[10px] font-bold uppercase px-2 py-1">
            Nouveau
          </span>
        )}
        {product.isPopular && (
          <span className="absolute top-2 right-2 bg-gold-500 text-white text-[10px] font-bold uppercase px-2 py-1">
            Populaire
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-serif font-bold text-stone-900 mb-2 group-hover:text-gold-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-stone-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-stone-500 mb-3">
            <span>⭐ {product.rating} ({product.reviews} avis)</span>
            <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
              {product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-2xl font-serif font-bold text-gold-600">
            {product.price.toLocaleString('fr-FR')} FCFA
          </p>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="px-6 py-2 bg-gold-500 text-white rounded-sm hover:bg-gold-600 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed font-medium"
          >
            {product.stock > 0 ? 'Ajouter' : 'Indisponible'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const Journal: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Header */}
      <div className="bg-stone-50 pt-20 pb-20 px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center space-y-4 animate-fade-in-up">
           <span className="text-gold-500 font-bold uppercase tracking-[0.3em] text-xs">Lifestyle & Inspiration</span>
           <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900">Le Journal</h1>
           <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
           <p className="text-stone-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
             Plongez dans l'univers de l'élégance. Découvrez nos conseils d'entretien, les dernières tendances et les histoires qui façonnent notre maison.
           </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-16">
          {BLOG_POSTS.map((post, index) => (
             <Link 
               to={`/journal/${post.id}`} 
               key={post.id}
               className="group flex flex-col h-full"
             >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10] mb-8 bg-stone-100">
                  <div className="absolute top-4 left-4 z-10 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-stone-900 shadow-sm">
                    {post.category}
                  </div>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-stone-400 font-medium uppercase tracking-wider mb-3">
                     <span>{post.date}</span>
                     <span className="w-1 h-1 rounded-full bg-gold-500"></span>
                     <span>{post.readTime} de lecture</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-4 leading-tight group-hover:text-gold-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-stone-500 leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center text-stone-900 font-bold uppercase text-xs tracking-widest group-hover:gap-2 transition-all duration-300">
                    Lire l'article <ArrowRight size={14} className="ml-2 text-gold-500" />
                  </div>
                </div>
             </Link>
          ))}
        </div>
        
        {/* Pagination (Visual only for demo) */}
        <div className="flex justify-center mt-20 gap-2">
           <span className="w-8 h-8 flex items-center justify-center bg-stone-900 text-white font-bold text-sm">1</span>
           <span className="w-8 h-8 flex items-center justify-center bg-stone-100 text-stone-500 font-bold text-sm hover:bg-stone-200 cursor-pointer transition-colors">2</span>
           <span className="w-8 h-8 flex items-center justify-center bg-stone-100 text-stone-500 font-bold text-sm hover:bg-stone-200 cursor-pointer transition-colors">3</span>
        </div>
      </div>
    </div>
  );
};

export default Journal;
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const JournalPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = BLOG_POSTS.find(p => p.id === id);
  const otherPosts = BLOG_POSTS.filter(p => p.id !== id).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
        <h2 className="text-2xl font-serif text-stone-900 mb-4">Article introuvable</h2>
        <button onClick={() => navigate('/journal')} className="text-gold-600 underline hover:text-stone-900">
          Retour au journal
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      
      {/* Scroll Progress Bar (Optional nice touch) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-stone-100 z-50">
        <div className="h-full bg-gold-500 w-0" id="progress-bar"></div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-stone-900/30"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-4xl mx-auto text-white space-y-4 animate-fade-in-up">
             <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gold-400">
                <span className="bg-white/10 px-3 py-1 backdrop-blur-sm">{post.category}</span>
                <span>{post.readTime} de lecture</span>
             </div>
             <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
               {post.title}
             </h1>
             <div className="flex items-center gap-6 text-sm text-stone-300 pt-2">
                <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
                <span className="flex items-center gap-2">Par <span className="text-white font-bold border-b border-gold-500">{post.author}</span></span>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Sidebar (Share) */}
        <div className="hidden lg:block lg:col-span-2 sticky top-32 h-fit">
           <Link to="/journal" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 mb-12 transition-colors">
              <ArrowLeft size={14} /> Retour
           </Link>
           <div className="space-y-4">
              <p className="text-xs font-bold uppercase text-stone-900 mb-4">Partager</p>
              <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all">
                <Facebook size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all">
                <Twitter size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all">
                <Linkedin size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all">
                <Share2 size={18} />
              </button>
           </div>
        </div>

        {/* Content */}
        <div className="col-span-1 lg:col-span-8">
           <div className="prose prose-stone prose-lg max-w-none">
              <style>{`
                .prose p { margin-bottom: 1.5em; line-height: 1.8; color: #57534e; font-size: 1.125rem; }
                .prose h3 { font-family: 'Playfair Display', serif; font-size: 1.75rem; color: #1c1917; margin-top: 2.5em; margin-bottom: 1em; }
                .prose blockquote { border-left: 3px solid #C49A46; padding-left: 1.5em; font-style: italic; color: #1c1917; font-family: 'Playfair Display', serif; font-size: 1.5rem; margin: 2.5em 0; }
                .prose strong { color: #1c1917; font-weight: 700; }
              `}</style>
              
              <p className="lead text-xl md:text-2xl font-serif text-stone-800 italic mb-10 leading-relaxed border-b border-stone-100 pb-10">
                {post.excerpt}
              </p>
              
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
           </div>

           <div className="mt-16 pt-8 border-t border-stone-200 flex justify-between items-center">
              <div className="flex items-center gap-4">
                 <span className="text-sm text-stone-500 font-bold uppercase tracking-wider">Mots-clés :</span>
                 <div className="flex gap-2">
                    <span className="bg-stone-100 text-stone-600 px-3 py-1 text-xs uppercase tracking-wide rounded-sm">Luxe</span>
                    <span className="bg-stone-100 text-stone-600 px-3 py-1 text-xs uppercase tracking-wide rounded-sm">{post.category}</span>
                 </div>
              </div>
           </div>
        </div>

      </div>

      {/* Similar Articles */}
      <section className="bg-stone-50 py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-serif font-bold text-stone-900 mb-12 text-center">Vous aimerez aussi</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {otherPosts.map(op => (
                 <Link to={`/journal/${op.id}`} key={op.id} className="group block bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-[4/3] overflow-hidden">
                       <img src={op.image} alt={op.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="p-6">
                       <p className="text-xs font-bold text-gold-600 uppercase tracking-widest mb-2">{op.category}</p>
                       <h4 className="font-serif font-bold text-xl text-stone-900 group-hover:text-gold-600 transition-colors mb-3">{op.title}</h4>
                       <div className="flex items-center text-xs text-stone-400 font-bold uppercase tracking-widest">
                          Lire <ArrowRight size={12} className="ml-2" />
                       </div>
                    </div>
                 </Link>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
};

export default JournalPost;
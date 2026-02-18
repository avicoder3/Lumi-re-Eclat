import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Truck, RefreshCw, ShoppingBag, ArrowLeft, ChevronLeft, ChevronRight, Shield, Heart, ZoomIn } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Mock multiple product images (same image for demo)
  const images = product ? [product.image, product.image, product.image, product.image] : [];

  useEffect(() => {
    const found = PRODUCTS.find(p => p.id === id);
    if (found) {
      setProduct(found);
    } else {
      navigate('/catalog');
    }
    // Trigger page entrance animation
    const timer = setTimeout(() => setPageVisible(true), 50);
    return () => clearTimeout(timer);
  }, [id, navigate]);

  // ✏️ Remplacez ce numéro par celui du propriétaire (format international, sans + ni espaces)
  const WHATSAPP_NUMBER = '242066257433';

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Bonjour ! 👋\n\nJe suis intéressé(e) par ce produit sur *Lumière & Éclat* :\n\n` +
      `🕐 *${product?.name}*\n` +
      `💰 Prix : *${product?.price.toLocaleString('fr-FR')} FCFA*\n` +
      `🔗 Réf. : #${product?.id}\n\n` +
      `Pourriez-vous me donner plus d'informations ? Merci !`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleAddToCart = () => {
    if (!product) return;
    onAddToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const prevImage = () => setSelectedIndex(i => (i - 1 + images.length) % images.length);
  const nextImage = () => setSelectedIndex(i => (i + 1) % images.length);

  if (!product) return null;

  const fullStars = Math.floor(product.rating);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        :root {
          --gold: #C9A96E;
          --gold-light: #E8D5B0;
          --gold-dark: #A07840;
          --obsidian: #0F0F0F;
          --charcoal: #1C1C1C;
          --stone: #F5F3EF;
          --stone-mid: #E8E4DD;
          --text-muted: #888880;
        }

        .pd-page {
          font-family: 'Jost', sans-serif;
          background: var(--stone);
          min-height: 100vh;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .pd-page.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Back button */
        .pd-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.3s ease, gap 0.3s ease;
          margin-bottom: 40px;
        }
        .pd-back:hover {
          color: var(--obsidian);
          gap: 12px;
        }
        .pd-back svg {
          transition: transform 0.3s ease;
        }
        .pd-back:hover svg {
          transform: translateX(-3px);
        }

        /* Main grid */
        .pd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          background: white;
          border-radius: 2px;
          overflow: hidden;
          box-shadow: 0 4px 60px rgba(0,0,0,0.06);
        }
        @media (max-width: 768px) {
          .pd-grid { grid-template-columns: 1fr; }
        }

        /* Gallery */
        .pd-gallery {
          position: relative;
          background: #F8F6F2;
        }

        .pd-main-image-wrap {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          cursor: zoom-in;
        }
        .pd-main-image-wrap.zoomed {
          cursor: zoom-out;
        }
        .pd-main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease;
          transform-origin: var(--zoom-x, 50%) var(--zoom-y, 50%);
          opacity: 0;
        }
        .pd-main-image.loaded {
          opacity: 1;
        }
        .pd-main-image-wrap.zoomed .pd-main-image {
          transform: scale(2);
        }

        /* Slider arrows */
        .pd-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(255,255,255,0.9);
          border: 1px solid var(--stone-mid);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
          color: var(--obsidian);
          opacity: 0;
        }
        .pd-gallery:hover .pd-arrow {
          opacity: 1;
        }
        .pd-arrow:hover {
          background: white;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          transform: translateY(-50%) scale(1.08);
        }
        .pd-arrow-left { left: 16px; }
        .pd-arrow-right { right: 16px; }

        /* Thumbnail strip */
        .pd-thumbnails {
          display: flex;
          gap: 8px;
          padding: 16px 20px 20px;
          background: #F8F6F2;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .pd-thumbnails::-webkit-scrollbar { display: none; }

        .pd-thumb {
          flex-shrink: 0;
          width: 72px;
          height: 72px;
          border-radius: 2px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          position: relative;
        }
        .pd-thumb::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0);
          transition: background 0.3s ease;
        }
        .pd-thumb:not(.active)::after {
          background: rgba(255,255,255,0.4);
        }
        .pd-thumb.active {
          border-color: var(--gold);
        }
        .pd-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .pd-thumb:hover img {
          transform: scale(1.08);
        }

        /* Image counter dots */
        .pd-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          padding: 8px 0 4px;
        }
        .pd-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--stone-mid);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .pd-dot.active {
          background: var(--gold);
          width: 20px;
          border-radius: 3px;
        }

        /* Info panel */
        .pd-info {
          padding: 48px 52px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: white;
          border-left: 1px solid var(--stone-mid);
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 1024px) {
          .pd-info { padding: 36px 32px; }
        }

        /* Decorative corner */
        .pd-info::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, transparent 60%, rgba(201,169,110,0.06) 100%);
          pointer-events: none;
        }

        .pd-category {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pd-category::before {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background: var(--gold);
        }

        .pd-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 600;
          line-height: 1.1;
          color: var(--obsidian);
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }

        /* Stars */
        .pd-rating {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }
        .pd-stars {
          display: flex;
          gap: 2px;
          color: var(--gold);
        }
        .pd-reviews {
          font-size: 13px;
          color: var(--text-muted);
          letter-spacing: 0.03em;
        }
        .pd-reviews a {
          color: var(--text-muted);
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }
        .pd-reviews a:hover { color: var(--obsidian); }

        /* Divider */
        .pd-divider {
          height: 1px;
          background: linear-gradient(to right, var(--stone-mid), transparent);
          margin: 24px 0;
        }

        /* Price */
        .pd-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3vw, 38px);
          font-weight: 700;
          color: var(--obsidian);
          letter-spacing: -0.02em;
          margin-bottom: 20px;
          line-height: 1;
        }
        .pd-price span {
          font-size: 0.55em;
          font-weight: 400;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-left: 4px;
          vertical-align: super;
          font-family: 'Jost', sans-serif;
        }

        /* Description */
        .pd-description {
          font-size: 15px;
          line-height: 1.75;
          color: #555550;
          margin-bottom: 28px;
          font-weight: 300;
          letter-spacing: 0.01em;
        }

        /* Features */
        .pd-features {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }
        .pd-feature {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 13px;
          color: #666660;
          letter-spacing: 0.02em;
          padding: 12px 16px;
          background: var(--stone);
          border-radius: 2px;
          transition: background 0.2s ease;
        }
        .pd-feature:hover {
          background: var(--stone-mid);
        }
        .pd-feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: white;
          border-radius: 50%;
          color: var(--gold-dark);
          flex-shrink: 0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }

        /* Stock */
        .pd-stock {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .pd-stock.in-stock { color: #5A9068; }
        .pd-stock.low-stock { color: #C47D2A; }
        .pd-stock.out-of-stock { color: #C0433A; }

        /* CTA buttons */
        .pd-actions {
          display: flex;
          gap: 12px;
          align-items: stretch;
        }

        .pd-btn-cart {
          flex: 1;
          position: relative;
          overflow: hidden;
          background: var(--obsidian);
          color: white;
          border: none;
          padding: 18px 28px;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.4s ease;
          border-radius: 1px;
        }
        .pd-btn-cart::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gold);
          transform: translateX(-101%);
          transition: transform 0.45s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .pd-btn-cart:hover::before,
        .pd-btn-cart.added::before {
          transform: translateX(0);
        }
        .pd-btn-cart span,
        .pd-btn-cart svg {
          position: relative;
          z-index: 1;
        }
        .pd-btn-cart.added {
          pointer-events: none;
        }

        .pd-btn-wish {
          width: 58px;
          flex-shrink: 0;
          background: white;
          border: 1px solid var(--stone-mid);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 1px;
          transition: all 0.3s ease;
          color: var(--text-muted);
        }
        .pd-btn-wish:hover,
        .pd-btn-wish.active {
          border-color: #E8A0A0;
          color: #C0433A;
          background: #FFF5F5;
        }
        .pd-btn-wish.active svg {
          fill: #C0433A;
        }
        .pd-btn-wish svg {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .pd-btn-wish:hover svg {
          transform: scale(1.2);
        }

        /* Gold line decoration */
        .pd-gold-line {
          width: 40px;
          height: 2px;
          background: linear-gradient(to right, var(--gold), var(--gold-light));
          margin: 24px 0 0;
        }

        /* WhatsApp button */
        .pd-btn-whatsapp {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 28px;
          background: white;
          border: 1.5px solid #25D366;
          color: #128C5E;
          border-radius: 1px;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          transition: color 0.4s ease, border-color 0.4s ease;
          margin-top: 12px;
        }
        .pd-btn-whatsapp::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #25D366;
          transform: translateY(101%);
          transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .pd-btn-whatsapp:hover {
          color: white;
          border-color: #25D366;
        }
        .pd-btn-whatsapp:hover::before {
          transform: translateY(0);
        }
        .pd-btn-whatsapp span,
        .pd-btn-whatsapp svg {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }
        .pd-btn-whatsapp:hover svg {
          transform: rotate(-8deg) scale(1.15);
        }

        /* Separator between buttons */
        .pd-or-separator {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 12px;
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .pd-or-separator::before,
        .pd-or-separator::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--stone-mid);
        }

        /* Zoom hint */
        .pd-zoom-hint {
          position: absolute;
          bottom: 16px;
          right: 16px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(8px);
          border: 1px solid var(--stone-mid);
          padding: 6px 12px;
          font-size: 11px;
          font-family: 'Jost', sans-serif;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
          border-radius: 20px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .pd-gallery:hover .pd-zoom-hint {
          opacity: 1;
        }

        /* Image slide animation */
        @keyframes slideIn {
          from { opacity: 0; transform: scale(1.04); }
          to { opacity: 1; transform: scale(1); }
        }
        .pd-main-image.slide-in {
          animation: slideIn 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        /* Info entrance animations */
        .pd-info > * {
          opacity: 0;
          transform: translateY(12px);
        }
        .pd-page.visible .pd-info > * {
          opacity: 1;
          transform: translateY(0);
        }
        .pd-page.visible .pd-info > *:nth-child(1) { transition: opacity 0.6s 0.2s ease, transform 0.6s 0.2s ease; }
        .pd-page.visible .pd-info > *:nth-child(2) { transition: opacity 0.6s 0.3s ease, transform 0.6s 0.3s ease; }
        .pd-page.visible .pd-info > *:nth-child(3) { transition: opacity 0.6s 0.38s ease, transform 0.6s 0.38s ease; }
        .pd-page.visible .pd-info > *:nth-child(4) { transition: opacity 0.6s 0.44s ease, transform 0.6s 0.44s ease; }
        .pd-page.visible .pd-info > *:nth-child(5) { transition: opacity 0.6s 0.5s ease, transform 0.6s 0.5s ease; }
        .pd-page.visible .pd-info > *:nth-child(6) { transition: opacity 0.6s 0.55s ease, transform 0.6s 0.55s ease; }
        .pd-page.visible .pd-info > *:nth-child(7) { transition: opacity 0.6s 0.6s ease, transform 0.6s 0.6s ease; }
        .pd-page.visible .pd-info > *:nth-child(8) { transition: opacity 0.6s 0.65s ease, transform 0.6s 0.65s ease; }
        .pd-page.visible .pd-info > *:nth-child(9) { transition: opacity 0.6s 0.7s ease, transform 0.6s 0.7s ease; }
        .pd-page.visible .pd-info > *:nth-child(10) { transition: opacity 0.6s 0.75s ease, transform 0.6s 0.75s ease; }

        /* Success ripple on cart button */
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(201,169,110,0.5); }
          70% { box-shadow: 0 0 0 12px rgba(201,169,110,0); }
          100% { box-shadow: 0 0 0 0 rgba(201,169,110,0); }
        }
        .pd-btn-cart.added {
          animation: pulse 0.7s ease;
        }

        /* Breadcrumb subtle trust signals */
        .pd-trust {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-top: 16px;
        }
        .pd-trust svg { color: var(--gold); }
      `}</style>

      <div className={`pd-page ${pageVisible ? 'visible' : ''}`}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>

          <button className="pd-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={15} />
            Retour au catalogue
          </button>

          <div className="pd-grid">

            {/* ── Gallery ── */}
            <div className="pd-gallery">
              {/* Main image */}
              <div
                ref={imgRef}
                className={`pd-main-image-wrap ${isZoomed ? 'zoomed' : ''}`}
                onClick={() => setIsZoomed(z => !z)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setIsZoomed(false)}
                style={{ ['--zoom-x' as any]: `${zoomPos.x}%`, ['--zoom-y' as any]: `${zoomPos.y}%` }}
              >
                <img
                  key={selectedIndex}
                  src={images[selectedIndex]}
                  alt={product.name}
                  className={`pd-main-image slide-in ${imageLoaded ? 'loaded' : ''}`}
                  onLoad={() => setImageLoaded(true)}
                />
                {/* Zoom hint */}
                <div className="pd-zoom-hint">
                  <ZoomIn size={12} /> Zoomer
                </div>
              </div>

              {/* Arrow controls */}
              <button className="pd-arrow pd-arrow-left" onClick={prevImage} aria-label="Image précédente">
                <ChevronLeft size={18} />
              </button>
              <button className="pd-arrow pd-arrow-right" onClick={nextImage} aria-label="Image suivante">
                <ChevronRight size={18} />
              </button>

              {/* Thumbnails */}
              <div className="pd-thumbnails">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`pd-thumb ${selectedIndex === i ? 'active' : ''}`}
                    onClick={() => { setSelectedIndex(i); setImageLoaded(false); }}
                    aria-label={`Vue ${i + 1}`}
                  >
                    <img src={img} alt={`Vue ${i + 1}`} />
                  </button>
                ))}
              </div>

              {/* Dot indicators */}
              <div className="pd-dots">
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`pd-dot ${selectedIndex === i ? 'active' : ''}`}
                    onClick={() => setSelectedIndex(i)}
                    aria-label={`Vue ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* ── Info ── */}
            <div className="pd-info">

              <div className="pd-category">
                {product.category.replace('_', ' ')}
              </div>

              <h1 className="pd-title">{product.name}</h1>

              <div className="pd-rating">
                <div className="pd-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < fullStars ? 'currentColor' : 'none'}
                      strokeWidth={i < fullStars ? 0 : 1.5}
                    />
                  ))}
                </div>
                <span className="pd-reviews">
                  <a href="#reviews">({product.reviews} avis clients)</a>
                </span>
              </div>

              <div className="pd-divider" />

              <div className="pd-price">
                {product.price.toLocaleString('fr-FR')}
                <span>FCFA</span>
              </div>

              <p className="pd-description">{product.description}</p>

              {/* Stock status */}
              <div className={`pd-stock ${
                product.stock === 0 ? 'out-of-stock' :
                product.stock <= 3 ? 'low-stock' : 'in-stock'
              }`}>
                {product.stock === 0
                  ? '✕ Rupture de stock'
                  : product.stock <= 3
                  ? `⚠ Plus que ${product.stock} en stock`
                  : `✓ En stock — ${product.stock} disponibles`
                }
              </div>

              {/* CTA */}
              <div className="pd-actions">
                <button
                  className={`pd-btn-cart ${addedToCart ? 'added' : ''}`}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingBag size={18} />
                  <span>{addedToCart ? 'Ajouté au panier ✓' : 'Ajouter au panier'}</span>
                </button>
                <button
                  className={`pd-btn-wish ${isWishlisted ? 'active' : ''}`}
                  onClick={() => setIsWishlisted(w => !w)}
                  aria-label="Ajouter aux favoris"
                >
                  <Heart size={20} />
                </button>
              </div>

              {/* WhatsApp separator */}
              <div className="pd-or-separator">ou</div>

              {/* WhatsApp Button */}
              <button className="pd-btn-whatsapp" onClick={handleWhatsApp}>
                {/* WhatsApp SVG icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Commander via WhatsApp</span>
              </button>

              {/* Features */}
              <div className="pd-features" style={{ marginTop: '24px' }}>
                <div className="pd-feature">
                  <div className="pd-feature-icon"><Truck size={16} /></div>
                  Livraison gratuite à partir de 50 000 FCFA
                </div>
                <div className="pd-feature">
                  <div className="pd-feature-icon"><RefreshCw size={16} /></div>
                  Retours acceptés sous 14 jours
                </div>
                <div className="pd-feature">
                  <div className="pd-feature-icon"><Shield size={16} /></div>
                  Authenticité garantie — Pièce certifiée
                </div>
              </div>

              {/* Trust */}
              <div className="pd-trust">
                <Shield size={12} />
                Paiement 100% sécurisé &nbsp;·&nbsp; SSL Encrypted
              </div>

              <div className="pd-gold-line" />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

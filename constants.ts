import { Product } from './types';

export const CATEGORIES = [
  { id: 'bijoux_femme', label: 'Bijoux Femme', image: 'https://picsum.photos/id/1/800/600' },
  { id: 'montres_homme', label: 'Montres Homme', image: 'https://picsum.photos/id/2/800/600' },
  { id: 'montres_femme', label: 'Montres Femme', image: 'https://picsum.photos/id/3/800/600' },
  { id: 'meches', label: 'Mèches & Extensions', image: 'https://picsum.photos/id/4/800/600' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Collier Perle Rare',
    price: 45000,
    category: 'bijoux_femme',
    description: 'Un collier élégant orné de perles d\'eau douce véritables et d\'une chaîne en or 18 carats. Parfait pour les soirées.',
    image: 'https://picsum.photos/id/106/600/600',
    isNew: true,
    stock: 10,
    rating: 4.8,
    reviews: 12
  },
  {
    id: '2',
    name: 'Montre Chrono Luxe',
    price: 120000,
    category: 'montres_homme',
    description: 'Montre chronographe robuste avec bracelet en cuir véritable. Mouvement suisse de précision.',
    image: 'https://picsum.photos/id/175/600/600',
    isPopular: true,
    stock: 5,
    rating: 4.9,
    reviews: 24
  },
  {
    id: '3',
    name: 'Extensions Bresiliennes Ondulées',
    price: 85000,
    category: 'meches',
    description: 'Mèches brésiliennes 100% cheveux humains, texture ondulée naturelle. Grade 12A, longueur 24 pouces.',
    image: 'https://picsum.photos/id/338/600/600',
    isPopular: true,
    stock: 20,
    rating: 4.7,
    reviews: 45
  },
  {
    id: '4',
    name: 'Montre Élégance Rose Gold',
    price: 95000,
    category: 'montres_femme',
    description: 'Une montre délicate avec cadran nacré et finition or rose. Résistante à l\'eau 3ATM.',
    image: 'https://picsum.photos/id/250/600/600',
    isNew: true,
    stock: 8,
    rating: 4.6,
    reviews: 8
  },
  {
    id: '5',
    name: 'Boucles d\'oreilles Diamant',
    price: 35000,
    category: 'bijoux_femme',
    description: 'Petites puces d\'oreilles en argent sterling serties de zirconiums brillants.',
    image: 'https://picsum.photos/id/112/600/600',
    stock: 50,
    rating: 4.5,
    reviews: 30
  },
  {
    id: '6',
    name: 'Perruque Lace Front Lisse',
    price: 150000,
    category: 'meches',
    description: 'Perruque indétectable lace front, cheveux lisses et soyeux. Densité 180%.',
    image: 'https://picsum.photos/id/64/600/600',
    stock: 3,
    rating: 5.0,
    reviews: 5
  },
  {
    id: '7',
    name: 'Bracelet Homme Acier',
    price: 25000,
    category: 'montres_homme', // Categorized loosely for demo
    description: 'Bracelet masculin en acier inoxydable et fibre de carbone.',
    image: 'https://picsum.photos/id/146/600/600',
    stock: 15,
    rating: 4.2,
    reviews: 10
  },
  {
    id: '8',
    name: 'Parure Mariage Royale',
    price: 200000,
    category: 'bijoux_femme',
    description: 'Ensemble complet collier, boucles d\'oreilles et bracelet pour le grand jour.',
    image: 'https://picsum.photos/id/102/600/600',
    isNew: true,
    stock: 2,
    rating: 5.0,
    reviews: 3
  }
];

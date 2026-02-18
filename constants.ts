import { Product } from './types';

export const CATEGORIES = [
  { id: 'bijoux_femme', label: 'Bijoux Femme', image: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1171&auto=format&fit=crop' },
  { id: 'montres_homme', label: 'Montres Homme', image: 'https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=800&auto=format&fit=crop' },
  { id: 'montres_femme', label: 'Montres Femme', image: 'https://images.unsplash.com/photo-1751437747559-5f5f796dbaae?q=80&w=880&auto=format&fit=crop' },
  { id: 'meches', label: 'Mèches & Extensions', image: 'https://images.unsplash.com/photo-1634315775834-3e1ac73de6b6?q=80&w=1170&auto=format&fit=crop' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Collier Perle Rare',
    price: 45000,
    category: 'bijoux_femme',
    description: 'Un collier élégant orné de perles d\'eau douce véritables et d\'une chaîne en or 18 carats. Parfait pour les soirées.',
    image: 'https://plus.unsplash.com/premium_photo-1674255466849-b23fc5f5d3eb?q=80&w=687&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://plus.unsplash.com/premium_photo-1671826911836-abe722018155?q=80&w=687&auto=format&fit=crop',
    stock: 3,
    rating: 5.0,
    reviews: 5
  },
  {
    id: '7',
    name: 'Bracelet Homme Acier',
    price: 25000,
    category: 'montres_homme',
    description: 'Bracelet masculin en acier inoxydable et fibre de carbone.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop',
    stock: 15,
    rating: 4.2,
    reviews: 10,
    isPopular: true
  },
  {
    id: '8',
    name: 'Parure Mariage Royale',
    price: 200000,
    category: 'bijoux_femme',
    description: 'Ensemble complet collier, boucles d\'oreilles et bracelet pour le grand jour.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop',
    isNew: true,
    stock: 2,
    rating: 5.0,
    reviews: 3
  },
  {
    id: '9',
    name: 'Bague Saphir Éternité',
    price: 75000,
    category: 'bijoux_femme',
    description: 'Bague en or blanc sertie d\'un saphir bleu profond entouré de diamants.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
    isPopular: true,
    isNew: true,
    stock: 7,
    rating: 4.9,
    reviews: 18
  },
  {
    id: '10',
    name: 'Montre Aviateur Vintage',
    price: 180000,
    category: 'montres_homme',
    description: 'Style rétro avec bracelet en cuir vieilli et cadran complexe.',
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&auto=format&fit=crop',
    isPopular: true,
    stock: 4,
    rating: 4.8,
    reviews: 40
  },
  {
    id: '11',
    name: 'Extensions Kinky Curly',
    price: 65000,
    category: 'meches',
    description: 'Volume maximal avec ces extensions afro kinky curly. 20 pouces.',
    image: 'https://images.unsplash.com/photo-1560264641-1b5191cc63e2?q=80&w=687&auto=format&fit=crop',
    isNew: true,
    stock: 25,
    rating: 4.5,
    reviews: 15
  },
  {
    id: '12',
    name: 'Manchette Dorée',
    price: 30000,
    category: 'bijoux_femme',
    description: 'Large bracelet manchette au design géométrique moderne.',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop',
    isPopular: true,
    stock: 12,
    rating: 4.3,
    reviews: 9
  },
  {
    id: '13',
    name: 'Montre Minimaliste Noire',
    price: 85000,
    category: 'montres_homme',
    description: 'Design épuré tout noir, ultra fine et élégante.',
    image: 'https://images.unsplash.com/photo-1495856458515-0637185db551?q=80&w=600&auto=format&fit=crop',
    isNew: true,
    stock: 10,
    rating: 4.6,
    reviews: 22
  },
  {
    id: '14',
    name: 'Chaine de Cheville Or',
    price: 15000,
    category: 'bijoux_femme',
    description: 'Délicate chaine de cheville pour l\'été.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop',
    isNew: true,
    stock: 40,
    rating: 4.4,
    reviews: 6
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah K.",
    role: "Cliente Fidèle",
    location: "Abidjan, Cocody",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
    text: "J'ai commandé la parure de mariage pour ma cérémonie traditionnelle. La qualité est exceptionnelle et la livraison a été faite en moins de 24h. Je recommande vivement !",
    rating: 5
  },
  {
    id: 2,
    name: "Marc Andre",
    role: "Amateur de montres",
    location: "Dakar, Sénégal",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    text: "La montre Chrono Luxe est encore plus belle en vrai. Le service client m'a aidé à choisir le bon modèle. Très professionnel.",
    rating: 5
  },
  {
    id: 3,
    name: "Aïcha Traoré",
    role: "Influenceuse Mode",
    location: "Bamako, Mali",
    image: "https://images.unsplash.com/photo-1589156191108-c762ff0b9655?q=80&w=200&auto=format&fit=crop",
    text: "Les mèches brésiliennes sont d'une douceur incroyable. Pas de perte, pas de nœuds. C'est ma troisième commande chez Lumière & Éclat.",
    rating: 4
  },
  {
    id: 4,
    name: "Jean-Paul B.",
    role: "Entrepreneur",
    location: "Abidjan, Marcory",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    text: "Le bracelet en acier est parfait. Emballage soigné, idéal pour un cadeau. Merci pour votre sérieux.",
    rating: 5
  }
];

export const LOOKBOOK_IMAGES = [
  { id: 1, image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop", likes: 124 },
  { id: 2, image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop", likes: 89 },
  { id: 3, image: "https://images.unsplash.com/photo-1713181215534-3b46c62e2018?q=80&w=1042&auto=format&fit=crop", likes: 256 },
  { id: 4, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop", likes: 142 },
];
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'bijoux_femme' | 'montres_homme' | 'montres_femme' | 'meches';
  description: string;
  image: string;
  isNew?: boolean;
  isPopular?: boolean;
  stock: number;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortOption = 'price_asc' | 'price_desc' | 'popularity' | 'newest';

export interface User {
  email: string;
  name: string;
  username?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Contenu HTML riche
  category: string;
  date: string;
  image: string;
  author: string;
  readTime: string;
}
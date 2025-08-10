export interface Category {
  id: number;
  name: string;
  avatar: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
}

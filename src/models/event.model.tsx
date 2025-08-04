export interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  category: Category;
  phone: string;
  email: string;
  location: string;
}

export type Category = typeof categories[number];

export const categories = [
    'Sport',
    'Kultura', 
    'Edukacja',
    'Rozrywka',
    'Zdrowie',
    'Inne'
] as const;
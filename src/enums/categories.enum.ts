export type Category = typeof categories[number];

export const categories = [
    'Sport',
    'Kultura',
    'Edukacja',
    'Rozrywka',
    'Zdrowie',
    'Inne'
] as const;
export const products = [
  {
    id: 1,
    name: "Lápiz HB",
    description: "Lápiz grafito HB de alta calidad",
    price: 50,
    category: "libreria",
    image: "https://placehold.co/300x200?text=Lápiz",
    stock: 100
  },
  {
    id: 2,
    name: "Cuaderno A4",
    description: "Cuaderno rayado A4 100 hojas",
    price: 200,
    category: "escolar",
    image: "https://placehold.co/300x200?text=Cuaderno",
    stock: 50
  },
  {
    id: 3,
    name: "Resaltador",
    description: "Resaltador fluorescente",
    price: 80,
    category: "libreria",
    image: "https://placehold.co/300x200?text=Resaltador",
    stock: 75
  },
  {
    id: 4,
    name: "Calculadora",
    description: "Calculadora científica",
    price: 1500,
    category: "escolar",
    image: "https://placehold.co/300x200?text=Calculadora",
    stock: 30
  },
  {
    id: 5,
    name: "Cartuchera",
    description: "Cartuchera triple cierre",
    price: 600,
    category: "escolar",
    image: "https://placehold.co/300x200?text=Cartuchera",
    stock: 40
  },
  {
    id: 6,
    name: "Goma de borrar",
    description: "Goma de borrar blanca",
    price: 30,
    category: "libreria",
    image: "https://placehold.co/300x200?text=Goma",
    stock: 120
  },
  {
    id: 7,
    name: "Regla 30cm",
    description: "Regla plástica de 30cm",
    price: 90,
    category: "escolar",
    image: "https://placehold.co/300x200?text=Regla",
    stock: 60
  },
  {
    id: 8,
    name: "Tijera escolar",
    description: "Tijera punta redonda para niños",
    price: 110,
    category: "escolar",
    image: "https://placehold.co/300x200?text=Tijera",
    stock: 80
  },
  {
    id: 9,
    name: "Marcador permanente",
    description: "Marcador indeleble negro",
    price: 70,
    category: "libreria",
    image: "https://placehold.co/300x200?text=Marcador",
    stock: 90
  },
  {
    id: 10,
    name: "Pegamento escolar",
    description: "Pegamento en barra no tóxico",
    price: 60,
    category: "escolar",
    image: "https://placehold.co/300x200?text=Pegamento",
    stock: 100
  },
  {
    id: 11,
    name: "Compás metálico",
    description: "Compás para dibujo técnico",
    price: 250,
    category: "libreria",
    image: "https://placehold.co/300x200?text=Compás",
    stock: 35
  },
  {
    id: 12,
    name: "Set de geometría",
    description: "Set con regla, escuadra y transportador",
    price: 180,
    category: "escolar",
    image: "https://placehold.co/300x200?text=Geometría",
    stock: 45
  },
  {
    id: 13,
    name: "Bolígrafo azul",
    description: "Bolígrafo tinta azul retráctil",
    price: 40,
    category: "libreria",
    image: "https://placehold.co/300x200?text=Bolígrafo",
    stock: 200
  }
];

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};

export const getProductById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find(product => product.id === parseInt(id)));
    }, 500);
  });
};

export const getProductsByCategory = (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.filter(product => product.category === category));
    }, 500);
  });
}; 
// Define the product interface
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
  contactInfo?: string;
  location?: string;
  publishedDate?: string;
}

// Sample data - in a real app, this would come from a database
const sampleProducts: Product[] = [
  { 
    id: 1, 
    name: "Bicicleta", 
    description: "Bicicleta en buen estado, ideal para la ciudad. Marca Trek, modelo urbano con canasto frontal y luces LED. Color azul marino, tamaño mediano. Incluye candado y bomba de aire manual. Apenas 2 años de uso, siempre guardada en interior.",
    price: "$100",
    imageUrl: "https://placehold.co/600x400/4299e1/ffffff?text=Bicicleta",
    category: "Deportes y Aire Libre",
    contactInfo: "juan@ejemplo.com",
    location: "Ciudad de México",
    publishedDate: "2023-05-15"
  },
  { 
    id: 2, 
    name: "Librería personal", 
    description: "Colección de libros, ideal para comenzar un hobby. Más de 50 títulos de literatura clásica y contemporánea. Autores como García Márquez, Borges, Cortázar, Allende, entre otros. Todos en excelente estado, algunos son ediciones especiales.",
    price: "$50",
    imageUrl: "https://placehold.co/600x400/a0aec0/ffffff?text=Libros",
    category: "Libros y Entretenimiento",
    contactInfo: "maria@ejemplo.com",
    location: "Guadalajara",
    publishedDate: "2023-05-18"
  },
  { 
    id: 3, 
    name: "Televisor LED 32\"", 
    description: "Televisor en perfecto estado, HDMI y USB. Marca Samsung, modelo Smart TV con acceso a Netflix, Prime Video y otras aplicaciones. Resolución Full HD, sonido envolvente. Incluye control remoto y base para pared.",
    price: "$150",
    imageUrl: "https://placehold.co/600x400/38b2ac/ffffff?text=Televisor",
    category: "Electrónica",
    contactInfo: "pedro@ejemplo.com",
    location: "Monterrey",
    publishedDate: "2023-05-20"
  },
  { 
    id: 4, 
    name: "Juego de sofá", 
    description: "Sofá de 3 plazas y sillón, color beige.",
    price: "$200",
    imageUrl: "https://placehold.co/600x400/ed8936/ffffff?text=Sof%C3%A1",
    category: "Muebles",
    contactInfo: "ana@ejemplo.com",
    location: "Ciudad de México",
    publishedDate: "2023-05-17"
  },
  { 
    id: 5, 
    name: "Escritorio", 
    description: "Escritorio de madera con cajones.",
    price: "$80",
    imageUrl: "https://placehold.co/600x400/9f7aea/ffffff?text=Escritorio",
    category: "Muebles",
    contactInfo: "luis@ejemplo.com",
    location: "Querétaro",
    publishedDate: "2023-05-22"
  },
  { 
    id: 6, 
    name: "Batería de cocina", 
    description: "Juego completo de ollas y sartenes.",
    price: "$75",
    imageUrl: "https://placehold.co/600x400/667eea/ffffff?text=Cocina",
    category: "Hogar y Cocina",
    contactInfo: "carmen@ejemplo.com",
    location: "Puebla",
    publishedDate: "2023-05-14"
  },
  { 
    id: 7, 
    name: "Guitarra acústica", 
    description: "Guitarra con funda, bien cuidada.",
    price: "$120",
    imageUrl: "https://placehold.co/600x400/f6993f/ffffff?text=Guitarra",
    category: "Libros y Entretenimiento",
    contactInfo: "roberto@ejemplo.com",
    location: "Ciudad de México",
    publishedDate: "2023-05-19"
  },
  { 
    id: 8, 
    name: "Mesa de comedor", 
    description: "Mesa extensible con 4 sillas.",
    price: "$180",
    imageUrl: "https://placehold.co/600x400/4fd1c5/ffffff?text=Mesa",
    category: "Muebles",
    contactInfo: "sofia@ejemplo.com",
    location: "Monterrey",
    publishedDate: "2023-05-16"
  }
];

// Simulate local storage
let products = [...sampleProducts];

// Product Service API
const ProductService = {
  // Get all products
  getProducts: (): Product[] => {
    return products;
  },

  // Get product by ID
  getProductById: (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  },

  // Add a new product
  addProduct: (product: Omit<Product, 'id'>): Product => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProduct = { 
      ...product, 
      id: newId,
      publishedDate: new Date().toISOString().split('T')[0] 
    };
    
    products = [...products, newProduct];
    return newProduct;
  },

  // Delete a product
  deleteProduct: (id: number): boolean => {
    const initialLength = products.length;
    products = products.filter(product => product.id !== id);
    return products.length !== initialLength;
  },

  // Update a product
  updateProduct: (id: number, updates: Partial<Product>): Product | null => {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) return null;
    
    const updatedProduct = { ...products[index], ...updates };
    products = [
      ...products.slice(0, index),
      updatedProduct,
      ...products.slice(index + 1)
    ];
    
    return updatedProduct;
  },

  // Get unique categories
  getCategories: (): string[] => {
    return Array.from(new Set(products.map(product => product.category)));
  },

  // Search products
  searchProducts: (query: string): Product[] => {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm)
    );
  },

  // Filter products by category
  filterByCategory: (category: string): Product[] => {
    if (category === "Todas" || !category) return products;
    return products.filter(product => product.category === category);
  },

  // Get related products
  getRelatedProducts: (productId: number, limit: number = 3): Product[] => {
    const product = products.find(p => p.id === productId);
    if (!product) return [];
    
    return products
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, limit);
  }
};

export default ProductService; 
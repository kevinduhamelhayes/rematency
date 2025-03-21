import { ProductList } from "@/components/ProductList";

// Sample data - in a real app, this would come from a database
const sampleProducts = [
  { 
    id: 1, 
    name: "Bicicleta", 
    description: "Bicicleta en buen estado, ideal para la ciudad.", 
    price: "$100",
    imageUrl: "/images/products/bicycle.jpg" 
  },
  { 
    id: 2, 
    name: "Librería personal", 
    description: "Colección de libros, ideal para comenzar un hobby.", 
    price: "$50",
    imageUrl: "/images/products/books.jpg" 
  },
  { 
    id: 3, 
    name: "Televisor LED 32\"", 
    description: "Televisor en perfecto estado, HDMI y USB.", 
    price: "$150",
    imageUrl: "/images/products/tv.jpg" 
  },
  { 
    id: 4, 
    name: "Juego de sofá", 
    description: "Sofá de 3 plazas y sillón, color beige.", 
    price: "$200",
    imageUrl: "/images/products/sofa.jpg" 
  },
  { 
    id: 5, 
    name: "Escritorio", 
    description: "Escritorio de madera con cajones.", 
    price: "$80",
    imageUrl: "/images/products/desk.jpg" 
  },
  { 
    id: 6, 
    name: "Batería de cocina", 
    description: "Juego completo de ollas y sartenes.", 
    price: "$75",
    imageUrl: "/images/products/cookware.jpg" 
  },
  { 
    id: 7, 
    name: "Guitarra acústica", 
    description: "Guitarra con funda, bien cuidada.", 
    price: "$120",
    imageUrl: "/images/products/guitar.jpg" 
  },
  { 
    id: 8, 
    name: "Mesa de comedor", 
    description: "Mesa extensible con 4 sillas.", 
    price: "$180",
    imageUrl: "/images/products/table.jpg" 
  }
];

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-10 text-center">
        <h1 className="mb-4 text-3xl font-bold">Productos en Venta</h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Explora nuestra selección de productos disponibles. Cada objeto cuenta una historia y 
          puede ser el comienzo de nuevas oportunidades para ti.
        </p>
      </section>

      <section className="mb-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex gap-3">
            <select className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">Ordenar por</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="name-asc">Nombre: A-Z</option>
              <option value="name-desc">Nombre: Z-A</option>
            </select>
          </div>
        </div>
        <ProductList products={sampleProducts} />
      </section>
    </main>
  );
} 
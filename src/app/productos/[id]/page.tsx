import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ImageWithFallback";

// Sample data - in a real app, this would come from a database
const sampleProducts = [
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
  }
];

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  // In a real app, you would fetch the product from a database using the id
  const productId = parseInt(params.id);
  const product = sampleProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-3xl font-bold">Producto no encontrado</h1>
          <p className="mb-6 text-gray-600">
            El producto que estás buscando no existe o ha sido eliminado.
          </p>
          <Link href="/productos">
            <Button>Ver todos los productos</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/productos" className="text-blue-600 hover:text-blue-800">
          ← Volver a productos
        </Link>
      </div>
      
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative min-h-[300px] overflow-hidden rounded-lg bg-gray-100 md:min-h-[450px]">
            <ImageWithFallback
              src={product.imageUrl || ''}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <div>
            <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
            <p className="mb-4 text-2xl font-bold text-blue-600">{product.price}</p>
            
            <div className="mb-6 space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Descripción</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold">Categoría</h2>
                <p className="text-gray-700">{product.category}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold">Ubicación</h2>
                <p className="text-gray-700">{product.location}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold">Publicado el</h2>
                <p className="text-gray-700">{product.publishedDate}</p>
              </div>
            </div>
            
            <div className="mb-6 rounded-lg bg-blue-50 p-4">
              <h2 className="mb-2 text-lg font-semibold">Contactar al vendedor</h2>
              <p className="text-gray-800">{product.contactInfo}</p>
            </div>
            
            <div className="flex gap-4">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                Contactar
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Guardar
              </Button>
            </div>

            <div className="mt-8">
              <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600">
                "Cada objeto cuenta una historia; vende y comparte la tuya."
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Productos similares</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {sampleProducts
            .filter((p) => p.id !== product.id)
            .map((p) => (
              <Link href={`/productos/${p.id}`} key={p.id}>
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative mb-3 h-48 w-full overflow-hidden rounded-md">
                    <ImageWithFallback
                      src={p.imageUrl || ''}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{p.name}</h3>
                  <p className="text-lg font-bold text-blue-600">{p.price}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
} 
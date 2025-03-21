import { ProductList } from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Sample data - in a real app, this would come from a database
const sampleProducts = [
  { 
    id: 1, 
    name: "Bicicleta", 
    description: "Bicicleta en buen estado, ideal para la ciudad.", 
    price: "$100",
    imageUrl: "https://placehold.co/600x400/4299e1/ffffff?text=Bicicleta" 
  },
  { 
    id: 2, 
    name: "Librería personal", 
    description: "Colección de libros, ideal para comenzar un hobby.", 
    price: "$50",
    imageUrl: "https://placehold.co/600x400/a0aec0/ffffff?text=Libros" 
  },
  { 
    id: 3, 
    name: "Televisor LED 32\"", 
    description: "Televisor en perfecto estado, HDMI y USB.", 
    price: "$150",
    imageUrl: "https://placehold.co/600x400/38b2ac/ffffff?text=Televisor" 
  },
  { 
    id: 4, 
    name: "Juego de sofá", 
    description: "Sofá de 3 plazas y sillón, color beige.", 
    price: "$200",
    imageUrl: "https://placehold.co/600x400/ed8936/ffffff?text=Sof%C3%A1" 
  }
];

const inspirationalQuotes = [
  "Transforma el adiós en nuevas oportunidades.",
  "Cada objeto cuenta una historia; vende y comparte la tuya.",
  "Despídete de lo viejo con gratitud y da la bienvenida a nuevas oportunidades.",
  "Haz espacio para lo nuevo: Vende lo que ya no necesitas y emprende tu aventura."
];

export default function HomePage() {
  return (
    <main className="flex flex-col gap-8">
      <section className="relative bg-blue-600 py-16 text-center text-white">
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
            Venta de Garage: Todo para un Nuevo Comienzo
          </h1>
          <p className="mb-6 text-lg sm:text-xl">
            Vende lo que ya no necesitas antes de emprender una nueva aventura.
          </p>
          <Link href="/publicar">
            <Button className="bg-white px-6 py-3 text-blue-600 hover:bg-gray-100">
              Publica tu producto
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8" id="inspiracion">
        <div className="grid gap-4 md:grid-cols-2">
          {inspirationalQuotes.map((quote, index) => (
            <blockquote 
              key={index}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <p className="text-lg italic text-gray-700">"{quote}"</p>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8" id="productos">
        <h2 className="mb-8 text-center text-3xl font-bold">Productos en Venta</h2>
        <ProductList products={sampleProducts} />
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
}

export function ProductCard({ id, name, description, price, imageUrl }: ProductProps) {
  return (
    <div className="product-card rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {imageUrl && (
        <div className="relative mb-3 h-48 w-full overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <h3 className="mb-2 text-xl font-semibold">{name}</h3>
      <p className="mb-3 text-gray-600 line-clamp-2">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-blue-600">{price}</span>
        <Link href={`/productos/${id}`}>
          <Button>Ver detalles</Button>
        </Link>
      </div>
    </div>
  );
} 
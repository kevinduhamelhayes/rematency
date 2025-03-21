"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductService, { Product } from '@/services/ProductService';
import ImageWithFallback from '@/components/ImageWithFallback';
import { FaArrowRight, FaTag, FaSearch, FaStar } from 'react-icons/fa';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Get all products and categories from the service
    const allProducts = ProductService.getProducts();
    const allCategories = ProductService.getCategories();
    
    // Select featured products (just get the first 4 for now)
    const featured = allProducts.slice(0, 4);
    
    setFeaturedProducts(featured);
    setCategories(allCategories);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to products page with search query
      window.location.href = `/productos?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-100 to-white py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                Venta de Garage: Tu destino para comprar y vender
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                ¿Te mudas? ¿Emigras? Dale una nueva vida a tus objetos y encuentra tesoros a precios increíbles.
              </p>
              
              <form onSubmit={handleSearch} className="mb-8 relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full py-4 px-6 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    <FaSearch />
                  </button>
                </div>
              </form>
              
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <Link
                  href="/productos"
                  className="py-3 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center justify-center transition-colors"
                >
                  Explorar productos <FaArrowRight className="ml-2" />
                </Link>
                <Link
                  href="/publicar"
                  className="py-3 px-8 bg-white hover:bg-gray-100 text-indigo-600 font-medium rounded-lg border border-indigo-600 flex items-center justify-center transition-colors"
                >
                  Vender un artículo
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <Image
                src="/images/hero-image.jpg"
                alt="Venta de Garage - Compra y vende con facilidad"
                width={600}
                height={400}
                className="rounded-xl shadow-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Productos Destacados</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre algunos de los objetos más interesantes que puedes encontrar en nuestra plataforma.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link href={`/productos/${product.id}`} key={product.id}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 relative">
                    <div className="absolute top-0 right-0 z-10 bg-yellow-400 text-xs text-gray-900 font-bold py-1 px-3 rounded-bl-lg flex items-center">
                      <FaStar className="mr-1" /> Destacado
                    </div>
                    <ImageWithFallback
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      fallbackSrc="/images/placeholder.jpg"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                      <span className="text-lg font-bold text-indigo-600">{product.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center">
                        <FaTag className="mr-1" /> {product.category}
                      </span>
                      {product.location && (
                        <span className="text-xs text-gray-500">{product.location}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              href="/productos"
              className="py-3 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg inline-flex items-center transition-colors"
            >
              Ver todos los productos <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Explora por Categoría</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Encuentra exactamente lo que buscas navegando por nuestras categorías.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                href={`/productos?category=${encodeURIComponent(category)}`}
                key={category}
                className="bg-white rounded-lg shadow-sm hover:shadow-md p-6 text-center transition-shadow duration-300"
              >
                <h3 className="text-lg font-medium text-gray-800 mb-2">{category}</h3>
                <p className="text-sm text-gray-500">Ver productos</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Cómo Funciona?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Vender o comprar en Venta de Garage es fácil y seguro. Sigue estos sencillos pasos:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 h-16 w-16 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Publicar o Buscar</h3>
              <p className="text-gray-600">
                Publica tus artículos con fotos y una descripción detallada, o busca entre nuestros productos disponibles.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 h-16 w-16 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Contactar</h3>
              <p className="text-gray-600">
                Ponte en contacto con el vendedor o comprador para acordar los detalles de la venta.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 h-16 w-16 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Completar la Venta</h3>
              <p className="text-gray-600">
                Realiza el intercambio en persona en un lugar seguro o coordina el envío según lo acordado.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 bg-indigo-600 text-white">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Cada objeto tiene una historia. Vende los tuyos y descubre nuevos tesoros.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link
              href="/publicar"
              className="py-3 px-8 bg-white hover:bg-gray-100 text-indigo-600 font-medium rounded-lg transition-colors"
            >
              Vender un artículo
            </Link>
            <Link
              href="/productos"
              className="py-3 px-8 bg-indigo-800 hover:bg-indigo-900 text-white font-medium rounded-lg transition-colors"
            >
              Explorar productos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

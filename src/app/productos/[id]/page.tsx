"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ProductService, { Product } from '@/services/ProductService';
import ImageWithFallback from '@/components/ImageWithFallback';
import { FaMapMarkerAlt, FaCalendarAlt, FaTag, FaEnvelope, FaArrowLeft, FaShare } from 'react-icons/fa';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = Number(params.id);
    if (isNaN(id)) {
      setError('ID de producto inválido');
      setLoading(false);
      return;
    }

    const foundProduct = ProductService.getProductById(id);
    if (!foundProduct) {
      setError('Producto no encontrado');
      setLoading(false);
      return;
    }

    setProduct(foundProduct);
    setRelatedProducts(ProductService.getRelatedProducts(id, 4));
    setLoading(false);
  }, [params.id]);

  // Handle loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse space-y-8 w-full max-w-4xl">
          <div className="h-64 bg-gray-300 rounded-lg"></div>
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-xl mx-auto">
          <h1 className="text-2xl text-red-600 font-bold mb-4">{error}</h1>
          <p className="text-gray-600 mb-6">Lo sentimos, no pudimos encontrar el producto que estás buscando.</p>
          <Link href="/productos" className="bg-indigo-600 text-white px-6 py-3 rounded-lg inline-flex items-center">
            <FaArrowLeft className="mr-2" /> Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-indigo-600">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/productos" className="hover:text-indigo-600">Productos</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg shadow-md p-4 h-[400px] lg:h-[500px] relative">
          <ImageWithFallback
            src={product.imageUrl}
            alt={product.name}
            fill
            style={{ objectFit: 'contain' }}
            fallbackSrc="/images/placeholder.jpg"
            className="rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold text-indigo-600">{product.price}</span>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="prose prose-indigo max-w-none">
              <p className="mb-4 text-gray-700">{product.description}</p>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Detalles del anuncio</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <FaTag className="mr-2 text-indigo-500" />
                <span>Categoría: <span className="font-medium">{product.category}</span></span>
              </div>
              
              {product.location && (
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                  <span>Ubicación: <span className="font-medium">{product.location}</span></span>
                </div>
              )}
              
              {product.publishedDate && (
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-indigo-500" />
                  <span>Publicado: <span className="font-medium">{product.publishedDate}</span></span>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contactar al vendedor</h3>
            {product.contactInfo ? (
              <div className="flex items-center text-gray-600">
                <FaEnvelope className="mr-2 text-indigo-500" />
                <span>{product.contactInfo}</span>
              </div>
            ) : (
              <p className="text-gray-600">Información de contacto no disponible.</p>
            )}
          </div>
          
          <div className="mt-8 flex space-x-4">
            <Link href="/productos" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg flex items-center">
              <FaArrowLeft className="mr-2" /> Volver
            </Link>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center">
              <FaShare className="mr-2" /> Compartir
            </button>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link href={`/productos/${relatedProduct.id}`} key={relatedProduct.id}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 relative">
                    <ImageWithFallback
                      src={relatedProduct.imageUrl}
                      alt={relatedProduct.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      fallbackSrc="/images/placeholder.jpg"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{relatedProduct.name}</h3>
                      <span className="text-lg font-bold text-indigo-600">{relatedProduct.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                        {relatedProduct.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 
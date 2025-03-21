"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductService, { Product } from '@/services/ProductService';
import ImageWithFallback from '@/components/ImageWithFallback';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Initialize products and categories
  useEffect(() => {
    const allProducts = ProductService.getProducts();
    const allCategories = ProductService.getCategories();
    
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    setCategories(allCategories);
  }, []);

  // Apply filters and sorting when dependencies change
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory && selectedCategory !== 'Todas') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply sorting
    if (sortOption) {
      switch (sortOption) {
        case 'price-asc':
          result.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
            const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));
            return priceA - priceB;
          });
          break;
        case 'price-desc':
          result.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
            const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));
            return priceB - priceA;
          });
          break;
        case 'newest':
          result.sort((a, b) => {
            if (!a.publishedDate || !b.publishedDate) return 0;
            return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
          });
          break;
      }
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, sortOption, products]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Productos Disponibles</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Search Input */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Buscar productos
            </label>
            <input
              type="text"
              id="search"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ej: Bicicleta, Televisor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              id="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          {/* Sort Options */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
              Ordenar por
            </label>
            <select
              id="sort"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Más relevantes</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="newest">Más recientes</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link href={`/productos/${product.id}`} key={product.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 relative">
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
                    <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                    <span className="text-lg font-bold text-indigo-600">{product.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    {product.location && (
                      <span className="text-xs text-gray-500">{product.location}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-xl text-gray-600">No se encontraron productos que coincidan con tu búsqueda.</p>
            <p className="mt-2 text-indigo-600">Intenta con otros términos o categorías.</p>
          </div>
        )}
      </div>
    </div>
  );
} 
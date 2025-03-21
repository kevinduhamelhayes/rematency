"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProductService from '@/services/ProductService';
import { FaCamera, FaCheck, FaUpload } from 'react-icons/fa';

export default function PublicarPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    contactInfo: '',
    location: '',
    imageUrl: ''
  });
  
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newProductId, setNewProductId] = useState<number | null>(null);

  // Get categories from ProductService
  const categories = ProductService.getCategories();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // For demonstration purposes, we'll use a placeholder image
    // In a real app, you'd upload the file to a server
    setFormData(prev => ({
      ...prev,
      imageUrl: `https://placehold.co/600x400/4299e1/ffffff?text=${encodeURIComponent(file.name)}`
    }));

    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Clear error when field is edited
    if (errors.imageUrl) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.imageUrl;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del producto es obligatorio';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'El precio es obligatorio';
    } else if (!/^\$?\d+(\.\d{1,2})?$/.test(formData.price.replace(/\s/g, ''))) {
      newErrors.price = 'El precio debe ser un número válido';
    }
    
    if (!formData.category) {
      newErrors.category = 'La categoría es obligatoria';
    }
    
    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = 'La información de contacto es obligatoria';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactInfo)) {
      newErrors.contactInfo = 'Introduce un correo electrónico válido';
    }
    
    if (!formData.imageUrl) {
      newErrors.imageUrl = 'La imagen del producto es obligatoria';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Ensure price has $ prefix
      const price = formData.price.startsWith('$') 
        ? formData.price 
        : `$${formData.price}`;
      
      // Add the product using the service
      const newProduct = ProductService.addProduct({
        name: formData.name,
        description: formData.description,
        price: price,
        category: formData.category,
        contactInfo: formData.contactInfo,
        location: formData.location,
        imageUrl: formData.imageUrl
      });
      
      setNewProductId(newProduct.id);
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Error adding product:', error);
      setErrors({ submit: 'Error al publicar el producto. Inténtalo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && newProductId) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
              <FaCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">¡Producto publicado con éxito!</h1>
            <p className="text-gray-600 mt-2">
              Tu producto ha sido añadido y ya está disponible para que otros usuarios lo vean.
            </p>
          </div>
          
          <div className="flex flex-col space-y-4">
            <Link 
              href={`/productos/${newProductId}`}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg text-center font-medium"
            >
              Ver mi producto
            </Link>
            <Link 
              href="/productos"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg text-center font-medium"
            >
              Ver todos los productos
            </Link>
            <button 
              onClick={() => {
                setFormData({
                  name: '',
                  description: '',
                  price: '',
                  category: '',
                  contactInfo: '',
                  location: '',
                  imageUrl: ''
                });
                setFilePreview(null);
                setErrors({});
                setIsSubmitted(false);
                setNewProductId(null);
              }}
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg text-center font-medium"
            >
              Publicar otro producto
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Publicar un producto</h1>
        <p className="text-gray-600 mb-8">
          Completa el formulario para poner a la venta tu producto en Venta de Garage.
        </p>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del producto *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: Bicicleta de montaña"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe tu producto, incluye detalles como estado, marca, modelo, etc."
              />
              {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
            </div>
            
            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Precio *
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: 100"
              />
              {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
            </div>
            
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecciona una categoría</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
            </div>
            
            {/* Contact Info */}
            <div>
              <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">
                Información de contacto *
              </label>
              <input
                type="email"
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.contactInfo ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: tu@correo.com"
              />
              {errors.contactInfo && <p className="mt-1 text-sm text-red-500">{errors.contactInfo}</p>}
            </div>
            
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ej: Ciudad de México"
              />
            </div>
            
            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foto del producto *
              </label>
              <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                errors.imageUrl ? 'border-red-500' : 'border-gray-300'
              }`}>
                <div className="space-y-1 text-center">
                  {filePreview ? (
                    <div className="relative mx-auto w-32 h-32 mb-4">
                      <img 
                        src={filePreview} 
                        alt="Vista previa" 
                        className="mx-auto h-32 w-32 object-cover rounded-md"
                      />
                    </div>
                  ) : (
                    <FaCamera className="mx-auto h-12 w-12 text-gray-400" />
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <span>Sube una foto</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">o arrastra y suelta</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF hasta 10MB
                  </p>
                </div>
              </div>
              {errors.imageUrl && <p className="mt-1 text-sm text-red-500">{errors.imageUrl}</p>}
            </div>
          </div>
          
          {errors.submit && (
            <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-md">
              {errors.submit}
            </div>
          )}
          
          <div className="mt-8 flex justify-end">
            <Link
              href="/"
              className="mr-4 px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex justify-center items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publicando...
                </>
              ) : (
                <>
                  <FaUpload className="mr-2" />
                  Publicar producto
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
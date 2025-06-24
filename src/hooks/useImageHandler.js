import { useState } from 'react';
import { createCardPlaceholder, createDetailPlaceholder } from '@/utils/placeholderUtils';

/**
 * Hook personalizado para manejo de imágenes con placeholder fallback
 * Elimina duplicación de lógica entre Item e ItemDetail (DRY principle)
 * 
 * @param {string} productName - Nombre del producto para generar placeholder apropiado
 * @param {string} placeholderType - Tipo de placeholder ('card' | 'detail')
 * @returns {object} Estado y handlers para manejo de imágenes
 */
export const useImageHandler = (productName, placeholderType = 'card') => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Generar placeholder apropiado según el tipo
  const getPlaceholderImage = () => {
    return placeholderType === 'detail' 
      ? createDetailPlaceholder(productName)
      : createCardPlaceholder(productName);
  };

  // Manejar errores de imagen
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  // Manejar carga exitosa de imagen
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Resetear estado de imagen (útil para cambios de producto)
  const resetImageState = () => {
    setImageError(false);
    setImageLoading(true);
  };

  return {
    imageError,
    imageLoading,
    placeholderImage: getPlaceholderImage(),
    handleImageError,
    handleImageLoad,
    resetImageState
  };
}; 
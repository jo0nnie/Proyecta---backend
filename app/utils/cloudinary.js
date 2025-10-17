import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// Configuración de Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Función para subir imágenes
export async function uploadImage(ruta) {
  if (typeof ruta === 'string' && ruta.startsWith('http')) {
    // es una URL
    return await cloudinary.uploader.upload(ruta, { folder: 'emprendimientos' });
  }

  // es un archivo local
  return await cloudinary.uploader.upload(ruta, { folder: 'emprendimientos' });
}
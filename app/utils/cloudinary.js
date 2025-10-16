import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
//configuracion de cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
//mi funcion para subir imagenes
export async function uploadImage(imagen) {
  // si es una URL valida, la sube directamente
  if (typeof imagen === 'string' && imagen.startsWith('http')) {
    return await cloudinary.uploader.upload(imagen, {
      folder: 'emprendimientos',
    });
  }

  // si es un archivo local (tempFilePath)
  return await cloudinary.uploader.upload(imagen.tempFilePath, {
    folder: 'emprendimientos',
  });
}

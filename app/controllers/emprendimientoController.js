import { CrearEmprendimiento, EliminarEmprendimiento, ObtenerEmprendimientos, ObtenerEmprendimientoPorId, ActualizarEmprendimiento } from '../services/emprendimientoService.js';
import { uploadImage } from '../utils/cloudinary.js';

// post: crear emprendimientos
export const crearEmprendimiento = async (req, res) => {
  try {
//     const usuarioId = req.usuarioId;
// if (!usuarioId) {
//   return res.status(401).json({ msg: "Usuario no autenticado" });
// } con token 

    const usuarioId = 1;
    const { nombre, descripcion, categoriaId, redes } = req.body;
    // convertir en int
    const categoriaIdInt = parseInt(categoriaId);
    if (isNaN(categoriaIdInt)) {
      return res.status(400).json({ msg: "ID de categoría inválido" });
    }
    const imagen = req.files?.imagen;
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);
    console.log("imagen.tempFilePath:", req.files?.imagen?.tempFilePath);
    if (!imagen) {
      return res.status(400).json({ msg: "Debe subir una imagen" });
    }

    // subir la imagen a cloudinary desde el archivo temporal
    const imagenSubida = await uploadImage(imagen.tempFilePath);
    const imagenUrl = imagenSubida.secure_url;
    console.log("Imagen subida a Cloudinary:", imagenUrl);
    const emprendimiento = await CrearEmprendimiento(
      { nombre, descripcion, imagen: imagenUrl, categoriaId: categoriaIdInt, redes },
      usuarioId
    );

    res.status(201).json({
      msg: "Emprendimiento creado correctamente",
      emprendimiento,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};
// delete
export const eliminarEmprendimiento = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new Error('ID inválido');

    const eliminado = await EliminarEmprendimiento(id);

    res.status(200).json({
      msg: 'Emprendimiento eliminado correctamente',
      eliminado,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// get
export const obtenerEmprendimientos = async (req, res) => {
  try {
    const emprendimientos = await ObtenerEmprendimientos();

    res.status(200).json({
      msg: 'Lista de emprendimientos',
      emprendimientos,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// get:id
export const obtenerEmprendimientoPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new Error('ID inválido');

    const emprendimiento = await ObtenerEmprendimientoPorId(id);

    if (!emprendimiento) {
      return res.status(404).json({ msg: 'Emprendimiento no encontrado' });
    }

    res.status(200).json({
      msg: 'Emprendimiento encontrado',
      emprendimiento,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
//put

export const actualizarEmprendimiento = async (req, res) => {
  try {
    // Validar ID del emprendimiento
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ msg: 'ID inválido' });
    }

    // Extraer usuario autenticado desde el token (asumiendo que el middleware lo inyecta en req.usuario)
    const usuarioId = req.usuario?.id;
    if (!usuarioId) {
      return res.status(401).json({ msg: 'Usuario no autenticado' });
    }

    // Extraer datos del body
    const datos = req.body;

    // Llamar al service
    const actualizado = await ActualizarEmprendimiento(id, datos, usuarioId);

    return res.status(200).json({
      msg: 'Emprendimiento actualizado correctamente',
      actualizado,
    });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

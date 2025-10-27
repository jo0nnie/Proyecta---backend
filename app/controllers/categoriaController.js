import { listarTodasLasCategorias } from "../services/categoriaService.js";

export const ListarCategorias = async (req, res) => {
  try {
    const categorias = await listarTodasLasCategorias();
    res.status(200).json({
      msg: "Todas las categorias, junto con sus emprendimientos:",
      categorias,
    });
  } catch (err) {
    console.error("Error al listar categorías:", err);
    res.status(500).json({ msg: "Error al obtener las categorías" });
  }
};

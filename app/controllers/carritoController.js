import prisma from '../prisma/client.js';
import { crear } from '../services/carritoService.js';
import { agregarItemAlCarrito } from "../services/carritoService.js";
//para agregar item al carrito
export const agregarItem = async (req, res) => {
  const { usuarioId, emprendimientoId, planId } = req.body;

  try {
    const resultado = await agregarItemAlCarrito(usuarioId, emprendimientoId, planId);
    res.status(201).json(resultado);
  } catch (err) {
    res.status(400).json({ error: "Error al agregar ítem al carrito", detalle: err.message });
  }
};


export const createCarrito = async (req, res) => {
  const { usuarioId } = req.body;
  try {
    const nuevoCarrito = await crear(usuarioId);
    res.status(201).json(nuevoCarrito);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear carrito', detalle: err.message });
  }
};

export const obtenerCarritoPorId = async (req, res) => {
  const carritoId = parseInt(req.params.id);
  try {
    const carrito = await prisma.carritos.findUnique({
      where: { id: carritoId },
      include: {
        items: {
          include: {
            planes: true,
            emprendimientos: true
          }
        },
        usuario: true
      }
    });
    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(carrito);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener carrito', detalle: err.message });
  }
};

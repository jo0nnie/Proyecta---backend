import prisma from '../prisma/client.js';

import { crear } from '../services/carritoService.js';

export const createCarrito = async (req, res) => {
  const { usuariosId } = req.body;

  try {
    const nuevoCarrito = await crear(usuariosId);
    res.status(201).json(nuevoCarrito);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear carrito', detalle: err.message });
  }
};

export const obtenerCarritoPorId = async (req, res) => {
  const carritosId = parseInt(req.params.id);

  try {
    const carrito = await prisma.carritos.findUnique({
      where: { id: carritosId }
    });

    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json(carrito);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener carrito', detalle: err.message });
  }
};

import {
  crearItem,
  obtenerItemPorId,
  actualizarItem,
  eliminarItem,
  getCarritoItems,
  eliminarTodoDelCarrito
} from '../services/carritoItemService.js';

export const crearCarritoItem = async (req, res) => {
  const { carritosId, planesId, emprendimientosIds = [] } = req.body;

  try {
    const itemsCreados = await crearItem(carritosId, planesId, emprendimientosIds);

    res.status(201).json({
      mensaje: `Se agregaron ${itemsCreados.length} ítem(s) al carrito.`,
      items: itemsCreados
    });
  } catch (err) {
    res.status(400).json({
      error: 'Error al crear item en carrito',
      detalle: err.message
    });
  }
};

// export const obtenerItemsDeCarrito = async (req, res) => {
//   const { carritosId } = req.params;

//   try {
//     const items = await obtenerItemsPorCarrito(parseInt(carritosId));
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ error: 'Error al obtener items del carrito', detalle: err.message });
//   }
// };

export const obtenerCarritoItemPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await obtenerItemPorId(parseInt(id));
    res.json(item);
  } catch (err) {
    if (err.message.includes('no encontrado')) {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error al obtener item', detalle: err.message });
  }
};

export const actualizarCarritoItem = async (req, res) => {
  const { id } = req.params;
  const { planesId, emprendimientosIds } = req.body;

  try {
    const itemActualizado = await actualizarItem(
      parseInt(id),
      planesId !== undefined ? parseInt(planesId) : undefined,
      emprendimientosIds ? emprendimientosIds.map(id => parseInt(id)) : undefined
    );
    res.json(itemActualizado);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar item', detalle: err.message });
  }
};

export const eliminarCarritoItem = async (req, res) => {
  const { id } = req.params;

  try {
    await eliminarItem(parseInt(id));
    res.status(204).send();
  } catch (err) {
    if (err.message.includes('no encontrado')) {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error al eliminar item', detalle: err.message });
  }
};

export const eliminarItemsDelCarrito = async (req, res) => {
  const carritosId = Number(req.params.id);
  if (!carritosId) {
    return res.status(400).json({ error: "ID de carrito inválido" });
  }

  try {
    const resultado = await eliminarTodoDelCarrito(carritosId);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// get items

// export const getCarritoItems = async (req, res) => {
//   const { carritosId } = req.params;

//   try {
//     const items = await obtenerItemsDelCarrito(Number(carritosId));

//     res.status(200).json({
//       mensaje: `Carrito ${carritosId} contiene ${items.length} ítem(s).`,
//       items
//     });
//   } catch (err) {
//     res.status(400).json({
//       error: "Error al obtener ítems del carrito",
//       detalle: err.message
//     });
//   }
// };


//get items carrito

export const obtenerItemsDelCarrito = async (req, res) => {
  const { id } = req.params;

  try {
    const items = await getCarritoItems(id);
    res.json({ items });
  } catch (err) {
    console.error("Error al obtener ítems del carrito:", err);
    res.status(400).json({
      error: "No se pudo obtener el carrito",
      detalle: err.message
    });
  }
};


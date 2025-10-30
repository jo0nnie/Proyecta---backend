import express from 'express';
import {
    crearCarritoItem,
    eliminarCarritoItem,
    actualizarCarritoItem,
    obtenerCarritoItemPorId,
    obtenerItemsDeCarrito
} from '../controllers/carritoItemController';

const router = express.Router();

//endpoints de carrito item
//crear items de carrito
router.post('/', crearCarritoItem);

//obtener un item
router.get('/:id', obtenerCarritoItemPorId);
//obtener todos
router.get('/', obtenerItemsDeCarrito);

//eliminar item
router.delete('/:id', eliminarCarritoItem);

//editar item
router.put('/:id', actualizarCarritoItem);

export default router;
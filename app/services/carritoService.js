import prisma from '../prisma/client.js';

export const crear = async (usuariosId) => {
    const usuario = await prisma.usuarios.findUnique({
        where: { id: usuariosId }
    });
    if (!usuario) throw new Error("Usuario no existe");
    const nuevoCarrito = await prisma.carritos.create({
        data: {
            usuariosId: usuariosId
        }
    });
    
    await prisma.usuarios.update({
        where: { id: usuariosId },
        data: {
            carritosId: nuevoCarrito.id
        }
    });
    return nuevoCarrito;
};

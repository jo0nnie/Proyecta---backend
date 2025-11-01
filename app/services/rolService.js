import prisma from "../prisma/client.js";

export const crearRol = async (nombre) => {
    if (!nombre)
    throw new Error('El nombre del rol es requerido.');

    const existe = await prisma.roles.findFirst({
        where: { nombre }
    });

    if (existe) throw new Error('El rol ya existe.');

    const nuevoRol = await prisma.roles.create({
        data: { nombre }
    });

    return nuevoRol;
};

export const obtenerRoles = async () => {
    return await prisma.roles.findMany();
};

export const obtenerRolPorId = async (id) => {
    const rol = await prisma.roles.findUnique({
        where: { id }
    });

    if (!rol) throw new Error('Rol no encontrado.');
    return rol;
};


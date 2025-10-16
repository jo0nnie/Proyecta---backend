import prisma from "../prisma/client.js";

export const editarUnUsuario = async (id, datos) => {

    const encontrarUsuario = await prisma.usuarios.findUnique({
        where: { id }
    });
    if (!encontrarUsuario) {
        throw new Error("No se encontro el Usuario");
    }

    const { nombre, apellido, email, contrasena, fechaNacimiento } = datos;

    const editarElUsuario = await prisma.usuarios.update({
        where: { id },
        data: {
            nombre,
            apellido,
            contrasena,
            email,
            fechaNacimiento,
        }
    });
    return editarElUsuario;
};

export const eliminarUnUsuario = async (id) => {

    const encontrarUsuario = await prisma.usuarios.findUnique({
        where: { id }
    });
    if (!encontrarUsuario) {
        throw new Error("No se encontro el Usuario");
    }

    const eliminarElUsuario = await prisma.usuarios.delete({
        where: { id }
    })
    return eliminarElUsuario;
}

export const listarTodosLosUsuarios = async () => {

    const mostrarUsuarios = await prisma.usuarios.findMany({
        include: {
            emprendimiento: true,
        },
        orderBy: {
            id: 'desc',
        },
    });
    return mostrarUsuarios;
}

export const listarUsuarioPorId = async (id) => {

    const encontrarUsuario = await prisma.usuarios.findUnique({
        where: { id },
        select: {
            nombre: true,
            apellido: true,
            contrasena: true,
            email: true,
            emprendimiento: true,
        }
    });
    if (!encontrarUsuario) {
        throw new Error("No se encontro el Usuario");
    }
    return encontrarUsuario;
}
import prisma from "../prisma/client.js";
import bcrypt from "bcryptjs";

export const editarUnUsuario = async (id, datos) => {
    const encontrarUsuario = await prisma.usuarios.findUnique({
        where: { id },
    });
    if (!encontrarUsuario) {
        throw new Error("No se encontró el Usuario");
    }

    const { nombre, apellido, email, contrasena, fechaNacimiento } = datos;

    if (email) {
        const usuarioConEseEmail = await prisma.usuarios.findUnique({
            where: { email },
        });
        if (usuarioConEseEmail && usuarioConEseEmail.id !== id) {
            throw new Error("Este correo ya está en uso.");
        }
    }

    const dataToUpdate = {
        nombre,
        apellido,
        email,
        fechaNacimiento,
    };

    if (contrasena !== undefined && contrasena !== null && contrasena.trim() !== "") {
        const esIgual = bcrypt.compareSync(contrasena, encontrarUsuario.contrasena);
        if (esIgual) {
            throw new Error("La nueva contraseña debe ser diferente a la actual.");
        }

        const hashedContrasena = await bcrypt.hash(contrasena, 10);
        dataToUpdate.contrasena = hashedContrasena;
    }

    const editarElUsuario = await prisma.usuarios.update({
        where: { id },
        data: dataToUpdate,
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
    const usuario = await prisma.usuarios.findUnique({
        where: { id },
        include: {
            carrito: {
                include: {
                    idCarritosItems: {
                        include: {
                            planes: true,
                            emprendimientos: true
                        }
                    }
                }
            },
            emprendimiento: {
                include: {
                    Categorias: {
                        select: { id: true, nombre: true }
                    }
                }
            }
        }
    });

    if (!usuario) {
        throw new Error("No se encontró el Usuario");
    }

    return usuario;
};
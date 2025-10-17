import prisma from "../prisma/client.js";


// nombres: Impulso Inicial, Impulso Constante, Proyección Máxima

// body post:
// {
//     "nombre": "Impulso Inicial", string
//     "descripcion": "Acceso completo a todas las funciones", string
//     "precio": 100.00 float
// }
export const CrearPlan = async ({ nombre, descripcion, duracion, precio }) => {
    try {
        const nuevoPlan = await prisma.planes.create({
            data: {
                nombre,
                descripcion: Array.isArray(descripcion) ? descripcion.join('; ') : descripcion,
                duracion,
                precio: parseFloat(precio)
            }
        });
        return nuevoPlan;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el plan");
    }
};
export const ObtenerPlanes = async () => {
    try {
        const planes = await prisma.planes.findMany();
        return planes;
    } catch (error) {
        throw new Error("Error al obtener los planes");
    }
};
export const ObtenerPlanPorId = async (id) => {
    try {
        const plan = await prisma.planes.findUnique({
            where: { id }
        });
        return plan;
    } catch (error) {
        throw new Error("Error al obtener el plan por ID");
    }
};
// eliminar service
export const EliminarPlan = async (id) => {
    try {
        const eliminado = await prisma.planes.delete({
            where: { id }
        });
        return eliminado;
    } catch (error) {
        throw new Error("Error al eliminar el plan");
    }
};

// actualizar service
export const ActualizarPlan = async (id, datos) => {
    try {   
        const actualizado = await prisma.planes.update({
            where: { id },
            data: {
                nombre: datos.nombre,
                descripcion: Array.isArray(datos.descripcion) ? datos.descripcion.join('; ') : datos.descripcion,
                duracion: datos.duracion,
                precio: parseFloat(datos.precio)
            } 
        });
        return actualizado;
    } catch (error) {
        throw new Error("Error al actualizar el plan");         

    }
};
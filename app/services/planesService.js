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
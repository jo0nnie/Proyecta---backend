import prisma from "../prisma/client.js";
export async function obtenerEstadisticas() {
  try {
    const [usuarios, emprendimientos, categorias, planes] = await Promise.all([
      prisma.usuarios.count(),
      prisma.emprendimientos.count(),
      prisma.categorias.count(),
      prisma.planes.count(),
    ]);

    return {
      usuarios,
      emprendimientos,
      categorias,
      planes,
    };
  } catch (error) {
    console.error("Error en estadisticaService:", error);
    throw new Error("No se pudieron obtener las estadísticas.");
  }
}

export async function obtenerUsuariosConectados() {
  try {
    const usuarios = await prisma.usuarios.findMany({
      where: { estado: true },
      select: {
        id: true,
        nombre: true,
        email: true,
        estado: true,
        _count: {
          select: { emprendimiento: true },
        },
      },
    });

    return usuarios.map((u) => ({
      id: u.id,
      nombre: u.nombre,
      email: u.email,
      conectado: u.estado,
      cantidadEmprendimientos: u._count.emprendimiento,
    }));
  } catch (error) {
    console.error("Error en usuarioService:", error);
    throw new Error("No se pudo obtener la lista de usuarios conectados.");
  }
}
import { obtenerEstadisticas, obtenerUsuariosConectados } from "../services/estadisticaService.js";


export async function ObtenerEstadisticas(req, res) {
    try {
        const datos = await obtenerEstadisticas();
        res.json(datos);
    } catch (error) {
        console.error("Error en estadisticaController:", error);
        res.status(500).json({ error: error.message });
    }
}

//lista de usuarios conectados

export async function ObtenerUsuariosConectados(req, res) {
  try {
    const usuarios = await obtenerUsuariosConectados();
    res.json(usuarios);
  } catch (error) {
    console.error("Error en ObtenerUsuariosConectados:", error);
    res.status(500).json({ error: error.message });
  }
}
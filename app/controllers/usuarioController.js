import {
    listarTodosLosUsuarios,
    listarUsuarioPorId,
    eliminarUnUsuario,
    editarUnUsuario,
} from "../services/usuarioService.js";

export const ListarUsuarios = async (req, res) => {
    try {
        const usuario = await listarTodosLosUsuarios();
        res.status(200).json({
            msg: 'Lista de usuarios',
            usuario,
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const ListarUsuarioPorId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new Error('ID inválido');

        const usuario = await listarUsuarioPorId(id);
        res.status(200).json({ msg: 'Usuario', usuario });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const EditarUsuario = async (req, res) => {
    try {

        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new Error('ID inválido');

        const datos = req.body;
        const usuario = await editarUnUsuario(id, datos)

        res.status(200).json({
            msg: 'Usuario editado correctamente',
            usuario,
        });

    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const EliminarUsuario = async (req, res) => {
    try {

        const id = parseInt(req.params.id);
        if (isNaN(id)) throw new Error('ID inválido');

        const datos = req.body;
        const usuario = await eliminarUnUsuario(id)

        res.status(200).json({
            msg: 'Usuario eliminado correctamente',
            usuario,
        });

    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
import {
    listarTodosLosUsuarios,
    listarUsuarioPorId,
    eliminarUnUsuario,
    editarUnUsuario,
} from "../services/usuarioService.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../constants/constants.js";

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

export const ObtenerUsuarioLogueado = async (req, res) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) return res.status(401).json({ msg: "Token requerido" });

        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, SECRET);

        const usuario = await listarUsuarioPorId(decoded.id);

        return res.json(usuario);
    } catch (error) {
        return res.status(401).json({ msg: "Token inválido o expirado" });
    }
};

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

export const EditarUsuarioLogueado = async (req, res) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) return res.status(401).json({ msg: "Token requerido" });

        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, SECRET);

        const datos = req.body;
        const usuario = await editarUnUsuario(decoded.id, datos);

        res.status(200).json({
            msg: "Perfil actualizado correctamente",
            usuario,
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

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

export const EliminarUsuarioLogueado = async (req, res) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) return res.status(401).json({ msg: "Token requerido" });

        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, SECRET);

        const usuario = await eliminarUnUsuario(decoded.id);
        res.status(200).json({
            msg: "Tu cuenta ha sido eliminada correctamente",
            usuario,
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
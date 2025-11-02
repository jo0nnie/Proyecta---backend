import express from 'express'
import { ObtenerEstadisticas, ObtenerUsuariosConectados } from '../controllers/estadisticaController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();    


router.get('/', authMiddleware, ObtenerEstadisticas);
router.get('/conectados', authMiddleware, ObtenerUsuariosConectados);

export default router;
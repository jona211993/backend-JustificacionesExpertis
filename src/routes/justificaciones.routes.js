import { Router } from "express";
import {getJustificaciones, getJustificacionesBySuper,createJustificacion} from '../controllers/justificaciones.controllers.js'
import {getAsesoresBySuper} from '../controllers/empleados.controllers.js'
import {verifyToken} from '../middlewares/auth.js'


const router = Router()

router.get('/obtenerJustificaciones', getJustificaciones)
router.post('/obtenerJustPorSuper' ,getJustificacionesBySuper)
router.post('/obtenerAsesoresPorSuper' ,getAsesoresBySuper)
router.post('/crearJustificacion', createJustificacion)
router.delete('/eliminarJustificacion/:id',[verifyToken],)
router.put('/actualizarJustificacion/:id',[verifyToken],)

export default router;
import { Router } from "express";
import {getJustificaciones, getJustificacionesBySuper,createJustificacion} from '../controllers/justificaciones.controllers.js'
import {verifyToken} from '../middlewares/auth.js'


const router = Router()

router.get('/obtenerJustificaciones',[verifyToken], getJustificaciones)
router.get('/obtenerJustPorSuper',[verifyToken] ,getJustificacionesBySuper)
router.post('/crearJustificacion', [verifyToken],createJustificacion)
router.delete('/eliminarJustificacion/:id',[verifyToken],)
router.put('/actualizarJustificacion/:id',[verifyToken],)

export default router;
import { Router } from "express";
import {getJustificaciones, getJustificacionesBySuper,createJustificacion} from '../controllers/justificaciones.controllers.js'

const router = Router()

router.get('/obtenerJustificaciones', getJustificaciones)
router.get('/obtenerJustPorSuper', getJustificacionesBySuper)
router.post('/crearJustificacion', createJustificacion)


export default router;
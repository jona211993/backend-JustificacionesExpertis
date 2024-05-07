import { Router } from "express";
import {obtenerNombreGrupo,obtenerIdAsesorSeleccionado} from '../controllers/solicitudes.controllers.js'

const router = Router()

router.post('/obtenerNombreGrupo',obtenerNombreGrupo )
router.get('/obtenerIdAsesor/:usuario',obtenerIdAsesorSeleccionado )

export default router;
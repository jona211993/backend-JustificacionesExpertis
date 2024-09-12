import { Router } from "express";
import {
getDiasOcupadosPorArea, 
getSolicitudesAprobadasbyIdEmpleado,
getSolicitudesEnProcesobyIdEmpleado,
getSolicitudesAprobadasFromEquipo,
getSolicitudesEnProcesoFromEquipo,
getSolicitudPorId,
getSolicitudAprobadaPorId,
getSolicitudesAprobadasTodas,
getSolicitudesAdmitidasTodas,
getSaldoVacacionesbyIdEmpleado_CodMes,
updateSolicitudVacacionesPorId,
updateSolicitdVacacionesGerenciaPorId,
createSolicitudAprobadaGerencia,
createSolicitudVacaciones
} from '../controllers/vacaciones.controllers.js'

import {
    getSolicitudesByCalendarioJefes,
    } from '../controllers/solicitudesJefes.controllers.js'

const router = Router()

router.get('/obtenerDiasOcupados/:idArea', getDiasOcupadosPorArea)
router.get('/obtenerSolicitudes/:id', getSolicitudesAprobadasbyIdEmpleado)
router.get('/obtenerSolicitudesAprobadasTodas', getSolicitudesAprobadasTodas)
router.get('/obtenerSolicitudesAdmitidasTodas', getSolicitudesAdmitidasTodas)
router.get('/obtenerSolicitudesEnProceso/:id', getSolicitudesEnProcesobyIdEmpleado)
router.get('/obtenerSolicitudesEnProcesoEquipo/:id', getSolicitudesEnProcesoFromEquipo)
router.get('/obtenerSolicitudesAprobadasEquipo/:id', getSolicitudesAprobadasFromEquipo)
router.get('/obtenerSolicitudVacaciones/:id', getSolicitudPorId)
router.get('/obtenerSolicitudAprobada/:id', getSolicitudAprobadaPorId)
router.get('/obtenerSolicitudesCalendarioJefes',getSolicitudesByCalendarioJefes )
router.get('/obtenerSaldoVacacionesEmpleado',getSaldoVacacionesbyIdEmpleado_CodMes)
router.put('/cambiarEstadoSolicitudVacaciones', updateSolicitudVacacionesPorId)
router.put('/cambiarEstadosolicitudVacacionesAprobada', updateSolicitdVacacionesGerenciaPorId);
router.post('/createSolicitudAprobadaGerencia', createSolicitudAprobadaGerencia)
router.post('/registrarSolicitudVacaciones',createSolicitudVacaciones )


export default router;
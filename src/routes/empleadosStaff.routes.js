import { Router } from "express";
import {getEmpleadosStaff} from '../controllers/empleadosStaff.controllers.js'

const router = Router()

router.get('/obtenerEmpleadosStaff', getEmpleadosStaff)


export default router;
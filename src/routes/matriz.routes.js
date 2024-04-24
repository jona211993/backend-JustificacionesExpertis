import { Router } from "express";
import {getmatriz} from '../controllers/matriz.controllers.js'

const router = Router()

router.get('/matriz', getmatriz)

export default router;
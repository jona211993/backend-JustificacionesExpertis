import {Router} from 'express';
import * as pruebaCtrl from '../controllers/prueba.controller.js'

const router = Router();
router.get('/obtenerPruebas/:id_justificacion',pruebaCtrl.getPruebasDeJustificacion);
router.post('/crearPrueba', pruebaCtrl.createPrueba);


export default  router;
import {Router} from 'express';
import * as authCtrl from '../controllers/auth.controller.js'

import { checkExistingUser } from '../middlewares/auth.js';
const router = Router();

router.post('/signUp', [checkExistingUser], authCtrl.signUp);
router.post('/signIn' , authCtrl.signIn);
router.post('/logout' , authCtrl.logout);

export default  router;

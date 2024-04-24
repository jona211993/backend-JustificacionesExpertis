import express from 'express'; 
import morgan from 'morgan';
import cors from 'cors';

import authRoues from './routes/auht.routes.js';
import matrizRoutes from './routes/matriz.routes.js'
import justificacionesRoutes from './routes/justificaciones.routes.js'
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
// rutas
app.use('/api/',authRoues);
app.use(matrizRoutes);
app.use(justificacionesRoutes);


export default app;
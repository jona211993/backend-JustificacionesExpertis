import express from 'express'; 
import morgan from 'morgan';
import authRoues from './routes/auht.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// rutas
app.use('/api/',authRoues);


export default app;
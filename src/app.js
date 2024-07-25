import express from 'express'; 
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoues from './routes/auht.routes.js';
import matrizRoutes from './routes/matriz.routes.js';
import justificacionesRoutes from './routes/justificaciones.routes.js';
import solicitudesRoutes from './routes/solicitudes.routes.js';
import pruebasRoutes from './routes/pruebas.routes.js';
import empleadosStaffRoutes from './routes/empleadosStaff.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Lista de orígenes permitidos
const allowedOrigins = [
    'https://expertis-erp.pages.dev',
    'http://localhost:5173',
    'https://e4bf-161-132-214-102.ngrok-free.app/api'
];

const corsOptions = {
    origin: function (origin, callback) {
        // Permitir solicitudes sin origen (como las hechas desde Postman o cURL)
        if (!origin) return callback(null, true);
        // Verificar si el origen está en la lista de permitidos
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true // Permitir el uso de credenciales
};

app.use(cors(corsOptions));

// Middleware adicional para asegurarse de que los encabezados CORS están presentes
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
       // Responder a las solicitudes OPTIONS de verificación preflight
       if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

// Rutas
app.get('/', (req, res) => {
    res.send('HOLA EXPERTIS');
});
app.use('/api/', authRoues);
app.use(matrizRoutes);
app.use('/api/', solicitudesRoutes);
app.use('/api/', justificacionesRoutes);
app.use('/api/', pruebasRoutes);
app.use('/api/', empleadosStaffRoutes)

export default app;

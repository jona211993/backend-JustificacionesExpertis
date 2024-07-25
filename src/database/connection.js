import sql from "mssql";
import dotenv from 'dotenv';

dotenv.config();

const dbSettings = {
    // user: "jonatan",
    // password: "jona092014",
    // server: "localhost",
    // database: "BD_RRHH",
    // options: {
    //     encrypt : true,
    //     trustServerCertificate: true,
    // }
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,  // Puedes ajustar esto según tus necesidades
        trustServerCertificate: true, // Puedes ajustar esto según tus necesidades
    }
};

const dbSettings2 = {
    user: process.env.DB_USER2,
    password: process.env.DB_PASSWORD2,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE2,
    options: {
        encrypt: false,  // Puedes ajustar esto según tus necesidades
        trustServerCertificate: true, // Puedes ajustar esto según tus necesidades
    }
};

export const getConnection= async () => {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;        
    } catch (error) {
        console.error(error);
    }
}

export const getConnection2= async () => {
    try {
        const pool2 = await sql.connect(dbSettings2);
        return pool2;        
    } catch (error) {
        console.error(error);
    }
}
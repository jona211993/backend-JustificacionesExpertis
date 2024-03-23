import sql from "mssql";

const dbSettings = {
    user: "sa",
    password: "123",
    server: "localhost",
    database: "RRHH",
    options: {
        encrypt : true,
        trustServerCertificate: true,
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
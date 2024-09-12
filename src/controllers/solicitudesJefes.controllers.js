import { getConnection2 } from "../database/connection.js";
export const getSolicitudesByCalendarioJefes = async (req, res) => {
    let pool2;

    try {
        const sql = `EXEC spobtenerFechasCalendarioSolicitudesJefes`; 
        pool2 = await getConnection2();

        // Verificar si la conexión se ha establecido correctamente
        if (!pool2) {
            throw new Error('No se pudo establecer la conexión con la base de datos.');
        }

        const result = await pool2.request().query(sql);
        const data = result.recordset;

        if (data && data.length > 0) {
            return res.status(200).json({ data });
        } else {
            return res.status(404).json({ message: "No se pudo obtener las solicitudes para el calendario jefes" });
        }

    } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(500).json({ message: "Error al obtener las solicitudes del calendario jefes", error: error.message });
    } finally {
        if (pool2) {
            await pool2.close(); // Asegúrate de cerrar la conexión de manera asincrónica
        }
    }
};

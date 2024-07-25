import { getConnection2 } from "../database/connection.js";
import { areas } from "../data/areas.js"; // Importa la estructura de datos
export const getEmpleadosStaff = async (req, res) => {
    let pool2;
    try {
        let sql = `EXEC spobtener_empleados_staff`; // Asegúrate de usar EXEC para ejecutar el procedimiento almacenado
        pool2 = await getConnection2();

        // Verificar si la conexión se ha establecido correctamente
        if (!pool2) {
            throw new Error('No se pudo establecer la conexión con la base de datos.');
        }

        const result = await pool2.request().query(sql);
        const data = result.recordset;
        // console.log(data);

        if (data && data.length > 0) {
            return res.status(200).json({ data });
        } else {
            return res.status(404).json({ message: "No se pudo obtener los empleados vigentes del staff" });
        }

    } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({ message: "Error al obtener los empleados vigentes del staff" });
    } finally {
        if (pool2) {
            pool2.close(); // Cerrar la conexión
        }
    }
};

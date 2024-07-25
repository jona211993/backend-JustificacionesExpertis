import { getConnection2 } from "../database/connection.js";

export const createSolicitud = async (req, res) => {
    let pool2;
    try {
        const {idEmpleado, fecInicio, fecFinal , detalle} = req.body(); 
        //Calcular la cantidad de dias totales
        //Calcular los dias habiles y los dias no habiles
        

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
                // Añadir información del área a cada empleado
            const empleadosConAreas = data.map(empleado => {
            const areaData = areas.find(area => area.idEmpleado === empleado.idEmpleado);
            return {
            ...empleado,
            idArea: areaData ? areaData.idArea : null,
            area: areaData ? areaData.area : null,
            jefe_id: areaData? areaData.jefe_id : null
            };
        });

            return res.status(200).json({ empleadosConAreas });
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
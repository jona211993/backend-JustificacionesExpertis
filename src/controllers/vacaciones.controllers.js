import { getConnection2 } from "../database/connection.js";

export const getDiasOcupadosPorArea = async (req, res) => {
    let pool2;
    const {idArea}= req.params;
    try {
        let sql = `EXEC spobtener_diasOcupados_by_idArea ${idArea}`; // Asegúrate de usar EXEC para ejecutar el procedimiento almacenado
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
            return res.status(404).json({ message: "No se pudo obtener los dias ocupados por area" });
        }

    } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({ message: "Error al obtener los dias ocupados" });
    } finally {
        if (pool2) {
            pool2.close(); // Cerrar la conexión
        }
    }
};

// Para obtener las solicitudes de vacaciones Aprobadas de un emmpleado
export const getSolicitudesAprobadasbyIdEmpleado= async (req, res) => {
    let pool2;
    const {id} = req.params;
    
    try {
        let sql = `EXEC spobtener_solicitudesAprobadas_by_idEmpleado ${id}`; // Asegúrate de usar EXEC para ejecutar el procedimiento almacenado
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
            return res.status(404).json({ message: "No se pudo obtener las solicitudes aprobadas del empleado" });
        }

    } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({ message: "Error al obtener las solicitudes aprobadas" });
    } finally {
        if (pool2) {
            pool2.close(); // Cerrar la conexión
        }
    }
};
// Para obtener las solicitudes de vacaciones en Proceso de un emmpleado
export const getSolicitudesEnProcesobyIdEmpleado= async (req, res) => {
    let pool2;
    const {id} = req.params;
    
    try {
        let sql = `EXEC spobtener_solicitudesEnProceso_by_idEmpleado ${id}`; // Asegúrate de usar EXEC para ejecutar el procedimiento almacenado
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
            return res.status(404).json({ message: "No se pudo obtener las solicitudes en proceso del empleado" });
        }

    } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({ message: "Error al obtener las solicitudes en proceso" });
    } finally {
        if (pool2) {
            pool2.close(); // Cerrar la conexión
        }
    }
};

// Para obtener las solicitudes de vacaciones Aprobadas de todo el equipo
export const getSolicitudesAprobadasFromEquipo= async (req, res) => {
    let pool2;
    const {id} = req.params;
    
    try {
        let sql = `EXEC spobtener_solicitudesAprobadas_by_idArea ${id}`; // Asegúrate de usar EXEC para ejecutar el procedimiento almacenado
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
            return res.status(404).json({ message: "No se pudo obtener las solicitudes aprobadas del equipo" });
        }

    } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({ message: "Error al obtener las solicitudes aprobadas" });
    } finally {
        if (pool2) {
            pool2.close(); // Cerrar la conexión
        }
    }
};
//Para obtener la informacion de las solicitudes aprobadas para Gerencia, muestra adicionalmente el campo del nombre del area y el id
export const getSolicitudesAprobadasTodas= async (req, res) => {
    let pool2;  
    try {
        let sql = `EXEC splistarSolicitudesAprobadasTodas`; // Asegúrate de usar EXEC para ejecutar el procedimiento almacenado
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
            return res.status(404).json({ message: "No se pudo obtener las solicitudes aprobadas" });
        }

    } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({ message: "Error al obtener las solicitudes aprobadas totales" });
    } finally {
        if (pool2) {
            pool2.close(); // Cerrar la conexión
        }
    }
};
// Para obtener las solicitudes admitidas para Gerencia
export const getSolicitudesAdmitidasTodas= async (req, res) => {
    let pool2;  
    try {
        let sql = `EXEC splistarSolicitudesAdmitidas`; // Asegúrate de usar EXEC para ejecutar el procedimiento almacenado
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
            return res.status(404).json({ message: "No se pudo obtener las solicitudes admitidas" });
        }

    } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({ message: "Error al obtener las solicitudes admitidas totales" });
    } finally {
        if (pool2) {
            pool2.close(); // Cerrar la conexión
        }
    }
};

// Para obtener las solicitudes de vacaciones en Proceso de un emmpleado
export const getSolicitudesEnProcesoFromEquipo= async (req, res) => {
    let pool2;
    const {id} = req.params;
    
    try {
        let sql = `EXEC spobtener_solicitudesEnProceso_by_idArea ${id}`; // Asegúrate de usar EXEC para ejecutar el procedimiento almacenado
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
            return res.status(404).json({ message: "No se pudo obtener las solicitudes en proceso del equipo" });
        }

    } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({ message: "Error al obtener las solicitudes en proceso" });
    } finally {
        if (pool2) {
            pool2.close(); // Cerrar la conexión
        }
    }
};
// Para obtener las solicitudes de vacaciones en Proceso de un emmpleado
export const getSolicitudPorId= async (req, res) => {
    let pool2;
    const {id} = req.params;
    
    try {
        let sql = `EXEC spobtener_solicitudVacaciones_by_id ${id}`; // Asegúrate de usar EXEC para ejecutar el procedimiento almacenado
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
            return res.status(404).json({ message: "No se pudo obtener la solicitud" });
        }

    } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({ message: "Error al obtener la solicitud" });
    } finally {
        if (pool2) {
            pool2.close(); // Cerrar la conexión
        }
    }
};
// Para obtener las solicitudes de vacaciones en Proceso de un emmpleado
export const getSolicitudAprobadaPorId= async (req, res) => {
    let pool2;
    const {id} = req.params;
    
    try {
        let sql = `EXEC spobtener_solicitudAprobada_by_id ${id}`; // Asegúrate de usar EXEC para ejecutar el procedimiento almacenado
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
            return res.status(404).json({ message: "No se pudo obtener la solicitud" });
        }

    } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({ message: "Error al obtener la solicitud" });
    } finally {
        if (pool2) {
            pool2.close(); // Cerrar la conexión
        }
    }
};
// Para actualizar el estado de Solicitud de Vacaciones
export const updateSolicitudVacacionesPorId = async (req, res) => {
    let pool2;
    const { id, estado } = req.body;
    console.log("LLEGOOO: ", id, estado);
    
    try {
        let sql = `EXEC spCambiarEstadoSolicitudVacaciones '${estado}', ${id}`;
        pool2 = await getConnection2();

        if (!pool2) {
            throw new Error('No se pudo establecer la conexión con la base de datos.');
        }

        const result = await pool2.request().query(sql);
        const data = result.recordset;

        if (data && data.length > 0 && data[0].RowsAffected > 0) {
            return res.status(200).json({ message: "Solicitud actualizada correctamente" });
        } else {
            return res.status(404).json({ message: "No se pudo actualizar la solicitud" });
        }

    } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({ message: "Error al actualizar la solicitud" });
    } finally {
        if (pool2) {
            pool2.close();
        }
    }
};

//Este es una funcion que me trae la informacion de toda una solicitud por su id:
// La necesito para usarla en la insercion a la tabla vacaciones cuando se aprueba una solicitud del lado de Gerencia
export const getSolicitudPorIdData = async (id) => {
    let pool2;

    try {
        const sql = `EXEC spobtener_solicitudVacaciones_by_id ${id}`;
        pool2 = await getConnection2();

        if (!pool2) {
            throw new Error('No se pudo establecer la conexión con la base de datos.');
        }

        const result = await pool2.request().query(sql);
        const data = result.recordset;

        if (data && data.length > 0) {
            return data[0]; // Devolver el primer registro encontrado
        } else {
            return null; // Devolver null si no se encuentra la solicitud
        }
    } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        throw error;
    } finally {
        if (pool2) {
            pool2.close();
        }
    }
};

// Para obtener los saldos de vacaciones de un emmpleado
export const getSaldoVacacionesbyIdEmpleado_CodMes = async (req, res) => {
    let pool2;
    const { idEmpleado, fecMes } = req.query;
   
    console.log("llego como idEmpleado al backend: ",idEmpleado)
    console.log("llego como codMes al backend: ",fecMes)
    
    try {
        const sql = `EXECUTE spobtenerSaldoVacaciones @idEmpleado, @fecMes`; // Usa parámetros en lugar de concatenar directamente
        
        pool2 = await getConnection2();

        if (!pool2) {
            throw new Error('No se pudo establecer la conexión con la base de datos.');
        }

        const result = await pool2.request()
            .input('idEmpleado', idEmpleado)  // Agrega el parámetro idEmpleado
            .input('fecMes', fecMes)          // Agrega el parámetro fecMes
            .query(sql);
        
        const data = result.recordset;

        if (data && data.length > 0) {
            return res.status(200).json({ data });
        } else {
            return res.status(404).json({ message: "No se pudo obtener el saldo de vacaciones para el empleado y mes especificado." });
        }

    } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({ message: "Error al obtener el saldo de vacaciones." });
    } finally {
        if (pool2) {
            pool2.close(); // Cerrar la conexión
        }
    }
};


// Para actualizar el estado de Solicitud de Vacaciones a Aprobado - Gerencia
export const updateSolicitdVacacionesGerenciaPorId = async (req, res) => {
    // requiere dos cosas una es hacer el update del estado en la tabla 
    // de solicitud Vacaciones y ademas hacer el insert en la tabla de Vacaciones
    // esto solo si el estado='APROBADO'
    let pool2;
    const { id, estado } = req.body;
    console.log("LLEGOOO: ", id, estado); 
     
    try {
            const sqlUpdate = `EXEC spCambiarEstadoSolicitudVacaciones '${estado}', ${id}`;
            pool2 = await getConnection2();

            if (!pool2) {
                throw new Error('No se pudo establecer la conexión con la base de datos.');
            }

            const result = await pool2.request().query(sqlUpdate);
            console.log("RESULTADO:", result);
            if (result.recordset && result.recordset[0].RowsAffected > 0 ) {
                return res.status(200).json({ message: "Solicitud actualizada correctamente desde gerencia" });
            } else {
                return res.status(404).json({ message: "No se pudo actualizar la solicitud desde gerencia" });
            }
        }
     catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({ message: "Error al actualizar la solicitud desde gerencia" });
    } finally {
        if (pool2) {
            pool2.close();
        }
    }
};

// Para Insertar en la tabla de Vacaciones luego de actualizar a Aprobado unaSolicitud Admitida
export const createSolicitudAprobadaGerencia = async (req, res) => {
    let pool2;
    const { id, estado } = req.body;
    console.log("LLEGOOO: ", id, estado);

    try {
        if (estado === "APROBADO") {
            const datosDeLaSolicitud = await getSolicitudPorIdData(id);

            if (!datosDeLaSolicitud) {
                return res.status(404).json({ message: "No se encontró la solicitud" });
            }

            const {
                idEmpleado,
                codMes,
                fecSolicitud,
                fecInicial,
                fecFinal,
                cantDias,
                cantDiasHabiles,
                cantDiasNoHabiles
            } = datosDeLaSolicitud;

            const estadoVacaciones = "APROBADO";
            const tipoVacaciones = "REGISTRADAS Y GOZADAS";
            const detalle = "CONTABLE";
            const estado2 = "I";
            const fecInsert = new Date().toISOString();
            const usrInsert = "CESAR MENACHO";

            // Formatear correctamente todas las fechas a 'YYYY-MM-DD'
            const formattedCodMes = codMes; // codMes ya está en el formato correcto
            const formattedFecSolicitud = fecSolicitud.toISOString().split('T')[0];
            const formattedFecInicial = fecInicial.toISOString().split('T')[0];
            const formattedFecFinal = fecFinal.toISOString().split('T')[0];
            const formattedFecInsert = fecInsert.split('T')[0];

            // Construir la consulta SQL
            const sqlInsert = `
                EXEC spRegistrarSolicitudVacacionesAprobada 
                    ${idEmpleado}, 
                    '${formattedCodMes}', 
                    '${formattedFecSolicitud}', 
                    '${formattedFecInicial}', 
                    '${formattedFecFinal}', 
                    ${cantDias}, 
                    '${estadoVacaciones}', 
                    '${tipoVacaciones}', 
                    '${detalle}', 
                    ${cantDiasHabiles}, 
                    ${cantDiasNoHabiles}, 
                    '${estado2}', 
                    '${formattedFecInsert}', 
                    '${usrInsert}'`;

            pool2 = await getConnection2();

            if (!pool2) {
                throw new Error('No se pudo establecer la conexión con la base de datos.');
            }

            // Ejecutar la consulta SQL de inserción
            const resultInsert = await pool2.request().query(sqlInsert);

            const data = resultInsert.recordset;
            // console.log(data);

            if (data && data.length > 0) {
                return res.status(200).json({ data });
            } else {
                return res.status(404).json({ message: "No se pudo registrar la solicitud" });
            }

    }} catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({ message: "Error al insertar la solicitud aprobada en Vacaciones" });
    } finally {
        if (pool2) {
            pool2.close();
        }
    }
};

function contarDiasLaborablesYNoLaborables(fechaInicio, fechaFin) {
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
  
    let diasLaborables = 0;
    let diasNoLaborables = 0;
  
    for (let fecha = fechaInicioDate; fecha <= fechaFinDate; fecha.setDate(fecha.getDate() + 1)) {
      const diaSemana = fecha.getDay(); // 0: domingo, 1: lunes, ..., 6: sábado
  
      if (diaSemana === 0 || diaSemana === 6) {
        diasNoLaborables++;
      } else {
        diasLaborables++;
      }
    }
  
    return {
      diasLaborables,
      diasNoLaborables
    };
  }

// Para registrar una solicitud de vacaciones
export const createSolicitudVacaciones = async (req, res) => {
    let pool2;
    const { diasElejidos,detalle, idArea, idJefe, idEmpleado, usrInsert } = req.body;
    let cantDias
    let cantDiasHabiles
    let cantDiasNoHabiles
    // Extraemos las fechas
    let fecInicial = diasElejidos[0];
    let fecFinal = diasElejidos[1];

    const resultado = contarDiasLaborablesYNoLaborables(fecInicial, fecFinal);
    cantDias= resultado.diasLaborables + resultado.diasNoLaborables,
    cantDiasHabiles=resultado.diasLaborables,
    cantDiasNoHabiles=resultado.diasNoLaborables 

    // crear el codMes
    const obtenerCodMes = (fecInicial) => {
        const fecha = new Date(fecInicial);
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // getMonth() es 0-indexado, por eso sumamos 1
        return `${año}-${mes}-01`;
    };

    let codMes = obtenerCodMes(fecInicial);

    // Para obtener la fecha de insert
    function obtenerFechaActual() {
        const hoy = new Date();
        const año = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
        const dia = String(hoy.getDate()).padStart(2, '0');

        const fechaActual = `${año}-${mes}-${dia}`;
        return fechaActual;
    }
    let fecInsert = obtenerFechaActual();
    let fecSolicitud = obtenerFechaActual();

    if (idEmpleado === idJefe) {
        try {
            let estado = 'ADMITIDO';
            let sql = `EXEC spregistrar_solicitud_vacaciones ${idEmpleado}, '${codMes}', '${fecSolicitud}', '${fecInicial}', '${fecFinal}', ${cantDias}, '${estado}', '${detalle}', ${cantDiasHabiles}, ${cantDiasNoHabiles}, '${fecInsert}', '${usrInsert}', ${idArea}`; 
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
                return res.status(404).json({ message: "No se pudo registrar la solicitud" });
            }

        } catch (error) {
            console.error("Error en la consulta SQL:", error.message);
            return res.status(400).json({ message: "Error al registrar la solicitud" });
        } finally {
            if (pool2) {
                pool2.close(); // Cerrar la conexión
            }
        }
    } else {
        try {
            let estado = 'PENDIENTE';
            let sql = `EXEC spregistrar_solicitud_vacaciones ${idEmpleado}, '${codMes}', '${fecSolicitud}', '${fecInicial}', '${fecFinal}', ${cantDias}, '${estado}', '${detalle}', ${cantDiasHabiles}, ${cantDiasNoHabiles}, '${fecInsert}', '${usrInsert}', ${idArea}`;
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
                return res.status(404).json({ message: "No se pudo registrar la solicitud" });
            }

        } catch (error) {
            console.error("Error en la consulta SQL:", error.message);
            return res.status(400).json({ message: "Error al registrar la solicitud" });
        } finally {
            if (pool2) {
                pool2.close(); // Cerrar la conexión
            }
        }
    }
};

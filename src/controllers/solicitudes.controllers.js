import { getConnection } from "../database/connection.js";

export const obtenerNombreGrupo = async (req, res) => {
    let pool
    const { id_grupo } = req.body;
    try {
      let sql = `spobtener_grupoById '${id_grupo}'`
      pool = await getConnection();
      const result = await pool.request().query(sql);
      const data=result.recordset;
      if (result.recordset && result.recordset.length > 0) {
         return res.status(200).json({
          data
        });
      } else {
        return res
          .status(404)
          .json({ message: "No se pudo obtener el grupo del usuario" });
      }
  
    } catch (error) {
      console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
      return res.status(400).json({ message: "Error al obtener el nombre del grupo" });
    }finally {
      if (pool) {
        pool.close(); // Cerrar la conexión
      }
    }
  };

  export const obtenerIdAsesorSeleccionado = async (req, res) => {
    let pool2
      const { usuario} = req.params;
    try {
      let sql = `spobtener_idByUsuario '${usuario}'`
      pool2 = await getConnection();
      const result2 = await pool2.request().query(sql);
      const data=result2.recordset;
      if (result2.recordset && result2.recordset.length > 0) {
         return res.status(200).json({
          data
        });
      } else {
        return res
          .status(404)
          .json({ message: "No se pudo obtener id_empleado del usuario" });
      }
  
    } catch (error) {
      console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
      return res.status(400).json({ message: "Error al obtener el nombre del grupo" });
    }finally {
      if (poo2) {
        pool2.close(); // Cerrar la conexión
      }
    }
  };
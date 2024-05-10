import { getConnection } from "../database/connection.js";
import sql from "mssql";

export const getJustificaciones = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM justificaciones");
  res.json(result.recordset);
};

export const getJustificacionesBySuper = async (req, res) => {
  
  const { grupo } = req.body;
  console.log(grupo)
  try {
    let sql = `spobtener_justificaciones_by_supervisor '${grupo}'`
    const pool = await getConnection();
    const result = await pool.request().query(sql);
    const data=result.recordset;
    console.log(data)
    if (result.recordset && result.recordset.length > 0) {
       return res.status(200).json({
        data
      });
    } else {
      return res
        .status(404)
        .json({ message: "No se pudo obtener los asesores del supervisor" });
    }
    
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res.status(400).json({ message: "Error al obtener asesores del supervisor" });
  }
};

export const createJustificacion = async (req, res) => {

  const { fecha, asesor, id_empleado,grupo, nivel1, nivel2, nivel3, observacion, minutos_permiso } = req.body;

  console.log(fecha, asesor, grupo, nivel1, nivel2, nivel3, observacion, minutos_permiso,id_empleado);

  try {
    const pool = await getConnection();
    const result = await pool
      .request()      
      .input("asesor", sql.VarChar, asesor)
      .input("grupo", sql.VarChar, grupo)
      .input("nivel1", sql.VarChar, nivel1)
      .input("nivel2", sql.VarChar, nivel2)
      .input("nivel3", sql.VarChar, nivel3)
      .input("fecha", sql.Date, fecha)
      .input("observacion", sql.VarChar, observacion)
      .input("minutos_permiso", sql.Int, minutos_permiso)
      .input("id_empleado", sql.Int, id_empleado)
      .query(
        "INSERT INTO justificaciones (fecha, asesor, grupo, nivel1, nivel2, nivel3,observacion, minutos_permiso, id_empleado) " +
          "VALUES (@fecha, @asesor, @grupo, @nivel1, @nivel2, @nivel3,@observacion, @minutos_permiso, @id_empleado)"
      );
    res.json(result.recordset);  

     
  } catch (error) {
    console.error("Error al crear la justificación:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


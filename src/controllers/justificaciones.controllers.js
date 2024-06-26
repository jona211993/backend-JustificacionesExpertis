import { getConnection } from "../database/connection.js";
import sql from "mssql";

export const getJustificaciones = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM justificaciones");
  res.json(result.recordset);
};

export const getJustificacionesBySuper = async (req, res) => {
  const { grupo , cargo} = req.body;
  console.log("se recibe en body:", grupo, cargo);

  if (grupo == 1) {
    if(cargo==1 || cargo==3 || cargo==4|| cargo==8){
      try {
        console.log("se recibe en body:", grupo);
        let sql = `spobtener_justificaciones_todas`;
        const pool = await getConnection();
        const result = await pool.request().query(sql);
        const data = result.recordset;
        console.log(data);
        if (result.recordset && result.recordset.length >= 0) {
          return res.status(200).json({
            data,
          });
        } else {
          return res
            .status(404)
            .json({ message: "No se pudo obtener los las justif  totales" });
        }
      } catch (error) {
        console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
        return res
          .status(400)
          .json({ message: "Error al obtener justificaciones totales" });
      }
    }
    else{
    try {
      console.log("se recibe en body:", grupo);
      let sql = `spobtener_justificaciones_only_super`;
      const pool = await getConnection();
      const result = await pool.request().query(sql);
      const data = result.recordset;
      console.log(data);
      if (result.recordset && result.recordset.length >= 0) {
        return res.status(200).json({
          data,
        });
      } else {
        return res
          .status(404)
          .json({ message: "No se pudo obtener los asesores del supervisor" });
      }
    } catch (error) {
      console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
      return res
        .status(400)
        .json({ message: "Error al obtener asesores del supervisor" });
    }}
  } else {
    try {
      console.log("se recibe en body:", grupo);
      let sql = `spobtener_justificaciones_by_id_grupo ${grupo}`;
      const pool = await getConnection();
      const result = await pool.request().query(sql);
      const data = result.recordset;
      console.log(data);
      if (result.recordset && result.recordset.length >= 0) {
        return res.status(200).json({
          data,
        });
      } else {
        return res
          .status(404)
          .json({ message: "No se pudo obtener los asesores del supervisor" });
      }
    } catch (error) {
      console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
      return res
        .status(400)
        .json({ message: "Error al obtener asesores del supervisor" });
    }
  }
};

export const createJustificacion = async (req, res) => {
  const {
    fecha,
    asesor,
    id_empleado,
    grupo,
    nivel1,
    nivel2,
    nivel3,
    observacion,
    minutos_permiso,
  } = req.body;

  console.log(
    fecha,
    asesor,
    grupo,
    nivel1,
    nivel2,
    nivel3,
    observacion,
    minutos_permiso,
    id_empleado
  );

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

export const getJustifById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let sql4 = `spobtener_justif_by_id '${id}'`;
    const pool4 = await getConnection();
    const result4 = await pool4.request().query(sql4);
    const data4 = result4.recordset;
    console.log(data4);
    if (data4 && data4.length > 0) {
      return res.status(200).json({ data4 });
    } else {
      return res
        .status(404)
        .json({ message: "No se encontraro justificacion " });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res
      .status(400)
      .json({ message: "Error al obtener la justificacion" });
  }
};

// para eliminar una justificacion
export const deleteJustifById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let sql4 = `spEliminar_justif_by_id '${id}'`;
    const pool4 = await getConnection();
    const result4 = await pool4.request().query(sql4);
    if (result4.rowsAffected[0] > 0) {
      return res.status(200).json({ message: "Justificación eliminada con éxito" });
    } else {
      return res
        .status(404)
        .json({ message: "No se encontró justificación para eliminar" });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res
      .status(400)
      .json({ message: "Error al eliminar la justificación" });
  }
};

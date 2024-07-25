import { getConnection } from "../database/connection.js";
import sql from "mssql";

export const getJustificaciones = async (req, res) => {
  let pool;
  try {
    pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM justificaciones order by fecha desc");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

export const getJustificacionesBySuper = async (req, res) => {
  const { grupo, cargo } = req.body;
  console.log("se recibe en body:", grupo, cargo);

  let pool;
  if (grupo == 1) {
    if (cargo == 1 || cargo == 3 || cargo == 4 || cargo == 8) {
      try {
        console.log("se recibe en body:", grupo);
        let sql = `EXEC spobtener_justificaciones_todas`;
        pool = await getConnection();
        const result = await pool.request().query(sql);
        const data = result.recordset;
        console.log(data);
        if (data && data.length >= 0) {
          return res.status(200).json({ data });
        } else {
          return res.status(404).json({ message: "No se pudo obtener los las justif totales" });
        }
      } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({ message: "Error al obtener justificaciones totales" });
      } finally {
        if (pool) {
          pool.close(); // Cerrar la conexión
        }
      }
    } else {
      try {
        console.log("se recibe en body:", grupo);
        let sql = `EXEC spobtener_justificaciones_only_super`;
        pool = await getConnection();
        const result = await pool.request().query(sql);
        const data = result.recordset;
        console.log(data);
        if (data && data.length >= 0) {
          return res.status(200).json({ data });
        } else {
          return res.status(404).json({ message: "No se pudo obtener los asesores del supervisor" });
        }
      } catch (error) {
        console.error("Error en la consulta SQL:", error.message);
        return res.status(400).json({ message: "Error al obtener asesores del supervisor" });
      } finally {
        if (pool) {
          pool.close(); // Cerrar la conexión
        }
      }
    }
  } else {
    try {
      console.log("se recibe en body:", grupo);
      let sql = `EXEC spobtener_justificaciones_by_id_grupo ${grupo}`;
      pool = await getConnection();
      const result = await pool.request().query(sql);
      const data = result.recordset;
      console.log(data);
      if (data && data.length >= 0) {
        return res.status(200).json({ data });
      } else {
        return res.status(404).json({ message: "No se pudo obtener los asesores del supervisor" });
      }
    } catch (error) {
      console.error("Error en la consulta SQL:", error.message);
      return res.status(400).json({ message: "Error al obtener asesores del supervisor" });
    } finally {
      if (pool) {
        pool.close(); // Cerrar la conexión
      }
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

  let pool;
  try {
    pool = await getConnection();
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
        "INSERT INTO justificaciones (fecha, asesor, grupo, nivel1, nivel2, nivel3, observacion, minutos_permiso, id_empleado) " +
          "VALUES (@fecha, @asesor, @grupo, @nivel1, @nivel2, @nivel3, @observacion, @minutos_permiso, @id_empleado)"
      );
    res.json(result.recordset);
  } catch (error) {
    console.error("Error al crear la justificación:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

export const getJustifById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  let pool;
  try {
    let sql4 = `EXEC spobtener_justif_by_id '${id}'`;
    pool = await getConnection();
    const result4 = await pool.request().query(sql4);
    const data4 = result4.recordset;
    console.log(data4);
    if (data4 && data4.length > 0) {
      return res.status(200).json({ data4 });
    } else {
      return res.status(404).json({ message: "No se encontraron justificaciones" });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({ message: "Error al obtener la justificación" });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

export const deleteJustifById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  let pool;
  try {
    let sql4 = `EXEC spEliminar_justif_by_id '${id}'`;
    pool = await getConnection();
    const result4 = await pool.request().query(sql4);
    if (result4.rowsAffected[0] > 0) {
      return res.status(200).json({ message: "Justificación eliminada con éxito" });
    } else {
      return res.status(404).json({ message: "No se encontró justificación para eliminar" });
    }
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message);
    return res.status(400).json({ message: "Error al eliminar la justificación" });
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

// Para Actualizar los campos de Descuento y Penalidad:
export const UpdateJustificacion = async (req, res) => {
  const {id}=req.params;
  const {descuento, penalidad} = req.body;

  console.log(
    id,
    descuento,
    penalidad
  );

  let pool;
  try {
    pool = await getConnection();
    const result = await pool
      .request()
      .input("descuento", sql.VarChar, descuento)
      .input("penalidad", sql.VarChar, penalidad)
      .input("id", sql.Int, id)
      .query(
        "update justificaciones set descuento=@descuento, penalidad=@penalidad WHERE id=@id"
      );
      return res.status(200).json({ message: "Justificación actualizada correctamente", status: 200 });
  } catch (error) {
    console.error("Error al editar la justificación:", error.message);
    res.status(500).json({ message: "Error interno del servidor" , status: 200});
  } finally {
    if (pool) {
      pool.close(); // Cerrar la conexión
    }
  }
};

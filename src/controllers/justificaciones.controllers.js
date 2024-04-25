import { getConnection } from "../database/connection.js";
import sql from "mssql";

export const getJustificaciones = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM justificaciones");
  res.json(result.recordset);
};

export const getJustificacionesBySuper = async (req, res) => {
  console.log("estamos acaaa")
  console.log(req.user)
  const { grupo } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("grupo", sql.VarChar, grupo)
      .query("SELECT * FROM justificaciones WHERE grupo= @grupo");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res.status(400).json({ message: "No se encontró al usuario" });
  }
};

export const createJustificacion = async (req, res) => {

  
  const { fecha, asesor, grupo, nivel1, nivel2, nivel3, observacion, minutos_permiso } = req.body;

  console.log(fecha);

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
      .query(
        "INSERT INTO justificaciones (fecha, asesor, grupo, nivel1, nivel2, nivel3,observacion, minutos_permiso) " +
          "VALUES (@fecha, @asesor, @grupo, @nivel1, @nivel2, @nivel3,@observacion, @minutos_permiso)"
      );
    res.json(result.recordset);  

     
  } catch (error) {
    console.error("Error al crear la justificación:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};


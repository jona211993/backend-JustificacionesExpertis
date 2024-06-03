import { getConnection } from "../database/connection.js";
import sql from "mssql";

export const getPruebasDeJustificacion = async (req, res) => {
  
    const { id_justificacion } = req.params;
    console.log("El id de la justificacion recibido es = "+id_justificacion)
    try {
        let sql = `spobtener_pruebas_justif '${id_justificacion}'`
        const pool = await getConnection();
        const result = await pool.request().query(sql);
        const data=result.recordset;
        console.log(data)
        if (result.recordset && result.recordset.length >=0) {
           return res.status(200).json({
            data
          });
        } else {
          return res
            .status(404)
            .json({ message: "No se pudo obtener las pruebas de la justificacion" });
        }
        
      } catch (error) {
        console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
        return res.status(400).json({ message: "Error al obtener las pruebas" });
      }
    
};
  

export const createPrueba = async(req,res) =>{
    const { id_justificacion , urlPrueba } = req.body;
  console.log(id_justificacion+urlPrueba)
  try {
    let sql = `sp_insertarEnPrueba '${id_justificacion}' , '${urlPrueba}'`
    const pool = await getConnection();
    const result = await pool.request().query(sql);   
    if (result.rowsAffected[0]=1) {
        console.log("Filas afectadas : "+result.rowsAffected[0])
       return res.status(200).json({
        message:"Insert exitoso"
      });
    } else {
      return res
        .status(404)
        .json({ message: "No se pudo insertar la prueba de la justificacion" });
    }
    
  } catch (error) {
    console.error("Error en la consulta SQL:", error.message); // Agrega esta línea para obtener información detallada del error
    return res.status(400).json({ message: "Error al crear la prueba" });
  }
}
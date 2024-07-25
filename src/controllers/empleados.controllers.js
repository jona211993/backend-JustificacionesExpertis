import { getConnection } from "../database/connection.js";
import sql from "mssql";

export const getAsesoresBySuper = async (req, res) => {
   let pool
  
    const { grupo } = req.body;
    console.log(grupo)
    if(grupo=="ADMIN"){
      try {
        let sql = `spobtener_supervisores`
        pool = await getConnection();
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
        return res.status(400).json({ message: "Error a  los super como  asesores" });
      }finally {
        if (pool) {
          pool.close(); // Cerrar la conexión
        }
      }
    }
    else{
      let pool
      try {
        let sql = `spobtener_asesores_by_supervisor '${grupo}'`
        pool = await getConnection();
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
      }finally {
        if (pool) {
          pool.close(); // Cerrar la conexión
        }
      }
    }
  };
  
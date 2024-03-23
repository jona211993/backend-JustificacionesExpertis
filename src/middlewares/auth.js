import { getConnection } from "../database/connection.js";

//Jonatan Pacora Vega
// Esta funcion es para verificacion la existencia de un usuario con el mismo username
// O si el correo ya existe en la base de datos
export const checkExistingUser = async (req, res, next) => {
  try {
    //para el alias
    console.log(req.body.usuario);
    let sql = `EXECUTE spobtener_usuario_by_alias '${req.body.usuario}'`;
    const pool = await getConnection();
    const result= await pool.request().query(sql);
    let userFound = result.recordset;
    if (userFound.length==1){
       console.log(userFound)
      return res.status(400).json({ message: "El usuario ya existe" });}

        // Para el dni:
        let sql2 = `EXECUTE spobtener_usuario_by_dni '${req.body.dni}'`;
        const pool2 = await getConnection();
        const result2= await pool.request().query(sql2);
        let userFound2 = result.recordset;
        if (userFound2.length==1){
           console.log(userFound2)
          return res.status(400).json({ message: "Ya existe un usuario con ese DNI"});}
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

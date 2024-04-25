import { getConnection } from "../database/connection.js";
import jwt from 'jsonwebtoken'
import config from "../config.js";
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
        const result2= await pool2.request().query(sql2);
        let userFound2 = result2.recordset;
        if (userFound2.length==1){
           console.log(userFound2)
          return res.status(400).json({ message: "Ya existe un usuario con ese DNI"});}
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken= async (req, res, next) => {
  try {
     const {token}= req.cookies;     
     if(!token) return res.status(403).json({message:"No se encontró el token"})
    
        const decoded = jwt.verify(token,config.SECRET, (err, user)=> {
          if (err) return res.status(403).json({message: "Token invalido"});
          req.user= user;
          next()
        })
       
             
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor ", message: error.message });
  }
};
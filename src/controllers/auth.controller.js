import { getConnection } from "../database/connection.js";
import jwt from "jsonwebtoken";
import config from "../config.js";

export const signUp = async (req, res) => {
  try {
    const {
      id_cargo,
      dni,
      nombre,
      apellido1,
      apellido2,
      direccion,
      telefono,
      fec_ingreso,
      usuario,
      password,
    } = req.body;
    let sql = `spRegistrar_usuario '${id_cargo}', '${dni}', '${nombre}', '${apellido1}', '${apellido2}', '${direccion}', '${telefono}', '${fec_ingreso}', '${usuario}', '${password}'`;
    const pool = await getConnection();
    const result = await pool.request().query(sql);

    // Verifica si hay datos en el recordset
    if (result.recordset && result.recordset.length > 0) {
      let id = result.recordset[0].id;
      return res.status(200).json({
        id_empleado: id,
        id_cargo,
        dni,
        nombre,
        apellido1,
        apellido2,
        direccion,
        telefono,
        fec_ingreso,
        usuario,
      });
    } else {
      return res
        .status(404)
        .json({ message: "No se pudo obtener el usuario creado." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const signIn = async (req, res) => {
 try {
  const { usuario, password } = req.body;
  let sql = `SELECT * FROM empleado where usuario='${usuario}' and contrasenia='${password}'`;
  const pool = await getConnection();
  const result = await pool.request().query(sql);
  let usuarioEncontrado = result.recordset[0];  
  console.log(usuarioEncontrado)
  if (usuarioEncontrado) {
      const token = jwt.sign(
      {
        _id: usuarioEncontrado.id,
        id_cargo: usuarioEncontrado.id_cargo,
        alias: usuarioEncontrado.usuario,
        nombre: usuarioEncontrado.nombre,

      },
      config.SECRET,
      {
        expiresIn: 86400,
      }
    );
    res.cookie("token", token)
    res.status(200).json({ 
      message: "Login correcto",token });
  } else {
    return res.status(400).json([ "Credenciales incorrectas"]);
  }
 } catch (error) {
  console.error(error);
    return res.status(500).json({ error: "Error interno del servidor : "+ error.message });
 }

  
};

export const logout = (req,res)=> {
  res.cookie('token',"", {
    expires: new Date(0),
  });

  return res.sendStatus(200)
}


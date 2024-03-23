export const signUp = async (req, res) => {
 try {
  const {
    nombre,
    dni,
    apellido1,
    apellido2,
    direccion,
    telefono,
    fec_ingreso,
    usuario,
    password,
  } = req.body;
  
  res.send("signUp");
 } catch (error) {
  console.error(error);
 }
};

export const signIn = async (req, res) => {
  res.send("signIn");
};

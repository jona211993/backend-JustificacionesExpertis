import { getConnection } from "../database/connection.js";
export const getmatriz = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM matriz_justificaciones");
  res.json(result.recordset);
};

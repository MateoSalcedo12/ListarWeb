const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = process.env.DATABASE_URL
  ? { uri: process.env.DATABASE_URL }
  : {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "123456",
      database: process.env.DB_NAME || "escuela",
    };

const dbOptions = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : { ...dbConfig, ssl: process.env.DB_HOST ? { rejectUnauthorized: false } : undefined, connectTimeout: 30000 };

let db = mysql.createConnection(dbOptions);

db.on("error", (err) => {
  console.error("MySQL error:", err.code);
  if (err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ETIMEDOUT") {
    console.log("Reconectando a MySQL...");
    db = mysql.createConnection(dbOptions);
  }
});

const JWT_SECRET = process.env.JWT_SECRET || "1234";

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña requeridos" });
  }

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Error del servidor" });
    if (results.length === 0) return res.status(401).json({ error: "Credenciales incorrectas" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ error: "Credenciales incorrectas" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });
    res.json({ token });
  });
});

app.get("/estudiantes", (req, res) => {
  db.query("SELECT id, nombre, apellido, email, fecha_nacimiento FROM estudiante", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend corriendo en ${PORT}`));

import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import UsuarioRouter from "./routes/usuario.routes.js";
import TarefaRouter from "./routes/tarefa.routes.js";
import dotenv from "dotenv";
import { setupAssociations } from "./models/associations.js";

const app = express();
dotenv.config();
const PORT = 3000;

setupAssociations();

app.use(cors());
app.use(express.json())

app.use("/usuarios", UsuarioRouter);
app.use("/tarefas", TarefaRouter);

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Rodando na porta: ${PORT}`));
});
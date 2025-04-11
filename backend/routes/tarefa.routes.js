import { Router } from "express";
import {
    GetAllTarefasHandler,
    GetTarefaByIdHandler,
    CreateTarefaHandler,
    UpdateTarefaHandler,
    DeleteTarefaHandler,
    GetTarefaByUsuarioId
} from "../controllers/tarefa.controller.js"

const router = Router();

router.get("/usuario/:id", GetTarefaByUsuarioId)
router.get("/", GetAllTarefasHandler);
router.get("/:id", GetTarefaByIdHandler);
router.post("/", CreateTarefaHandler);
router.put("/:id", UpdateTarefaHandler);
router.delete("/:id", DeleteTarefaHandler);

export default router
import { Router } from "express";
import {
    GetAllUsuariosHandler,
    GetUsuarioByIdHandler,
    CreateUsuarioHandler,
    UpdateUsuarioHandler,
    DeleteUsuarioHandler,
    LoginUsuarioHandler
} from "../controllers/usuario.controller.js";

const router = Router();

router.get("/", GetAllUsuariosHandler);
router.get("/:id", GetUsuarioByIdHandler);
router.post("/", CreateUsuarioHandler);
router.put("/:id", UpdateUsuarioHandler);
router.delete("/:id", DeleteUsuarioHandler);
router.post("/login", LoginUsuarioHandler);

export default router
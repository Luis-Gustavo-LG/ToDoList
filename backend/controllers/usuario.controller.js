import Usuario from "../models/usuario.model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET = process.env.JWT_SECRET;

export const GetAllUsuariosHandler = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
}

export const GetUsuarioByIdHandler = async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ message: `Usuario com ID ${req.params.id} não encontrado`});
    res.json(usuario);
};

export const CreateUsuarioHandler = async (req, res) => {
    const { nome, email, senha} = req.body;

    try {
        const NewUsuario = await Usuario.create({ nome, email, senha });
        res.status(201).json(NewUsuario);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

export const UpdateUsuarioHandler = async (req, res) => {
    const { nome, email, senha } = req.body
    const usuarioAtualizada = await Usuario.findByPk(req.params.id)
    if (!usuarioAtualizada) return res.status(404).json({ message: `Usuario com ID ${req.params.id} não encontrado`});

    usuarioAtualizada.nome = nome ?? usuarioAtualizada.nome;
    usuarioAtualizada.email = email ?? usuarioAtualizada.email;
    usuarioAtualizada.senha = senha ?? usuarioAtualizada.senha

    try {
        await usuarioAtualizada.save();
        res.json(usuarioAtualizada);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

export const DeleteUsuarioHandler = async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id)
    if (!usuario) return res.status(404).json({ message: `Usuario com ID ${req.params.id} não encontrado`});

    await usuario.destroy();
    res.status(204).send();
};

export const LoginUsuarioHandler = async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } })

    if(!usuario || usuario.senha !== senha) {
        return res.status(401).json({ message: "Credenciais inválidas" })
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, {
        expiresIn: '1h'
    });

    res.json({ token, usuario });
};
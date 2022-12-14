import Usuario from "../models/usuario.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { generarJWT } from "../middleware/validartoken.js"
import { validate } from "class-validator" //descargar
import enviar from "../database/mailer.js"
const usuarioGet = async (req, res) => {  //buscar todos
    const usuarios = await Usuario.find()
    res.json({
        usuarios
    })
}
const idusuarioGet = async (req, res) => { //buscar por id
    const { _id } = req.params
    try {
        const usuarios = await Usuario.findById({ _id }).populate("ciudad")
        res.json({
            usuarios
        })
    } catch (error) {
        return res.status(404).json({ msg: 'Hable con el WebMaster' })
    }

}
const GetNombre = async (req, res) => {  //buscar por titulo
    const { nombre } = req.params
    try {
        const usuarios = await Usuario.find(
            {
                $or: [
                    { nombre: new RegExp(`^${nombre}`, "i") },
                ]
            }
        )
        if (usuarios)
            res.json({ usuarios })
        else
            res.json(`${nombre} No encontrado`)
    } catch (error) {
        return res.status(404).json({ msg: 'Hable con el WebMaster' })
    }
}
const GetRol = async (req, res) => {  //buscar por titulo
    const { rol } = req.params
    try {
        const usuarios = await Usuario.find(
            {
                $or: [
                    { rol: new RegExp(`^${rol}`, "i") },
                ]
            }
        )
        if (usuarios)
            res.json({ usuarios })
        else
            res.json(`${rol} No encontrado`)
    } catch (error) {
        return res.status(404).json({ msg: 'Hable con el WebMaster' })
    }
}
const usuarioPost = async (req, res) => { //añadir
    const { nombre, funcionario, documento, direccion, ciudad, contacto, telefonoCo, celular, email, rol, password} = req.body
    let pass = documento
    try{
        const usuario = new Usuario({ nombre, funcionario, documento, direccion, ciudad, telefonoCo, celular, contacto, email, rol, password:documento })
        try{
        const salt = bcryptjs.genSaltSync(10)
        usuario.password = bcryptjs.hashSync(pass, salt)
        usuario.save()
        res.json({ usuario })
        } catch (error) {
            return res.status(404).json({ msg: 'No se puedo guardar contraseña' })
        }
    } catch (error) {
        return res.status(404).json({ msg: 'Hable con el WebMaster' })
    }
}
const modificaDatos = async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, estado,password, ...resto } = req.body;
    try {
        const articulo = await Usuario.findByIdAndUpdate(id, resto);

        res.json({
            articulo
        })
    } catch (error) {
        return res.status(404).json({ msg: 'Hable con el WebMaster' })
    }
}
const UsuarioPutActivate = async (req, res) => {
    const { id } = req.params;
    try {
        const activo = await Usuario.findByIdAndUpdate(id, { estado: 1 });

        res.json({
            activo
        })
    } catch (error) {
        return res.status(404).json({ msg: 'Hable con el WebMaster' })
    }
}
const UsuarioPutDeActivate = async (req, res) => {
    const { id } = req.params;
    try {
        const desactivo = await Usuario.findByIdAndUpdate(id, { estado: 0 });

        res.json({
            desactivo
        })
    } catch (error) {
        return res.status(404).json({ msg: 'Hable con el WebMaster' })
    }
}
const recuperar = async (req, res) => {
    const { email } = req.body
    const message = 'Revisa tu correo electrónico '
    let verificationLink
    try {
        const user = await Usuario.findOne({ email })
        //console.log('user: ' + user); 

        const token = jwt.sign({ idUsuario: user._id, nombre: user.nombre }, process.env.CLAVERESETTOKEN)
        //console.log("verificar" + token)
        verificationLink = `
      http://localhost:27017/api/usuario/cambiar`
        user.resetToken = token
        console.log("token: " + user.resetToken);

        try {
            const modificar = await Usuario.findByIdAndUpdate(user._id, { resetToken: token });
            if (!modificar) {
                return res
                    .status(500)
                    .json({ msg: "No se pudo insertar el token" });
            }

        } catch (error) {
            return res.status(500).json({ msg: "Error al ingresar la token" });
        }
    } catch (error) {
        return res.status(404).json({ msg: 'Hable con el WebMaster' })
    }


    try {
        await enviar.sendMail({
            from: '"Recuperación de la contraseña" <ardilablancoangieyuliana@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Presione el link para poder cambiar tu contraseña, El link solo tiene validez por 10 minutos", // Subject line
            html: `Link: ${verificationLink}`, // html body
        });

    } catch (error) {
        return res.status(500).json({ msg: "No se pudo enviar correo de verificacion" });
    }
    res.json({ msg: message })




}
const usuarioLogin = async (req, res) => { // login
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos"
            })
        }


        if (usuario.estado === 0) {
            return res.status(400).json({
                msg: "Usuario Inactivo"
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos"
            })
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Hable con el WebMaster"
        })
    }
}
const cambiar = async (req, res) => {
    const { nuevaPassword } = req.body;
    const resetToken = req.header('reset')
    console.log("hola", resetToken)
    try {
        const verificar = jwt.verify(resetToken, process.env.CLAVERESETTOKEN)
        console.log(verificar.idUsuario);
        const user = await Usuario.findOne({ _id: verificar.idUsuario })
        console.log(user);

        if (!user) {
            return res.status(401).json({
                msg: "Token no válido "
            })
        }
        user.password = nuevaPassword
        const salt = bcryptjs.genSaltSync(10);
        user.password = bcryptjs.hashSync(nuevaPassword, salt);

        try {
            const modificar = await Usuario.findByIdAndUpdate(user._id, { password: user.password });
            if (!modificar) {
                return res
                    .status(500)
                    .json({ msg: "No se pudo actualizar la contraseña del usuario" });
            }

        } catch (error) {
            return res.status(500).json({ msg: "Error al actualizar la contraseña" });
        }

        res.json({ msg: 'Contraseña cambiada exitosamente' })

    } catch (error) {
        return res.status(500).json({ msg: 'Hable con el WebMaster' })
    }


}

export { cambiar, recuperar, usuarioGet, idusuarioGet, GetNombre, GetRol, usuarioPost, modificaDatos, UsuarioPutActivate, UsuarioPutDeActivate, usuarioLogin }
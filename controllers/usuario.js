import Usuario from "../models/usuario.js"
import bcryptjs from "bcryptjs"
import { generarJWT } from "../middleware/validartoken.js"


const usuarioGet= async(req,res)=>{  //buscar todos
    const usuarios =await Usuario.find()
    res.json({
        usuarios
    })
}

const idusuarioGet= async(req,res)=>{ //buscar por id
    const{_id}=req.params
    const usuarios =await Usuario.findById({_id}).populate("ciudad")
    res.json({
        usuarios
    })
}

const GetNombre= async(req,res)=>{  //buscar por titulo
  const {nombre}=req.params
  const usuarios=await Usuario.find(
    {
      $or:[
        {nombre:new RegExp(nombre,"i")},
      ]
    }
  )
  if (usuarios)
      res.json({usuarios})
  else
      res.json(`${nombre} No encontrado`)
}
const GetRol= async(req,res)=>{  //buscar por titulo
  const {rol}=req.params
  const usuarios=await Usuario.find(
    {
      $or:[
        {rol:new RegExp(rol,"i")},
      ]
    }
  )
  if (usuarios)
      res.json({usuarios})
  else
      res.json(`${rol} No encontrado`)
}
const usuarioPost=async(req,res)=>{ //añadir
    const{nombre,documento,direccion,ciudad,contacto,telefonoCo,celular,email,rol,password}=req.body
    const usuario= new Usuario({nombre,documento,direccion,ciudad,telefonoCo,celular,contacto,email,rol,password})
    const salt= bcryptjs.genSaltSync(10)
    usuario.password=bcryptjs.hashSync(password,salt)
    usuario.save()
    res.json({usuario})
}




const modificaDatos = async (req, res) => {   
    const { id } = req.params;  
    const { _id, createdAt,estado, ...resto } = req.body;
    
    const articulo = await Usuario.findByIdAndUpdate(id, resto);
  
    res.json({
        articulo
    })
}

const UsuarioPutActivate=async (req, res) => {   
    const { id } = req.params;
    const activo = await Usuario.findByIdAndUpdate(id, {estado:1});

    res.json({
        activo
    })
}

const UsuarioPutDeActivate=async (req, res) => {   
    const { id } = req.params;
    const desactivo = await Usuario.findByIdAndUpdate(id, {estado:0});

    res.json({
        desactivo
    })
}

const usuarioLogin= async(req,res)=>{ // login
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

export {usuarioGet,idusuarioGet,GetNombre,GetRol,usuarioPost,modificaDatos,UsuarioPutActivate,UsuarioPutDeActivate,usuarioLogin}
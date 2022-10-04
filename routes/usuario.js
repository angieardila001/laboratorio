import {Router} from "express"
import { usuarioGet,idusuarioGet,GetNombre,GetRol,usuarioPost,modificaDatos,UsuarioPutActivate,UsuarioPutDeActivate,usuarioLogin} from "../controllers/usuario.js"
import {validarCampos} from "../middleware/middleware.js"
import helpersUsuarios from "../helper/usuario.js"
import { check } from "express-validator"
import { validarJWT } from "../middleware/validartoken.js"

const router=new Router()

router.get('/', usuarioGet) //listar todos

router.get('/nombre',[
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('nombre', 'el nombre debe tener maximo 25 caracteres').isLength({ max: 25}),
    validarCampos
],
GetNombre)  //buscar por nombre

router.get('/rol',[
    validarJWT,
    check('rol', 'el rol es obligatorio').not().isEmpty(),
    check('rol', 'el rol debe tener maximo 25 caracteres').isLength({ max: 25}),
    validarCampos
],
GetRol)  //buscar por rol

router.get('/id/:id',[
    validarJWT,
    check('id', 'ingrese el id').not().isEmpty(),
    check('id').custom( helpersUsuarios.existeUsuarioById ),
    validarCampos
],
idusuarioGet) //buscar por id


router.post('/login',[
    
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'Password no es válido').not().isEmpty(),
    validarCampos
], usuarioLogin )  // login

router.post('/post',[
      
    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    check('nombre', 'el nombre debe tener maximo 25 caracteres').isLength({ max: 25}),

    check('documento', 'El documento es obligatorio!').not().isEmpty(),
    check('documento', 'El documento debe tener 25 caracteres').isLength({ max: 25}),


    check('direccion', 'La direccion es obligatorio!').not().isEmpty(),
    check('direccion', 'La direccion debe tener 50 caracteres').isLength({ max: 50}),

    check('ciudad', 'La ciudad es obligatorio!').not().isEmpty(),
   

    check('telefonoCo', 'El telefono es obligatorio!').not().isEmpty(),
    check('telefonoCo','el telefono debe de tener maximo 14 caracteres').isLength({ max: 14}),

    check('celular', 'El telefono es obligatorio!').not().isEmpty(),
    check('celular','el telefono debe de tener maximo 14 caracteres').isLength({ max: 14}),

    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( helpersUsuarios.existeEmail ),

    check('password', 'llene el campo de contraseña').not().isEmpty(),
    check('password', 'Password no es válido').isLength({ min: 8}),

    check('rol', 'llene el campo de rol').not().isEmpty(),
    check('rol', 'rol no es válido').isLength({ max: 25}),
    validarCampos       
], usuarioPost) //añadir

router.put('/modificar/:id',[
    validarJWT,
    check('id','ingresa el id').not().isEmpty(),
    check('id').custom( helpersUsuarios.existeUsuarioById),
    validarCampos
],modificaDatos)

router.put('/activo/:id',[
    validarJWT,
    check('id', 'ingrese el id').not().isEmpty(),
    check('id').custom( helpersUsuarios.existeUsuarioById ),
    validarCampos

],UsuarioPutActivate)

router.put('/inactivo/:id',[
    validarJWT,
    check('id', 'ingrese el id').not().isEmpty(),
    check('id').custom( helpersUsuarios.existeUsuarioById ),
    validarCampos
],UsuarioPutDeActivate)



export default router
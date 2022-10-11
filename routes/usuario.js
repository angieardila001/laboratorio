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
    check('nombre', 'El nombre es obligatorio!!').not().isEmpty(),
    check('nombre', 'El nombre debe tener máximo 25 caracteres').isLength({ max: 25}),
    validarCampos
],
GetNombre)  //buscar por nombre

router.get('/rol',[
    validarJWT,
    check('rol', 'El rol es obligatorio!!').not().isEmpty(),
    validarCampos
],
GetRol)  //buscar por rol

router.get('/id/:id',[
    validarJWT,
    check('id', 'Ingrese el usuario').not().isEmpty(),
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
    check('nombre', 'El nombre debe tener máximo 25 caracteres').isLength({ max: 25}),

    check('documento', 'El documento es obligatorio!').not().isEmpty(),
    check('documento', 'El documento debe tener 25 caracteres').isLength({ max: 25}),


    check('direccion', 'La dirección es obligatorio!').not().isEmpty(),
    check('direccion', 'La dirección debe tener 50 caracteres').isLength({ max: 50}),

    check('ciudad', 'La ciudad es obligatoria!').not().isEmpty(),
   

    check('telefono', 'El teléfono es obligatorio!').not().isEmpty(),
    check('telefono','El teléfono debe de tener máximo 14 caracteres').isLength({ max: 14}),

    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( helpersUsuarios.existeEmail ),

    check('password', 'Llene el campo de contraseña').not().isEmpty(),
    check('password', 'Password no es válido').isLength({ min: 8}),

    check('rol', 'Llene el campo de rol').not().isEmpty(),
    check('rol', 'Rol no es válido').isLength({ max: 25}),
    validarCampos       
], usuarioPost) //añadir

router.put('/modificar/:id',[
    validarJWT,
    check('id','Ingresa el usuario a modificar').not().isEmpty(),
    check('id').custom( helpersUsuarios.existeUsuarioById),
    validarCampos
],modificaDatos)

router.put('/activo/:id',[
    validarJWT,
    check('id', 'Ingrese el usuario activo').not().isEmpty(),
    check('id').custom( helpersUsuarios.existeUsuarioById ),
    validarCampos

],UsuarioPutActivate)

router.put('/inactivo/:id',[
    validarJWT,
    check('id', 'Ingrese el usuario inactivo').not().isEmpty(),
    check('id').custom( helpersUsuarios.existeUsuarioById ),
    validarCampos
],UsuarioPutDeActivate)

export default router
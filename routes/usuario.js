import {Router} from "express"
import {cambiar, recuperar,usuarioGet,idusuarioGet,GetNombre,GetRol,usuarioPost,modificaDatos,UsuarioPutActivate,UsuarioPutDeActivate,usuarioLogin} from "../controllers/usuario.js"
import {validarCampos} from "../middleware/middleware.js"
import helpersUsuarios from "../helper/usuario.js"
import { check } from "express-validator"
import { validarJWT , validarResetJWT } from "../middleware/validartoken.js"

const router=new Router()

router.get('/', usuarioGet) //listar todos

router.get('/nombre',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio!!').not().isEmpty(),
    check('nombre', 'El nombre debe tener máximo 25 caracteres').isLength({ max: 25}),
    validarCampos
],
GetNombre)  //buscar por nombre


router.get('/rol/:rol',[
    validarJWT,
    check('rol', 'El rol es obligatorio!!').not().isEmpty(),
    validarCampos
],
GetRol)  //buscar por rol

router.get('/id/:_id',[
    validarJWT,
    check('_id', 'Ingrese el usuario').not().isEmpty(),
    check('_id').custom( helpersUsuarios.existeUsuarioById ),
    validarCampos
],
idusuarioGet) //buscar por id


router.post('/login',[
    
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'Password no es válido').not().isEmpty(),
    validarCampos
], usuarioLogin )  // login
router.put('/recuperar',[
    
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( helpersUsuarios.existeEmail ),
    validarCampos
], recuperar )  // recuperar
router.put('/cambiar',[
    validarResetJWT,
    
    check('nuevaPassword', 'Digite por favor la nueva contraseña!').not().isEmpty(),
    validarCampos
], cambiar )  // login
router.post('/post',[
      


    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    check('nombre', 'El nombre debe tener máximo 25 caracteres').isLength({ max: 25}),

    check('documento', 'El documento es obligatorio!').not().isEmpty(),
    check('documento', 'El documento debe maximo tener 25 caracteres').isLength({ max: 25}),
    check('documento').custom( helpersUsuarios.existeDocumento ),
    
    check('funcionario', 'El funcionario debe tener 25 caracteres').isLength({ max: 25}),

    check('direccion', 'La dirección es obligatorio!').not().isEmpty(),
    check('direccion', 'La dirección debe maximo tener 50 caracteres').isLength({ max: 50}),

    check('ciudad', 'La ciudad es obligatoria!').not().isEmpty(),
   

    check('telefonoCo', 'El teléfono es obligatorio!').not().isEmpty(),
    check('telefonoCo','El teléfono debe de tener minimo 7 caracteres').isLength({ min: 7}),

    check('celular', 'El celular es obligatorio!').not().isEmpty(),
    check('celular','El celular debe de tener máximo 7 caracteres').isLength({ min: 7}),

    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( helpersUsuarios.existeEmail ),
    check('email','El correo debe de tener máximo 50 caracteres').isLength({ max: 50}),

   

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
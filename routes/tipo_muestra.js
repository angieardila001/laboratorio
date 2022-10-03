import {Router} from "express"
import { tipoGet,tipoPut,tipoPost,GetTipos,idtipoGet} from "../controllers/tipo_muestra.js"
import {validarCampos} from "../middleware/middleware.js"
import { check } from "express-validator"
import { validarJWT } from "../middleware/validartoken.js"
import helpersTipo_muestra from "../helper/tipo_muestra.js"

const router=new Router()

router.get('/', tipoGet) //listar todos

router.get('/id/:id',[
    validarJWT,
    check('id', 'ingrese el id').not().isEmpty(),
    check('id').custom( helpersTipo_muestra.existetipoMuestraById ),
    validarCampos
],
idtipoGet) //buscar por id


router.get('/tipomuestra',[
    validarJWT,
    check('tipos', 'el tipoMuestra es obligatorio').not().isEmpty(),
    check('tipos', 'el tipoMuestra debe tener maximo 25 caracteres').isLength({ max: 25}),
    validarCampos
],
GetTipos)  //buscar por nombre


router.post('/post',[
    validarJWT,
    check('tipos', 'El tipo de muestra es obligatorio!').not().isEmpty(),
    check('tipos', 'el tipo de muestra debe tener maximo 25 caracteres').isLength({ max: 25}),
    validarCampos       
], tipoPost) //añadir

router.put('/modificar/:id',[
    validarJWT,
    check('id','ingresa el id').not().isEmpty(),
    check('id').custom( helpersTipo_muestra.existetipoMuestraById ),
    validarCampos
],tipoPut)


export default router
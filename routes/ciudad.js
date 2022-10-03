import {Router} from "express"
import { idciudadGet,ciudadGet,GetCodigoCi,GetCodigoDepa,departamento} from "../controllers/ciudad.js"
import {validarCampos} from "../middleware/middleware.js"
import helpersCiudades from "../helper/ciudad.js"
import { check } from "express-validator"
import { validarJWT } from "../middleware/validartoken.js"

const router=new Router()

router.get('/', ciudadGet) //listar todos

router.get('/id/:_id',[
    validarJWT,
    check('_id', 'ingrese el id').not().isEmpty(),
    check('_id').custom( helpersCiudades.existeCiudadById ),
    validarCampos
],
idciudadGet) //buscar por id

router.get('/depa/:iddepartamento',[
    validarJWT,
    check('iddepartamento', 'el codigodedepartamento es obligatorio').not().isEmpty(),
    check('iddepartamento', 'el codigodedepartamento debe tener maximo 25 caracteres').isLength({ max: 25}),
    validarCampos
],
GetCodigoDepa)  //buscar por codigo de departamento

router.get('/ciu/:departamento',[

    check('departamento', 'el codigociudad es obligatorio').not().isEmpty(),
    check('departamento', 'el codigociudad debe tener maximo 25 caracteres').isLength({ max: 25}),
    validarCampos
],
GetCodigoCi)  //buscar por codigo de departamento
router.get('/departamento',departamento) 
export default router
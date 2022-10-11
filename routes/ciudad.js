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
    check('_id', 'Ingrese la ciudad').not().isEmpty(),
    check('_id').custom( helpersCiudades.existeCiudadById ),
    validarCampos
],
idciudadGet) //buscar por id

router.get('/depa/:codigodedepartamento',[
    validarJWT,
    check('codigodedepartamento', 'El código de departamento es obligatorio').not().isEmpty(),
    check('codigodedepartamento', 'El código de departamento debe tener máximo 25 caracteres').isLength({ max: 25}),
    validarCampos
],
GetCodigoDepa)  //buscar por codigo de departamento

router.get('/ciu/:ciudad',[
    validarJWT,
    check('ciudad', 'El código ciudad es obligatorio').not().isEmpty(),
    check('ciudad', 'El código ciudad debe tener máximo 25 caracteres').isLength({ max: 25}),
    validarCampos
],
GetCodigoCi)  //buscar por codigo de departamento

router.get('/departamento',departamento) 
export default router
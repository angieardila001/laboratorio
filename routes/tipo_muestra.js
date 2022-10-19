import {Router} from "express"
import { tipoGet,tipoPut,tipoPost,GetTipos,idtipoGet} from "../controllers/tipo_muestra.js"
import {validarCampos} from "../middleware/middleware.js"
import { check } from "express-validator"
import { validarJWT } from "../middleware/validartoken.js"
import helpersTipo_muestra from "../helper/tipo_muestra.js"

const router=new Router()

router.get('/', tipoGet) //listar todos

router.get('/id/:_id',[
    validarJWT,
    check('_id', 'Ingrese el tipo de muestra').not().isEmpty(),
    check('_id').custom( helpersTipo_muestra.existetipoMuestraById ),
    validarCampos
],
idtipoGet) //buscar por id


router.get('/tipomuestra/:tipos',[
    validarJWT,
    check('tipos', 'El tipo de muestra es obligatorio!').not().isEmpty(),
    check('tipos', 'El tipo de muestra debe tener máximo 25 caracteres').isLength({ max: 25}),
    validarCampos
],
GetTipos)  //buscar por nombre


router.post('/post',[
    validarJWT,
    check('tipos', 'El tipo de muestra es obligatorio!').not().isEmpty(),
    check('tipos', 'El tipo de muestra debe tener máximo 25 caracteres').isLength({ max: 25}),
    validarCampos       
], tipoPost) //añadir

router.put('/modificar/:id',[
    validarJWT,
    check('id','Ingresa el tipo de muestra a modificar').not().isEmpty(),
    check('id').custom( helpersTipo_muestra.existetipoMuestraById ),
    validarCampos
],tipoPut)


export default router
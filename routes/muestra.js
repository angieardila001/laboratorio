import {Router} from "express"
import {Getcodigo,Getciudad,muestraGet,idmuestraGet,GetTipo,muestraPost,modificaPut,PutActivate,PutDeActivate} from "../controllers/muestra.js"
import {validarCampos} from "../middleware/middleware.js"
import helpersMuestras from "../helper/muestra.js"
import helpersCiudades from "../helper/ciudad.js"
import usuario  from "../helper/usuario.js"
import tipo from "../helper/tipo_muestra.js"
import { check } from "express-validator"
import { validarJWT } from "../middleware/validartoken.js"

const router=new Router()

router.get('/', muestraGet) //listar todos

router.get('/id/:_id',[
    validarJWT,
    check('_id', 'ingrese el id').not().isEmpty(),
    check('_id').custom( helpersMuestras.existeMuestraById ),
    validarCampos
],
idmuestraGet) //buscar por id
router.get('/codmuestra/:codMuestra',[
    validarJWT,
    check('codMuestra', 'el codMuestra es obligatorio').not().isEmpty(),
    check('codMuestra', 'el codMuestra debe tener maximo 25 caracteres').isLength({ max: 25}),
    validarCampos
],
Getcodigo)  //buscar por codigo de muestra

router.get('/ciudad/:id',[
    validarJWT,
    check('id', 'ingrese el id').not().isEmpty(),
    check('id').custom( helpersCiudades.existeCiudadById),
    
    validarCampos
],
Getciudad)  //buscar por rol

router.get('/tipomuestra/:id',[
    validarJWT,
    check('id', 'el tipoMuestra es obligatorio').not().isEmpty(),

    validarCampos
],
GetTipo)  //buscar por nombre




router.post('/post',[
      
    check('solicitante', 'El solicitante es obligatorio!').not().isEmpty(),
    check('solicitante').custom( usuario. existeUsuarioById ),

    
    check('numRecoleccion', 'El numRecoleccion  es obligatorio!').not().isEmpty(),
    check('numRecoleccion').custom( helpersCiudades.existeCiudadById),

    check('direccionTomaMuestra', 'El direccionTomaMuestra es obligatorio!').not().isEmpty(),
    check('direccionTomaMuestra', 'el direccionTomaMuestra debe tener maximo 30 caracteres').isLength({ max: 30}),

    check('lugarTomaMuestra', 'El lugarTomaMuestra es obligatorio!').not().isEmpty(),
    check('lugarTomaMuestra', 'el lugarTomaMuestra debe tener maximo 30 caracteres').isLength({ max: 30}),

    check('muestraRecolectadaPor', 'El muestraRecolectadaPor es obligatorio!').not().isEmpty(),
    check('muestraRecolectadaPor', 'el muestraRecolectadaPor debe tener maximo 30 caracteres').isLength({ max: 30}),

    check('procedimientoMuestreo', 'El procedimientoMuestreo es obligatorio!').not().isEmpty(),
    check('procedimientoMuestreo', 'el procedimientoMuestreo debe tener maximo 30 caracteres').isLength({ max: 30}),

    check('tipoMuestra', 'El tipoMuestra es obligatorio!').not().isEmpty(),
    check('tipoMuestra').custom( tipo.existetipoMuestraById),

    check('fechaRecoleccion', 'El fechaRecoleccion es obligatorio!').not().isEmpty(),
    check('fechaRecoleccion', 'el fechaRecoleccion debe tener maximo 30 caracteres').isLength({ max: 30}),

    check('cotizacion', 'La cotización es obligatoria!').not().isEmpty(),



       
    check('estado', 'el estado debe tener maximo 30 caracteres').isLength({ max: 30}),
    validarCampos       
], muestraPost) //añadir

router.put('/modificar/:id',[
    validarJWT,
    check('id','ingresa el id').not().isEmpty(),
    check('id').custom( helpersMuestras.existeMuestraById ),
    validarCampos
],modificaPut)


router.put('/activar/:id',[
    validarJWT,
    check('id','ingresa el id').not().isEmpty(),
    check('id').custom( helpersMuestras.existeMuestraById ),
    validarCampos
],PutActivate)

router.put('/desactivar/:id',[
    validarJWT,
    check('id','ingresa el id').not().isEmpty(),
    check('id').custom( helpersMuestras.existeMuestraById ),
    validarCampos
],PutDeActivate)
export default router
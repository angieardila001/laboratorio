import {Router} from "express"
import {Getcodigo,Getciudad,muestraGet,idmuestraGet,GetTipo,muestraPost,modificaPut,PutActivate,PutDeActivate} from "../controllers/muestra.js"
import {validarCampos} from "../middleware/middleware.js"
import helpersMuestras from "../helper/muestra.js"
import helpersCiudades from "../helper/ciudad.js"
import servicio from "../helper/servicio.js"
import usuario  from "../helper/usuario.js"
import tipo from "../helper/tipo_muestra.js"
import { check } from "express-validator"
import { validarJWT } from "../middleware/validartoken.js"

const router=new Router()

router.get('/', muestraGet) //listar todos

router.get('/id/:_id',[
    validarJWT,
    check('_id', 'Ingrese la muestra').not().isEmpty(),
    check('_id').custom( helpersMuestras.existeMuestraById ),
    validarCampos
],
idmuestraGet) //buscar por id
router.get('/codmuestra/:codMuestra',[
    validarJWT,
    check('codMuestra', 'Ingrese el código de la muestra').not().isEmpty(),
    check('codMuestra', 'El código Muestra debe tener máximo 25 caracteres').isLength({ max: 25}),
    validarCampos
],
Getcodigo)  //buscar por codigo de muestra

router.get('/ciudad/:id',[
    validarJWT,
    check('id', 'ingrese la ciudad').not().isEmpty(),
    check('id').custom( helpersCiudades.existeCiudadById),
    
    validarCampos
],
Getciudad)  //buscar por ciudad

router.get('/tipomuestra/:id',[
    validarJWT,
    check('id', 'Ingrese el tipo Muestra ').not().isEmpty(),

    validarCampos
],
GetTipo)  //buscar por tipo de muestra




router.post('/post',[
    validarJWT,
    check('solicitante', 'El solicitante es obligatorio!').not().isEmpty(),
    check('solicitante').custom( usuario. existeUsuarioById ),
    
    check('munRecoleccion', 'El número recolección  es obligatorio!').not().isEmpty(),
    check('munRecoleccion').custom( helpersCiudades.existeCiudadById),

    check('direccionTomaMuestra', 'La  dirección de la toma muestra es obligatoria!').not().isEmpty(),
 

    check('lugarTomaMuestra', 'El lugar toma de la muestra es obligatorio!').not().isEmpty(),
    check('lugarTomaMuestra', 'El lugar toma de la muestra debe tener máximo 30 caracteres').isLength({ max: 30}),

    check('muestraRecolectadaPor', 'La muestra recolectada por es obligatoria!').not().isEmpty(),
    check('muestraRecolectadaPor', 'La muestra recolectada por debe tener máximo 30 caracteres').isLength({ max: 30}),

    check('procedimientoMuestreo', 'El procedimiento del muestreo es obligatorio!').not().isEmpty(),
    check('procedimientoMuestreo', 'El procedimiento del Muestreo debe tener máximo 30 caracteres').isLength({ max: 30}),

    check('tipoMuestra', 'El tipo muestra es obligatorio!').not().isEmpty(),
    check('tipoMuestra').custom( tipo.existetipoMuestraById),

    check('fechaRecoleccion', 'la fecha de recolección es obligatoria!').not().isEmpty(),
   

    check('matrizMuestra', 'la matriz muestra es obligatoria!').not().isEmpty(),
    check('matrizMuestra', 'la matriz muestra debe tener máximo 25 caracteres').isLength({ max: 25}),

    check('cotizacion', 'La cotización es obligatoria!').not().isEmpty(),
    check('cotizacion').custom( servicio.existeServicioById),

    validarCampos       
], muestraPost) //añadir

router.put('/modificar/:id',[
    validarJWT,
    check('id','Ingresa la muestra a modificar').not().isEmpty(),
    check('id').custom( helpersMuestras.existeMuestraById ),
    validarCampos
],modificaPut)


router.put('/activar/:id',[
    validarJWT,
    check('id','Ingresa la muestra activar').not().isEmpty(),
    check('id').custom( helpersMuestras.existeMuestraById ),
    validarCampos
],PutActivate)

router.put('/desactivar/:id',[
    validarJWT,
    check('id','Ingresa la muestra inactiva').not().isEmpty(),
    check('id').custom( helpersMuestras.existeMuestraById ),
    validarCampos
],PutDeActivate)
export default router
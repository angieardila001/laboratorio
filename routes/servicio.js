import {Router} from "express"
import {ServicioGet,Getusuario,itemCotiGet,idservicioGet,estadoServicio,servicioPut,servicioPost} from "../controllers/servicio.js"
import {validarCampos} from "../middleware/middleware.js"
import { check } from "express-validator"
import helpersUsuarios from "../helper/usuario.js"
import helpersServicio from "../helper/servicio.js"
import { validarJWT } from "../middleware/validartoken.js"

const router=new Router()
router.get("/", ServicioGet); //listar todos

router.get('/id/:id',[
    validarJWT,
    check('id', 'Ingrese la cotización').not().isEmpty(),
    check('id').custom( helpersServicio.existeServicioById ),
    validarCampos
],
idservicioGet) //buscar por id

router.get('/item/',[
    validarJWT,
    check('item', 'Ingrese el item').not().isEmpty(),
    check('id', 'Ingrese la cotización').not().isEmpty(),
    check('id').custom( helpersServicio.existeServicioById ),
    validarCampos
],
itemCotiGet)  //buscar por item

 

router.get('/usuario/:id',[
    validarJWT,
    check('id', 'Ingrese usuario que sea correcto').not().isEmpty(),
    check('id').custom( helpersUsuarios.existeUsuarioById),
    
    validarCampos
],
Getusuario)  //buscar por usuario

router.get('/coti/:numCotizacion',[
    validarJWT,
    check('numCotizacion', 'Ingrese el número de Cotización').not().isEmpty(),
    validarCampos
],
estadoServicio)  //buscar por numero de cotixacion

router.post('/post',[
      check("numCotizacion").custom( helpersServicio.validarMongoID),
/*     check('numCotizacion', 'El numCotizacion es obligatorio!').not().isEmpty(), */
   
    check('fechaEmision', 'La fecha de emisión es obligatoria!').not().isEmpty(),

    check('idcliente').custom( helpersUsuarios.existeUsuarioById),

    

    check('entregaResultados', 'El entrega de resultados es obligatorio!').not().isEmpty(),

    check('validezOferta', 'La validez oferta es obligatoria!').not().isEmpty(),
    check('validezOferta', 'La validez oferta debe tener máximo 30 caracteres').isLength({ max: 30}),

    

    check('idElaboradoPor', 'Ingrese elaborado por').not().isEmpty(),
    check('idElaboradoPor').custom( helpersUsuarios.existeUsuarioById),

    check(' observaciones', 'Las  observaciones debe tener máximo 30 caracteres').isLength({ max: 30}),

    check('descuento', 'El descuento es obligatorio!').not().isEmpty(),

    check('items', 'Ingrese el item').not().isEmpty(),
    check('items').custom(helpersServicio.validarMongoID),

    validarCampos       
], servicioPost) //añadir

router.post('/modificar/:id',[
    validarJWT,
    check('id','Ingrese la cotización a modificar').not().isEmpty(),
    check('id').custom(helpersServicio.existeServicioById),
    validarCampos
  ],servicioPut)
export default router
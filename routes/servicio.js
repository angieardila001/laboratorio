import {Router} from "express"
import {ServicioGet,Getmuestra,Getusuario,itemCotiGet,idservicioGet,estadoServicio,servicioPut,servicioPost} from "../controllers/servicio.js"
import {validarCampos} from "../middleware/middleware.js"
import { check } from "express-validator"
import helpersUsuarios from "../helper/usuario.js"
import helpersMuestras from "../helper/muestra.js"
import helpersSetup from "../helper/setup.js"
import helpersServicio from "../helper/servicio.js"
import { validarJWT } from "../middleware/validartoken.js"

const router=new Router()
router.get("/", ServicioGet); //listar todos

router.get('/id/:id',[
    validarJWT,
    check('id', 'ingrese el id').not().isEmpty(),
    check('id').custom( helpersServicio.existeServicioById ),
    validarCampos
],
idservicioGet) //buscar por id

router.get('/item',[
    validarJWT,
    check('item', 'ingrese el item').not().isEmpty(),
    validarCampos
],
itemCotiGet)  //buscar por item

router.get('/muestra',[
    validarJWT,
    check('idmuestra', 'ingrese el id').not().isEmpty(),
    check('idmuestra').custom( helpersMuestras.existeMuestraById),
    
    validarCampos
],
Getmuestra)  //buscar por muestra

router.get('/usuario',[
    validarJWT,
    check('id', 'ingrese el id').not().isEmpty(),
    check('id').custom( helpersUsuarios.existeUsuarioById),
    
    validarCampos
],
Getusuario)  //buscar por usuario

router.get('/coti',[
    validarJWT,
    check('numCotizacion', 'ingrese el numCotizacion').not().isEmpty(),
    validarCampos
],
estadoServicio)  //buscar por numero de cotixacion

router.post('/post',[
      check("numCotizacion").custom( helpersServicio.validarMongoID),
/*     check('numCotizacion', 'El numCotizacion es obligatorio!').not().isEmpty(), */
   
    check('fechaEmision', 'El fechaEmision es obligatorio!').not().isEmpty(),

    check('idcliente').custom( helpersUsuarios.existeUsuarioById),


  


    check('idContacto').custom( helpersUsuarios.existeUsuarioById),

    check('entregaResultados', 'El entregaResultados es obligatorio!').not().isEmpty(),

    check('validezOferta', 'El validezOferta es obligatorio!').not().isEmpty(),
    check('validezOferta', 'el validezOferta debe tener maximo 30 caracteres').isLength({ max: 30}),

    

    check('idElaboradoPor', 'ingrese el id').not().isEmpty(),
    check('idElaboradoPor').custom( helpersUsuarios.existeUsuarioById),

    check(' observaciones', 'el  observaciones debe tener maximo 30 caracteres').isLength({ max: 30}),

   
    check('subTotal', 'el subTotal debe tener maximo 30 caracteres').isLength({ max: 30}),

    check('descuento', 'El descuento es obligatorio!').not().isEmpty(),
    check('descuento', 'el descuento debe tener maximo 30 caracteres').isLength({ max: 30}),

 
    check('iva').custom( helpersSetup.existeSetupById),

    check('items', 'ingrese el id').not().isEmpty(),
    check('items').custom(helpersServicio.validarMongoID),

    

   
    validarCampos       
], servicioPost) //añadir

router.post('/modificar/:id',[
    validarJWT,
    check('id','ingresa el id').not().isEmpty(),
    check('id').custom(helpersServicio.existeServicioById),
    validarCampos
  ],servicioPut)

export default router
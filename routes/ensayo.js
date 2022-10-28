import {Router} from "express"
import {ensayoGet,idensayoGet,GetTipo,ensayoPost,modificaPut,ensayoPutActivate,ensayoPutDeActivate } from "../controllers/ensayo.js"
import {validarCampos} from "../middleware/middleware.js"
import helpersEnsayos from "../helper/ensayo.js"
import { check } from "express-validator"
import { validarJWT } from "../middleware/validartoken.js"

const router=new Router()

router.get('/', ensayoGet) //listar todos


router.get('/id/:_id',[
    validarJWT,
    check('_id', 'Verifique que el usuario sea correcto').not().isEmpty(),
    check('_id').custom( helpersEnsayos.existeEnsayoById ),
    validarCampos
],
idensayoGet) //buscar por id
router.get('/tipo/:tipo_ensayo',[
    validarJWT,
    check('tipo_ensayo', 'El tipo ensayo es obligatorio').not().isEmpty(),
    check('tipo_ensayo', 'El tipo ensayo debe tener máximo 25 caracteres').isLength({ max: 25}),
    validarCampos
],
GetTipo)  //buscar por tipo ensayo


router.post('/post',[
      
    check('tipo_ensayo', 'El tipo ensayo es obligatorio!').not().isEmpty(),
    check('tipo_ensayo', 'El tipo ensayo debe tener máximo 25 caracteres').isLength({ max: 25}),
    check('tipo_ensayo').custom( helpersEnsayos.existe),

    check('metodo', 'El metodo es obligatorio!').not().isEmpty(),
    check('metodo', 'El metodo debe tener 25 caracteres').isLength({ max: 25}),

    check('valorMinimo', 'El valor Mínimo debe tener 50 caracteres').isLength({ max: 50}),


    check('valorMaximo','El valor Máximo debe de tener máximo 14 caracteres').isLength({ max: 14}),


    check('unidades', 'unidades no es válido').isLength({ max: 25}),
   
    check('descripcion', 'La descripción debe tener mínimo 10 caracteres').isLength({ min: 10}),
    validarCampos       
], ensayoPost) //añadir

router.post('/modificar/:id',[
    validarJWT,
    check('id','ingrese el ensayo a modificar ').not().isEmpty(),
    check('id').custom( helpersEnsayos.existeEnsayoById),

    validarCampos
],modificaPut)

router.put('/activo/:id',[
    validarJWT,
    check('id', 'Ingrese el ensayo activar').not().isEmpty(),
    check('id').custom( helpersEnsayos.existeEnsayoById ),
    validarCampos

],ensayoPutActivate)

router.put('/inactivo/:id',[
    validarJWT,
    check('id', 'Ingrese el enseyo inactiva').not().isEmpty(),
    check('id').custom( helpersEnsayos.existeEnsayoById ),
    validarCampos
],ensayoPutDeActivate)


export default router
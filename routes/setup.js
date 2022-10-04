import {Router} from "express"
import {consecutivoGet,consecutivoPut,Post} from "../controllers/setup.js"
import {validarCampos} from "../middleware/middleware.js"
import setup from "../helper/setup.js"
import { check } from "express-validator"
import { validarJWT } from "../middleware/validartoken.js"

const router=new Router()

router.get('/', consecutivoGet) //listar todos
router.post('/post',[
  
   
    validarCampos
], Post)
router.put('/modificar/:id',[
    validarJWT,
    check('id','ingresa el id').not().isEmpty(),
    check('id').custom(setup.existeSetupById ),

    check("consecutivoMuestra","por favor ingresa el consecutivo muestra").not().isEmpty(),
    check("consecutivoOferta","por favor ingresa el consecutivo oferta").not().isEmpty(),
    check("consecutivoResultados","por favor ingresa el consecutivo resultados").not().isEmpty(),
    check("iva","por favor ingresa el iva").not().isEmpty(),
    validarCampos
],consecutivoPut)


export default router
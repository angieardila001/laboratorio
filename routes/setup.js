import {Router} from "express"
import {consecutivoGet,consecutivoPut,Post} from "../controllers/setup.js"
import {validarCampos} from "../middleware/middleware.js"
import setup from "../helper/setup.js"
import { check } from "express-validator"
import { validarJWT } from "../middleware/validartoken.js"

const router=new Router()

router.get('/', consecutivoGet) //listar todos
router.post('/post',[
    validarJWT,
   
    validarCampos
], Post)
router.put('/modificar/:id',[
    validarJWT,
    check('id','Ingresa el consecuitivo a modificar ').not().isEmpty(),
    check('id').custom(setup.existeSetupById ),

    check("consecutivoMuestra","Por favor ingresa el consecutivo muestra").not().isEmpty(),
    check("consecutivoOferta","Por favor ingresa el consecutivo oferta").not().isEmpty(),
    check("consecutivoResultados","Por favor ingresa el consecutivo resultados").not().isEmpty(),
    check("iva","Por favor ingresa el iva").not().isEmpty(),
    validarCampos
],consecutivoPut)

export default router
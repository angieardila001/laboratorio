import {Router} from "express"
import {ServicioGet,servicioPut,estadoMuestra,Putresultado} from "../controllers/orden_servicio.js"
import {validarCampos} from "../middleware/middleware.js"
import { check } from "express-validator"
import { validarJWT } from "../middleware/validartoken.js"
import ordenSe from "../helper/orden_servicio.js"

const router = new Router();

router.get("/", ServicioGet); //listar todos


router.get(
    "/buscar/:estadoMuestra",
    [
      //buscar por metodo
      validarJWT,
      check("estadoMuestra", "El estado de muestra es obligatorio!").not().isEmpty(),
      check("estadoMuestra").isLength({ max: 30 }),
      validarCampos,
    ],
    estadoMuestra
);//buscar por estado de muestra

router.put('/a/:id',[
  validarJWT,
  check('id','ingresa el id').not().isEmpty(),

  validarCampos
],Putresultado)

router.put('/modificar/:id',[
  validarJWT,
  check('id','ingresa el id').not().isEmpty(),
  check('id').custom(ordenSe.existeOrdenById),
  validarCampos
],servicioPut)


export default router;
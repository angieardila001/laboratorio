import Muestra from "../models/muestra.js"
import Ensayo from "../models/ensayo.js"
import Cotizacion from "../models/servicio.js"
import Orden from "../models/orden_servicio.js"
import Usuario from "../models/usuario.js"
import Setup from "../models/setup.js"
import Servicio from "../models/servicio.js"
import enviar from "../database/mailer.js"
const muestraGet = async (req, res) => { //listar todos
  try {
    const muestras = await Muestra.find().populate({ path: "solicitante", populate: { path: "ciudad" } }).populate({ path: "numRecoleccion" }).populate({ path: "tipoMuestra" })

    res.json({
      muestras
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}
const idmuestraGet = async (req, res) => { //listar por id
  const { _id } = req.params
  try {
    const muestras = await Muestra.findById(_id)
    res.json({
      muestras
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}
const Getcodigo = async (req, res) => {  //buscar por cod muestra
  const { codMuestra } = req.params
  try {
    const muestras = await Muestra.find(
      {
        $or: [
          { codMuestra: new RegExp(`^${codMuestra}`, "i") },
        ]
      }
    )
    if (muestras)
      res.json({ muestras })
    else
      res.json(`${tipo} No encontrado`)
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}
const Getciudad = async (req, res) => {  //listar por ciudad
  const { id } = req.params;
  try {
    const muestras = await Muestra.find().where('numRecoleccion').in(id).exec();
    res.json({
      muestras
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}
const GetTipo = async (req, res) => {  //buscar por tipo
  const { id } = req.params
  try {
    const muestras = await Muestra.find().where('tipoMuestra').in(id).exec();
    res.json({
      muestras
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}

const muestraPost = async (req, res) => { //añadir

  const consecutivo = await Setup.findOne()
  let conse = ""
  if (consecutivo.consecutivoMuestra.toString().length == 1) conse = "000" + consecutivo.consecutivoMuestra
  else if (consecutivo.consecutivoMuestra.toString().length == 2) conse = "00" + consecutivo.consecutivoMuestra
  else if (consecutivo.consecutivoMuestra.toString().length == 3) conse = "0" + consecutivo.consecutivoMuestra
  else conse = consecutivo.consecutivoOferta
  const d = new Date()

  const codMuestra = conse + "-" + d.getFullYear()
  const consecutivoMuestra = consecutivo.consecutivoMuestra + 1
  const guardar = await Setup.findByIdAndUpdate(consecutivo._id, { consecutivoMuestra: consecutivoMuestra })

  const { solicitante, munRecoleccion, direccionTomaMuestra, lugarTomaMuestra, muestraRecolectadaPor, procedimientoMuestreo, tipoMuestra, matrizMuestra, fechaRecoleccion, cotizacion, item } = req.body
  const resultado = await Servicio.find({ cotizacion }).populate(
    "items"
  );
  console.log(resultado);

    const muestras = new Muestra({ solicitante, codMuestra, munRecoleccion, direccionTomaMuestra, lugarTomaMuestra, muestraRecolectadaPor, procedimientoMuestreo, tipoMuestra, matrizMuestra, fechaRecoleccion, cotizacion, item })

    muestras.save()


    const cotizacion1 = await Cotizacion.findById(cotizacion);
    let cotilla = "";
    //item??
    if (item == "Item1") {
      cotilla = cotizacion1.items.item1.itemsEnsayo;
    } else if (item == "Item2") {
      cotilla = cotizacion1.items.item2.itemsEnsayo;
    } else {
      cotilla = cotizacion1.items.item3.itemsEnsayo;
    }

    let supervisores = "";
    const itemsOrden = [];
    for (let i = 0; i < cotilla.length; i++) {
      const elemento = cotilla[i];
      console.log("ensayo: " + elemento);
      /*  console.log(element.items.item1.itemsEnsayo); */
      const itemOrden = {};
      itemOrden.idensayo = elemento.ensayo;

      const person = await Ensayo.findById(elemento.ensayo)
        .populate({ path: "responsables.titular" })
        .populate({ path: "responsables.suplente" });

      if (
        person.responsables.titular.estado == 0 ||
        person.responsables.titular.estado == 2
      ) {
        console.log("suplente por inactividad: ");
        if (
          person.responsables.suplente.estado == 0 ||
          person.responsables.suplente.estado == 2
        ) {
        } else {
          itemOrden.responsable = person.responsables.suplente._id;
        }
      } else {
        itemOrden.responsable = person.responsables.titular._id;
      }
      const supervisor = await Usuario.findOne({ rol: "supervisor" });
      if (supervisor) {
        itemOrden.supervisor = supervisor._id;
      }
      itemsOrden.push(itemOrden);
    }
    const idMuestra = muestras._id
    const orden = new Orden({ idMuestra, itemsorden: itemsOrden });

    orden.save();
    res.json({ orden })
 
  try {
    const email = await Usuario.findById(solicitante)
    await enviar.sendMail({
      from: '"muestra creada" <ardilablancoangieyuliana@gmail.com',
      to: email.email,
      subject: "La muestra fue creada exitosamente",
      html: `El codigo de la muestra es : ${muestras.codMuestra}`
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Error al enviar correo' })
  }
}

const modificaPut = async (req, res) => {
  const { id } = req.params;
  const { _id, createdAt, cotizacion, item, ...resto } = req.body;
  try {
    const modificar = await Muestra.findByIdAndUpdate(id, resto);

    res.json({
      modificar
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }

}

const PutActivate = async (req, res) => {
  const { id } = req.params;
  try {
    const activo = await Muestra.findByIdAndUpdate(id, { estado: 1 });
    const todasordens = await Orden.find()
    for (let i = 0; i < todasordens.length; i++) {
      const element = todasordens[i];

      if ((element.idMuestra) == id) {
        console.log("sirvio");
        console.log("items", element._id);
        const desa = await Orden.findByIdAndUpdate(element._id, { estado: 1 })
        if (!desa) {
          return res
            .status(400)
            .json({ msg: 'error' })
        }
      }
    }
    res.json({
      activo
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}

const PutDeActivate = async (req, res) => {
  const { id } = req.params;
  try {
    const desactivo = await Muestra.findByIdAndUpdate(id, { estado: 0 });
    const todasordens = await Orden.find()
    for (let i = 0; i < todasordens.length; i++) {
      const element = todasordens[i];

      if ((element.idMuestra) == id) {
        console.log("sirvio");
        console.log("items", element._id);
        const desa = await Orden.findByIdAndUpdate(element._id, { estado: 0 })
        if (!desa) {
          return res
            .status(400)
            .json({ msg: 'error' })
        }
      }
    }

    res.json({
      desactivo
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}
export { Getcodigo, Getciudad, muestraGet, idmuestraGet, GetTipo, muestraPost, modificaPut, PutActivate, PutDeActivate }
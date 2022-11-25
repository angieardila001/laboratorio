import Servicio from "../models/orden_servicio.js"

const ServicioGet = async (req, res) => { //listar todos
  try {
    const servicio = await Servicio.find().populate({
      path: "itemsorden.idensayo",
      populate: { path: "responsables.titular" }
    }).populate({ path: "idMuestra" });
    res.json({
      servicio
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}


const estadoMuestra = async (req, res) => {
  const { estadoMuestra } = req.params
  try {
    const estados = await Servicio.find(
      {
        $or: [
          { estadoMuestra: new RegExp(`^${estadoMuestra}`, "i") },

        ]
      }
    )
    if (estados)
      res.json({ estados })
    else
      res.json(`${estadoMuestra} No se ha encontrado`)
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}

const Putresultado = async (req, res) => {
  const { id } = req.params;
  const { _id, createdAt, ...resto } = req.body;
  try {
    const modificar = await Servicio.findByIdAndUpdate(id, resto);

    res.json({
      modificar
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}

const servicioPut = async (req, res) => {  //modificar  
  const { id } = req.params;
  const { _id, createdAt, idMuestra, estado, ...resto } = req.body;
  try {
    const modificar = await Servicio.findByIdAndUpdate(id, resto);



    res.json({
      modificar
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}

export { ServicioGet, servicioPut, estadoMuestra, Putresultado }
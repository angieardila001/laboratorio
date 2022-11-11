import Ensayo from "../models/ensayo.js"

const ensayoGet = async (req, res) => { //listar todos
  try {
    const ensayos = await Ensayo.find().populate({ path: "responsables", populate: { path: "titular" } }).populate({ path: "responsables", populate: { path: "suplente" } });
    res.json({
      ensayos
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}
const idensayoGet = async (req, res) => { //listar por id
  const { _id } = req.params
  try {
    const ensayos = await Ensayo.findById({ _id }).populate({ path: "responsables", populate: { path: "titular" } }).populate({ path: "responsables", populate: { path: "suplente" } });
    res.json({
      ensayos
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}

const GetTipo = async (req, res) => {  //buscar por tipo ensayo
  const { tipo_ensayo } = req.params
  try {
    const ensayos = await Ensayo.find(
      {
        $or: [
          { tipo_ensayo: new RegExp(`^${tipo_ensayo}`, "i") },
        ]
      }
    ).populate({ path: "responsables", populate: { path: "titular" } }).populate({ path: "responsables", populate: { path: "suplente" } });
    if (ensayos)
      res.json({ ensayos })
    else
      res.json(`${tipo_ensayo} No encontrado`)
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}


const ensayoPost = async (req, res) => { //añadir
  const { tipo_ensayo, metodo, tecnica, valorMinimo, valorMaximo, unidades, costo, descripcion, limiteCuantificacion, responsables, estado } = req.body
  try {
    const ensayos = new Ensayo({ tipo_ensayo, metodo, tecnica, valorMinimo, valorMaximo, unidades, costo, descripcion, limiteCuantificacion, responsables, estado })
    ensayos.save()
    res.json({ ensayos })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}


const modificaPut = async (req, res) => {
  const { id } = req.params;
  try {
    const { _id, createdAt, ...resto } = req.body;

    const articulo = await Ensayo.findByIdAndUpdate(id, resto);

    res.json({
      articulo
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}
const ensayoPutActivate = async (req, res) => {
  const { id } = req.params;
  try {
    const activo = await Ensayo.findByIdAndUpdate(id, { estado: 1 });

    res.json({
      activo
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}

const ensayoPutDeActivate = async (req, res) => {
  const { id } = req.params;
  try {
    const desactivo = await Ensayo.findByIdAndUpdate(id, { estado: 0 });

    res.json({
      desactivo
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}
export { ensayoGet, idensayoGet, GetTipo, ensayoPost, modificaPut, ensayoPutActivate, ensayoPutDeActivate }

import Ciudad from "../models/ciudad.js"

const ciudadGet = async (req, res) => { //listar todos
  const ciudades = await Ciudad.find()
  res.json({
    ciudades
  })
}
const idciudadGet = async (req, res) => { //listar por id
  const { _id } = req.params
  try {
    const ciudades = await Ciudad.findById({ _id })
    res.json({
      ciudades
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}

const departamento = async (req, res) => { //listar por id
  try {
    const ciudades = await Ciudad.find().distinct("departamento")
    res.json({
      ciudades
    })
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}
const GetCodigoDepa = async (req, res) => {  //buscar por tipo codigo de departamento
  const { codigodedepartamento } = req.params
  try {
    const departamentos = await Ciudad.find(
      {
        $or: [
          { codDepartamento: new RegExp(`^${codigodedepartamento}`, "i") },
        ]
      }
    )
    if (departamentos)
      res.json({ departamentos })
    else
      res.json(`${codigodedepartamento} No encontrado`)
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}
const GetCodigoCi = async (req, res) => {  //buscar por tipo codigo de departamento
  const { departamento } = req.params
  try {
    const ciudades = await Ciudad.find(
      {
        $or: [
          { departamento: new RegExp(`^${departamento}`, "i") },
        ]
      }
    )
    if (ciudades)
      res.json({ ciudades })
    else
      res.json(`${Ciudad}} No encontrado`)
  } catch (error) {
    return res.status(404).json({ msg: 'Hable con el WebMaster' })
  }
}






export { idciudadGet, ciudadGet, GetCodigoCi, GetCodigoDepa, departamento }
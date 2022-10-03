
import Ciudad from "../models/ciudad.js"

const ciudadGet=async (req,res)=>{ //listar todos
  const ciudades= await Ciudad.find()
  res.json({
    ciudades
  })
}
const idciudadGet= async(req,res)=>{ //listar por id
  const {_id}=req.params
  const ciudades=await Ciudad.findById({_id})
  res.json({
    ciudades
  })
}

const departamento= async(req,res)=>{ //listar por id
  const ciudades=await Ciudad.find().distinct("departamento")
  res.json({
    ciudades
  })
}
const GetCodigoDepa= async(req,res)=>{  //buscar por tipo codigo de departamento
  const {codigodedepartamento}=req.params
  const departamentos=await Ciudad.find(
    {
      $or:[
        {codDepartamento:new RegExp(codigodedepartamento,"i")},
      ]
    }
  )
  if (departamentos)
      res.json({departamentos})
  else
      res.json(`${codigodedepartamento}} No encontrado`)
}
const GetCodigoCi= async(req,res)=>{  //buscar por tipo codigo de departamento
  const {departamento}=req.params
  const ciudades=await Ciudad.find(
    {
      $or:[
        {departamento:new RegExp(`^${departamento}`,"i")},
      ]
    }
  )
  if (ciudades)
      res.json({ciudades})
  else
      res.json(`${Ciudad}} No encontrado`)
}






export { idciudadGet,ciudadGet,GetCodigoCi,GetCodigoDepa,departamento}
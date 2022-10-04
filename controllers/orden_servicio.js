import Servicio from "../models/orden_servicio.js"

const ServicioGet=async (req,res)=>{ //listar todos
    const servicio= await Servicio.find().populate({
      path: "itemsorden.idensayo",
      populate: { path: "responsables.titular" }
    });
    res.json({
      servicio
    })
}


const estadoMuestra= async(req,res)=>{  
    const {estadoMuestra}=req.params
    const estados=await Servicio.find(
      {
        $or:[
          {estadoMuestra:new RegExp(estadoMuestra,"i")},

        ]
      }
    )
    if (resultados)
        res.json({estados})
    else
        res.json(`${estadoMuestra} No se ha encontrado`)
}

const Putresultado = async (req, res) => {   
  const { id } = req.params;  
  const { _id, createdAt, ...resto } = req.body;
  const modificar = await Servicio.findByIdAndUpdate(id, resto);

  res.json({
      modificar
  })

}

const servicioPut = async (req, res) => {  //modificar  
    const { id } = req.params;  
    const { _id, createdAt, idMuestra,estado, ...resto } = req.body;
    const modificar = await Servicio.findByIdAndUpdate(id, resto);
    
    

    res.json({
        modificar
    })}

export {ServicioGet,servicioPut,estadoMuestra,Putresultado}
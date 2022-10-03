import Ensayo from "../models/ensayo.js"

const ensayoGet=async (req,res)=>{ //listar todos
  const ensayos= await Ensayo.find().populate({path:"responsables",populate:{path:"titular"}}).populate({path:"responsables",populate:{path:"suplente"}});
  res.json({
    ensayos
  })
}
const idensayoGet= async(req,res)=>{ //listar por id
  const {_id}=req.params
  const ensayos=await Ensayo.findById({_id}).populate({path:"responsables",populate:{path:"titular"}}).populate({path:"responsables",populate:{path:"suplente"}});
  res.json({
    ensayos
  })
}

const GetTipo= async(req,res)=>{  //buscar por tipo ensayo
  const {tipo_ensayo}=req.params
  const ensayos=await Ensayo.find(
    {
      $or:[
        {tipo_ensayo:new RegExp(tipo_ensayo,"i")},
      ]
    }
  ).populate({path:"responsables",populate:{path:"titular"}}).populate({path:"responsables",populate:{path:"suplente"}});
  if (ensayos)
      res.json({ensayos})
  else
      res.json(`${tipo_ensayo} No encontrado`)
}


const ensayoPost=async(req,res)=>{ //añadir
    const{tipo_ensayo,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,descripcion,limiteCuantificacion,responsables,estado}=req.body
    const ensayos= new Ensayo({tipo_ensayo,metodo,tecnica,valorMinimo,valorMaximo,unidades,costo,descripcion,limiteCuantificacion,responsables,estado})
    ensayos.save()
    res.json({ensayos})
}


const modificaPut = async (req, res) => {   
    const { id } = req.params;  
    const { _id, createdAt, ...resto } = req.body;
    
    const articulo = await Ensayo.findByIdAndUpdate(id, resto);
  
    res.json({
        articulo
    })
}
const ensayoPutActivate=async (req, res) => {   
  const { id } = req.params;
  const activo = await Ensayo.findByIdAndUpdate(id, {estado:1});

  res.json({
      activo
  })
}

const ensayoPutDeActivate=async (req, res) => {   
  const { id } = req.params;
  const desactivo = await Ensayo.findByIdAndUpdate(id, {estado:0});

  res.json({
      desactivo
  })
}
export {ensayoGet,idensayoGet,GetTipo,ensayoPost,modificaPut,ensayoPutActivate,ensayoPutDeActivate}
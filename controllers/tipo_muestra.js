import tipoMuestra from "../models/tipo_muestra.js"

const tipoGet=async (req,res)=>{ //listar todos
    const tipos= await tipoMuestra.find()
    res.json({
        tipos
    })
}

const idtipoGet= async(req,res)=>{ //buscar por id
  const{_id}=req.params
  const usuarios =await tipoMuestra.findById({_id})
  res.json({
      usuarios
  })
}

const tipoPost=async(req,res)=>{ // añadir
    const{tipos}=req.body
    const tipo= new tipoMuestra({tipos})
    tipo.save()
    res.json({tipo})
}
const GetTipos= async(req,res)=>{  //buscar por titulo
    const {tipos}=req.params
    const muestras=await tipoMuestra.find(
      {
        $or:[
          {tipos:new RegExp(tipos,"i")},
        ]
      }
    )
    if (muestras)
        res.json({muestras})
    else
        res.json(`${tipos} No encontrado`)
  }
  

const tipoPut = async (req, res) => {  //modificar  
    const { id } = req.params;  
    const { _id, createdAt, ...resto } = req.body;
    const modificar = await tipoMuestra.findByIdAndUpdate(id, resto);

    res.json({
        modificar
    })
}

export {tipoGet,tipoPut,tipoPost,GetTipos,idtipoGet}
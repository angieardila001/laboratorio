import Consecutivo from "../models/setup.js"

const consecutivoGet=async (req,res)=>{ //listar todos
    const consecutivos= await Consecutivo.find()
    res.json({
      consecutivos
    })
}

const Post=async(req,res)=>{ // añadir
    const{iva}=req.body
    const tipo= new Consecutivo({iva})
    tipo.save()
    res.json({tipo})
}


const consecutivoPut = async (req, res) => {  //modificar  
    const { id } = req.params;  
    const { _id, createdAt, ...resto } = req.body;
    const modificar = await Consecutivo.findByIdAndUpdate(id, resto);

    res.json({
        modificar
    })
}

export {consecutivoGet,consecutivoPut,Post}
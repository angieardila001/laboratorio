import Muestra from "../models/muestra.js"
import Ensayo from "../models/ensayo.js"
import Cotizacion from "../models/servicio.js"
import Orden from "../models/orden_servicio.js"
import Usuario from "../models/usuario.js"
import Setup from "../models/setup.js"
import Servicio from "../models/servicio.js"

const muestraGet=async (req,res)=>{ //listar todos
  const muestras= await Muestra.find().populate({path:"solicitante",populate:{path:"ciudad"}}).populate({path:"numRecoleccion"}).populate({path:"tipoMuestra"})
  
  res.json({
    muestras
  })
}
const idmuestraGet= async(req,res)=>{ //listar por id
  const {_id}=req.params
  const muestras=await Muestra.findById(_id)
  res.json({
    muestras
  })
}
const Getcodigo= async(req,res)=>{  //buscar por cod muestra
  const {codMuestra}=req.params
  const muestras=await Muestra.find(
    {
      $or:[
        {codMuestra:new RegExp(codMuestra,"i")},
      ]
    }
  )
  if (muestras)
      res.json({muestras})
  else
      res.json(`${tipo} No encontrado`)
}
const Getciudad= async(req,res)=>{  //listar por ciudad
  const {id}=req.params;
  const muestras = await Muestra.find().where('numRecoleccion').in(id).exec();
  res.json({
      muestras
  })
}
const GetTipo= async(req,res)=>{  //buscar por tipo
  const {id}=req.params
  const muestras = await Muestra.find().where('tipoMuestra').in(id).exec();
  res.json({
      muestras
  })
}

const muestraPost=async(req,res)=>{ //añadir
  const consecutivo =await Setup.findOne()
  let conse=""
  if (consecutivo.consecutivoMuestra.toString().length==1) conse="000"+consecutivo.consecutivoMuestra
  else if (consecutivo.consecutivoMuestra.toString().length==2) conse="00"+consecutivo.consecutivoMuestra
  else if (consecutivo.consecutivoMuestra.toString().length==3) conse="0"+consecutivo.consecutivoMuestra
  else conse=consecutivo.consecutivoOferta
  const d = new Date()

  const codMuestra=conse+"-"+d.getFullYear()
  const consecutivoMuestra=consecutivo.consecutivoMuestra+1
  const guardar=await Setup.findByIdAndUpdate(consecutivo._id,{consecutivoMuestra:consecutivoMuestra})

    const{ solicitante,numRecoleccion,direccionTomaMuestra,lugarTomaMuestra,muestraRecolectadaPor,procedimientoMuestreo,tipoMuestra,matrizMuestra,fechaRecoleccion,cotizacion,item}=req.body
    const resultado = await Servicio.find({ cotizacion }).populate(
      "items"
    );
    console.log(resultado);
    const muestras= new Muestra({ solicitante,codMuestra,numRecoleccion,direccionTomaMuestra,lugarTomaMuestra,muestraRecolectadaPor,procedimientoMuestreo,tipoMuestra,matrizMuestra,fechaRecoleccion,cotizacion,item})
    
    muestras.save()
    const cotizacion1= await Cotizacion.findById(cotizacion)
   let array=[]
   array.push(cotizacion1)
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
     
      let uno=element.items.item1.itemsEnsayo
      for (let i = 0; i < uno.length; i++) {
        const element = uno[i];
        console.log("e",element.ensayo);
        
      }
     
    }
   
    console.log("uno",uno);
    const usuario= await Usuario.findOne()

    const ordes= new Orden({
      idMuestra:muestras._id,
       itemsorden:[{idensayo:ensayo._id,responsable:usuario._id,supervisor:usuario._id}]
    })
    ordes.save()
    res.json({muestras})
  }

const modificaPut = async (req, res) => {   
    const { id } = req.params;  
    const { _id, createdAt,cotizacion,item, ...resto } = req.body;
    const modificar = await Muestra.findByIdAndUpdate(id, resto);

    res.json({
        modificar
    })
  
}

const PutActivate=async (req, res) => {   
  const { id } = req.params;
  const activo = await Muestra.findByIdAndUpdate(id, {estado:1});
  const todasordens=   await Orden.find()
  for (let i = 0; i < todasordens.length; i++) {
    const element = todasordens[i];
   
    if((element.idMuestra)==id){
      console.log("sirvio");
      console.log("items",element._id);
      const desa = await Orden.findByIdAndUpdate(element._id, { estado: 1 })
      if (!desa) {
        return res 
        .status(400)
        .json({msg:'error'})
      }
    }
  }
  res.json({
      activo
  })
}

const PutDeActivate=async (req, res) => {   
  const { id } = req.params;
  const desactivo = await Muestra.findByIdAndUpdate(id, {estado:0});
  const todasordens=   await Orden.find()
    for (let i = 0; i < todasordens.length; i++) {
      const element = todasordens[i];
     
      if((element.idMuestra)==id){
        console.log("sirvio");
        console.log("items",element._id);
        const desa = await Orden.findByIdAndUpdate(element._id, { estado: 0 })
        if (!desa) {
          return res 
          .status(400)
          .json({msg:'error'})
        }
      }
    }
  
  res.json({
      desactivo
  })
}
export {Getcodigo,Getciudad,muestraGet,idmuestraGet,GetTipo,muestraPost,modificaPut,PutActivate,PutDeActivate}
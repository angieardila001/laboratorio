import Servicio from "../models/servicio.js"
import Setup from "../models/setup.js"
const ServicioGet=async (req,res)=>{ //listar todos
    const servicio= await Servicio.find()
    res.json({
      servicio
    })
}

const idservicioGet= async(req,res)=>{ //buscar por id
  const{id}=req.params
  const cotizacion=await Servicio.findById({id})
  res.json({
      cotizacion
  })
}
const itemCotiGet= async(req,res)=>{  //buscar por item
  const {item}=req.params
  const items=await Servicio.find(
    {
      $or:[
        {item:new RegExp(item,"i")},

      ]
    }
  )
  if (items)
      res.json({items})
  else
      res.json(`${item} No se ha encontrado`)
}
const Getusuario= async(req,res)=>{  //listar por usuario
  const {id}=req.params;
  const servicios = await Servicio.find().where('idusuario').in(id).exec();
  res.json({
      servicios
  })
}
const Getmuestra= async(req,res)=>{  //listar por muestra
  const {id}=req.params;
  const servicios = await Servicio.find().where('idmuestra').in(id).exec();
  res.json({
      servicios
  })
}
const estadoServicio= async(req,res)=>{   //listar por numcotizacion
    const {numCotizacion}=req.params
    const servicios=await Servicio.find(
      {
        $or:[
          {numCotizacion:new RegExp(numCotizacion,"i")},

        ]
      }
    )
    if (servicios)
        res.json({servicios})
    else
        res.json(`${numCotizacion} No se ha encontrado`)
}

const servicioPost=async(req,res)=>{ // añadir
  const consecutivo =await Setup.findOne()
  let conse=""
  if (consecutivo.consecutivoOferta.toString().length==1) conse="000"+consecutivo.consecutivoOferta
  else if (consecutivo.consecutivoOferta.toString().length==2) conse="00"+consecutivo.consecutivoOferta
  else if (consecutivo.consecutivoOferta.toString().length==3) conse="0"+consecutivo.consecutivoOferta
  else conse=consecutivo.consecutivoOferta
  const d = new Date()

  const numCotizacion=conse+"-"+d.getFullYear()+"-"+"V1"

  const consecutivoOferta=consecutivo.consecutivoOferta+1
  const guardar=await Setup.findByIdAndUpdate(consecutivo._id,{consecutivoOferta:consecutivoOferta})

  const{ fechaEmision,idcliente,idContacto,validezOferta,entregaResultados,idElaboradoPor,items,descuento,observaciones}=req.body
  let numero=0
  let numero2=0
  let numero3=0

  for (let i = 0; i < items.item1.itemsEnsayo.length; i++) {
    const element = items.item1.itemsEnsayo[i];
    numero+=parseInt(element.costoEnsayo) 
     
  }
  items.item1.costoitem=numero
  items.costo=numero

  if (items.item2) {
    for (let i = 0; i < items.item2.itemsEnsayo.length; i++) {
      const element = items.item2.itemsEnsayo[i];
      numero2+=parseInt(element.costoEnsayo)  
    }
    
    items.item2.costoitem=numero2
    items.costo+=numero2
  }
  if (items.item3) {
    for (let i = 0; i < items.item3.itemsEnsayo.length; i++) {
      const element = items.item3.itemsEnsayo[i];
      numero3+=parseInt(element.costoEnsayo)  
    }
    items.item3.costoitem=numero3
    items.costo+=numero3
  }
let sub=items.costo-descuento
console.log("sub",sub);
let iva="0."+consecutivo.iva
console.log(iva);
 let subtotal1= (sub * iva)+sub
console.log("ss",subtotal1);

    const servicio= new Servicio({numCotizacion, fechaEmision,idcliente,idContacto,validezOferta,entregaResultados,idElaboradoPor,items,total:subtotal1,subTotal:items.costo,descuento,iva:consecutivo.iva,observaciones})

    servicio.save()
    res.json({servicio})

}




const servicioPut = async (req, res) => {  //modificar  
    const { id } = req.params;  
   
      const usuario = await Servicio.findByIdAndUpdate(id, { estado: 0 })
      if (!usuario) {
        return res 
        .status(400)
        .json({msg:error})
      }

      let consecutivo = await Servicio.findById(id)
      let version = consecutivo.numCotizacion
      console.log("ver",version);
      let primeraParte  = version.split('V')[0]
      let variable=Number(version.split('V')[1])
      let versionNew=variable+1
      console.log("version nueva"+variable);
      console.log("version"+version);
     let concaNueva = `${primeraParte}V${versionNew}`
      console.log(concaNueva);



     
      const{ fechaEmision,idcliente,idContacto,validezOferta,entregaResultados,idElaboradoPor,items,subTotal,descuento,total}=req.body
      let numero=0
      let numero2=0
      let numero3=0
    
      for (let i = 0; i < items.item1.itemsEnsayo.length; i++) {
        const element = items.item1.itemsEnsayo[i];
        numero+=parseInt(element.costoEnsayo) 
         
      }
      items.item1.costoitem=numero
      items.costo=numero
    
      if (items.item2) {
        for (let i = 0; i < items.item2.itemsEnsayo.length; i++) {
          const element = items.item2.itemsEnsayo[i];
          numero2+=parseInt(element.costoEnsayo)  
        }
        
        items.item2.costoitem=numero2
        items.costo+=numero2
      }
      if (items.item3) {
        for (let i = 0; i < items.item3.itemsEnsayo.length; i++) {
          const element = items.item3.itemsEnsayo[i];
          numero3+=parseInt(element.costoEnsayo)  
        }
        items.item3.costoitem=numero3
        items.costo+=numero3
      }
      let sub=items.costo-descuento
      console.log("sub",sub);
      let iva="0."+consecutivo.iva
      console.log(iva);
       let subtotal1= (sub * iva)+sub
      console.log("ss",subtotal1);
      const servicio= new Servicio({numCotizacion:concaNueva,fechaEmision,idcliente,idContacto,validezOferta,entregaResultados,idElaboradoPor,items,total,subTotal,descuento,iva})
      servicio.save()
      res.json({servicio})
}

export {ServicioGet,Getmuestra,Getusuario,itemCotiGet,idservicioGet,estadoServicio,servicioPut,servicioPost}
import mongoose from 'mongoose';

const EnsayoSchema= new mongoose.Schema({

    tipo_ensayo:{type: String,maxlength:25,required: true, unique:true},
    metodo:{type: String,maxlength:25,required: true},
    tecnica:{type: String,required: true,},
    valorMinimo:{type: String,maxlength:25,required: true,default:"N.A."},
    valorMaximo:{type: String,maxlength:25,required: true,default:"N.A."},
    unidades:{type: String,maxlength:25,required: true,default:"fracción en masa en %"},
    costo:{type: Number,maxlength:25,required: true,default:0 },
    descripcion:{type: String,minlength:10},
    limiteCuantificacion: {type:Number,required:true},
    responsables:{
        titular:{
            type: mongoose.Schema.ObjectId,
            ref: "Usuario",
        },
        suplente:{
            type: mongoose.Schema.ObjectId,
            ref: "Usuario",
        }
    },
    estado:{type:Number, required:true,default:1}, 
    createdAt: { type: Date,default: Date.now},
    
})

export default mongoose.model("Ensayo",EnsayoSchema)



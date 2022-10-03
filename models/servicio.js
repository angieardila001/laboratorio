import mongoose from 'mongoose';

const ServicioSchema = new mongoose.Schema({
    numCotizacion: {type: String,    required: true}, ///ej: 0001-2022V1 
    fechaEmision: {type: Date,required: true},
    idcliente:{type:mongoose.Schema.ObjectId,ref: "Usuario",required: true},
    validezOferta: {type:Date,maxlength:30,required: true},
    entregaResultados: {type: Date,required: true},

    idElaboradoPor: {type: mongoose.Schema.ObjectId,ref: "Usuario",required: true},
    items: {
        item1:{
            itemsEnsayo: [{
                ensayo: {type: mongoose.Schema.ObjectId,ref: "Ensayo",required: true},
                limiteCuantificacion: {type: Number,maxlength:25,required: true},
                costoEnsayo: {type: Number,maxlength:25,required: true},
            }],
            costoitem:{type: Number,maxlength:25,default: 0}
        },
        item2:{
            itemsEnsayo: [{
                ensayo: {type: mongoose.Schema.ObjectId,ref: "Ensayo"},
                limiteCuantificacion: {type: Number,maxlength:25},
                costoEnsayo: {type: Number,maxlength:25},
            }],
            costoitem:{type: Number,maxlength:25,default:0}
        },
        item3:{
            itemsEnsayo: [{
                ensayo: {type: mongoose.Schema.ObjectId,ref: "Ensayo"},
                limiteCuantificacion: {type: Number,maxlength:25},
                costoEnsayo: {type: Number,maxlength:25},
            }],
            costoitem:{type: Number,maxlength:25,default:0}
        },
        costo: { type: Number}
    },
    observaciones: {type: String,maxlength:50,default: ""},
    subTotal: {type: Number,maxlength:30},
    descuento: {type: Number,maxlength:30, required: true},///descuento sobre el subtotal
    iva: {type: Number,required: true},    
    total: {type: Number}, //falta relacionarlo con la otra tabla   
    estado: {type: Number,default: 1  }, //0 anulada   1:vigente
    createdAt: { type: Date,default: Date.now}
})

export default mongoose.model('Servicio', ServicioSchema)
import mongoose from 'mongoose';

const MuestraSchema = new mongoose.Schema({
    solicitante: {type: mongoose.Schema.ObjectId, ref: "Usuario",required: true},
    codMuestra: { type: String,required: true},///  0001-2022
    munRecoleccion: { type: mongoose.Schema.ObjectId, ref: "Ciudad", required: true},
    direccionTomaMuestra: {type: String,maxlength:25,required: true},
    lugarTomaMuestra: {type: String,maxlength:25,required: true},
    muestraRecolectadaPor: {type: String,maxlength:25,required: true},
    procedimientoMuestreo: {type: String,maxlength:25,required: true,default:"????????????????"},//averiguar
    tipoMuestra: { type: mongoose.Schema.ObjectId,ref: "tipoMuestra",required: true},
    matrizMuestra: {type: String,maxlength:25,required: true,default:"Panela" },//Panela
    fechaRecoleccion: {type: Date,required: true },///UTC
    cotizacion: {type: mongoose.Schema.ObjectId, ref: "Servicio",required: true},
    item: {type: String, default:"Item1",required: true},
    estado: { type: Number,default: 1},
    createdAt: { type: Date,default: Date.now}, 
})

export default mongoose.model('Muestra', MuestraSchema)
import mongoose from 'mongoose';

const tipoMuestraSchema= new mongoose.Schema({
    tipos:{type: String,maxlength:25,required: true}
})

export default mongoose.model("tipoMuestra",tipoMuestraSchema)

//En bloque
//Pulverizada
import mongoose from 'mongoose';

const ConsecutivoSchema= new mongoose.Schema({
    consecutivoMuestra:{type: Number,default:1},
    consecutivoOferta:{type: Number,default:1},
    consecutivoResultados:{type: Number,default:1},
    iva:{type:Number,required:true,default:19}
})

export default mongoose.model("Consecutivo",ConsecutivoSchema)

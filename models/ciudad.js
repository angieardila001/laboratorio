import mongoose from "mongoose";

const CiudadSchema = new mongoose.Schema({
  departamento: { type: String,maxlength:25, required: true},
  codDepartamento: {type: String,maxlength:25,required: true},
  Ciudad: {type: String,maxlength:25, required: true},
  codCiudad: {type: String,maxlength:25,required: true},
});

export default mongoose.model("Ciudad", CiudadSchema);

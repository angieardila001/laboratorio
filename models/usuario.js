import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  tipopersona: { type: String, required: true, default: "Natural" },
  //Natural  Juridica
  funcionario: { type: String, maxlength: 25 },
  nombre: { type: String, maxlength: 25, required: true },
  documento: { type: String, maxlength: 25, required: true },
  direccion: { type: String, maxlength: 25, required: true },
  ciudad: { type: mongoose.Schema.ObjectId, ref: "Ciudad", required: true },
  contacto: { type: String, maxlength: 25 },
  telefonoCo: { type: String, minlength: 7, required: true },
  celular: { type: String, minlength: 7, required: true },
  email: { type: String, maxlength: 50, required: true, unique: true },
  password: { type: String, milLength: 8 },
  rol: { type: String, maxlength: 25, required: true, default: "Natural" },
  estado: { type: Number, default: 1 }, //0 inactivo  1:activo   2:vacaciones
  resetToken:{type: String, default: ""},
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Usuario", UsuarioSchema);

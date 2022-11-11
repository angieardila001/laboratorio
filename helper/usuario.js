import Usuario from "../models/usuario.js"


const helpersUsuarios={
    existeUsuarioById : async (id) => {
        const existe = await Usuario.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

    existeEmail:async(email) => {
        // return async (req, res, next) => { 
            const existe = await Usuario.findOne({ email});
        
                if (existe ) {
                    //return res.status(401).json({ msg: `El email ya está registrado` });
                    throw new Error(`El email ya está registrado`)
                }
        
        
    },
    existeDocumento:async(documento) => {
        // return async (req, res, next) => { 
            const existe = await Usuario.findOne({ documento});
        
                if (existe ) {
                    //return res.status(401).json({ msg: `El email ya está registrado` });
                    throw new Error(`El Numero de cedula ya está registrado`)
                }
        
        
    },
    

    

}
export default helpersUsuarios


   
    


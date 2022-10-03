import Servicio from "../models/servicio.js"


const helpersServicio={
    existeServicioById : async (id) => {
        const existe = await Servicio.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
    validarMongoID: async (items, req) => {
        if (items) {   
            for (let i = 0; i < items.length; i++) {
                const element = items[i].ensayo;
                var isValid =  mongoose.Types.ObjectId.isValid(element);                
                if (!isValid)throw new Error(`Id invalido!!! `)   
            }            
        }
    },
    
    

    

}
export default helpersServicio
import Ciudad from "../models/ciudad.js"


const helpersCiudades={
    existeCiudadById : async (id) => {
        const existe = await Ciudad.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

    
    

    

}
export default helpersCiudades
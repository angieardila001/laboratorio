import Ensayo from "../models/ensayo.js"


const helpersEnsayos={
    existeEnsayoById : async (id) => {
        const existe = await Ensayo.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

    existe:async (tipo_ensayo) => {
        
        const ensayos=await Ensayo.findOne({tipo_ensayo})

        if (ensayos){           
            throw new Error(`${tipo_ensayo} Ya se encuentra Por favor añada otro`)           
        } 
  
    },

    
    

    

}
export default helpersEnsayos
import Resultado from "../models/informe_resultado.js"
import Ensayo from "../models/ensayo.js"

const helpersResultados={
    existeResultadoById : async (id) => {
        const existe = await Resultado.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
    existe: async (id) => {
        const existe = await Ensayo.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
    
    

    

}
export default helpersResultados
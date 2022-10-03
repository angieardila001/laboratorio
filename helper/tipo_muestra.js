import tipoMuestra from "../models/tipo_muestra.js"


const helpersTipo_muestra={
    existetipoMuestraById : async (id) => {
        const existe = await tipoMuestra.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },
}

export default helpersTipo_muestra
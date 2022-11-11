import Consecutivo from "../models/setup.js"

const consecutivoGet = async (req, res) => { //listar todos
    const consecutivos = await Consecutivo.find()
    res.json({
        consecutivos
    })
}

const Post = async (req, res) => { // añadir
    const { iva } = req.body
    try {
        const tipo = new Consecutivo({ iva })
        tipo.save()
        res.json({ tipo })
    } catch (error) {
        return res.status(404).json({ msg: 'Hable con el WebMaster' })
    }
}


const consecutivoPut = async (req, res) => {  //modificar  
    const { id } = req.params;
    const { _id, createdAt, ...resto } = req.body;
    try {
        const modificar = await Consecutivo.findByIdAndUpdate(id, resto);

        res.json({
            modificar
        })
    } catch (error) {
        return res.status(404).json({ msg: 'Hable con el WebMaster' })
    }
}

export { consecutivoGet, consecutivoPut, Post }

const helpersServicio={

    validarMongoID: () => {
        function * generadorIds(id=1){
            while(true){
                yield id;
                ++id;
            }
        }
        
        let generador = generadorIds();
        
        console.log("m",generador.next());
        console.log(generador.next());
        console.log(generador.next());
        console.log(generador.next());
        console.log(generador.next());
    },
    
    

    

}
export default helpersServicio
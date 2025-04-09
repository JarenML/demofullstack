const db = require('./config/db.js');

(async()=>{
    try{
        const result = await db.query('SELECT * from usuario');
        console.log("Conexion exitoso a la fecha y hora actual:", result.rows[0]);
    }catch(error){
        console.log("Error de conexion: ", error);
    }
})();
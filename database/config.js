const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.CONNECTION_DB)
        console.log('Base de datos conectada con exito!');
    } catch (error) {
        console.log(error);
        throw new Error('Error al momento de conectar a la base de datos')
    }
}

module.exports = {
    dbConnection
}

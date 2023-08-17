const Usuario = require('../models/usuario')

const defaultUser = async () => {
    try {
        let user = new Usuario();
        user.user = 'usuario123';
        user.password = 'usuario123';
        user.rol = 'ADMIN';
        const userEncontrado = await Usuario.findOne({ user: user.user });
        if (userEncontrado !== null) return console.log("El administrador está listo");
        user = await user.save();
        if (!user) return console.log("El administrador no está listo!");
        return console.log("El administrador está listo!");
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    defaultUser
}

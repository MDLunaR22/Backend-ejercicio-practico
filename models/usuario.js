const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    user: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    rol: {
        type: String,
    }
});

module.exports = model('Usuario', UsuarioSchema);
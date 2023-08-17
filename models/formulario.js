const {Schema, model, Types} = require('mongoose');

const FormularioSchema = Schema({
    carnet: {
        type: String,
        required: true,
        unique: true,
    },
    nombres:{
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    genero: {
        type: String,
        required: true,
        enum: {
            values: ['Masculino', 'Femenino'],
            message: 'masculino o femenino'
        },
    },
    telefono: {
        type: String,
        required: true,
    },
    fecha_nacimiento: {
        type: Schema.Types.Date,
        required: true,
    },
    carrera_estudiante: {
        type: String,
        required: true,
    },
    genero_poesia: {
        type: String,
        required: true,
        enum: {
            values:['Lírica', 'Épica', 'Dramática'],
            message: 'Ingrese el genero de la poesía correctamente: lírica, épica, dramática'
        },
    },
    fecha_creacion: {
        type: Schema.Types.Date,
        required: true,
    },
    fecha_declamacion: {
        type: Schema.Types.Date,
        required: true,
    }
})

module.exports = model('Formulario', FormularioSchema);

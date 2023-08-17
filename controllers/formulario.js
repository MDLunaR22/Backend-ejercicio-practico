const { request, response } = require('express');
const Formulario = require('../models/formulario')

const getFormularios = async (req = request, res = response) => {
    const listaFormularios = await Formulario.find();

    res.json({
        msg: 'Lista de formularios',
        listaFormularios: listaFormularios.length != 0 ? listaFormularios : 'No hay datos',
    })
}

const postFormularios = async (req = request, res = response) => {
    const { carnet, nombres, direccion, genero, telefono, fecha_nacimiento, carrera_estudiante, genero_poesia, fecha_creacion } = req.body;
    const FormCarnet = await Formulario.findOne({ carnet: carnet });

    // Declaración de la variable nacimiento para obtener el año que ingreso el usuario y validar si es menor o mayor de edad
    let fechaCreacion = new Date();
    let nacimiento = new Date(fecha_nacimiento);
    // Validación para ver si es mayor o menor de edad 
    if (fechaCreacion.getFullYear() - nacimiento.getFullYear() < 18) {
        return res.status(400).json({
            msg: 'No puede registrarse si es menor de edad'
        })
    }

    if (carnet.length != 6) {
        return res.status(400).json({
            msg: 'El carnet debe tener 6 caracteres como mínimo y máximo'
        })
    } else {
        if (carnet.charAt(0) != 'A') return res.status(400).json({ msg: 'Debe llevar A al comienzo del carnet' });

        if (carnet.charAt(2) != 5) return res.status(400).json({ msg: 'No contiene el numero 5 en el tercer carácter' })

        if (carnet.charAt(carnet.length - 1) !== '1' && carnet.charAt(carnet.length - 1) !== '3' && carnet.charAt(carnet.length - 1) !== '9') return res.status(400).json({ msg: 'No contiene, al final del carnet, ninguno de los siguientes dígitos: 1, 3 o 9' })
    }

    if (FormCarnet) {
        return res.status(400).json({
            msg: 'Ya hay un carnet existente con estos caracteres'
        })
    }

    if (genero !== 'Masculino' && genero !== 'Femenino') {
        return res.status(500).json({
            msg: 'El genero no existe'
        })
    }

    if (genero_poesia != 'Lírica' && genero_poesia != 'Épica' && genero_poesia != 'Dramática') {
        return res.status(500).json({
            msg: 'El genero de poesia no existe'
        })
    }

    let fecha_declamacion = new Date();
    if (carnet.charAt(carnet.length - 1) == '1' && genero_poesia == 'Lírica'){
        let i = 0
        while (i < 4) {
            if (fecha_declamacion.toUTCString().substring(0, 3) == 'Sun' || fecha_declamacion.toUTCString().substring(0, 3) == 'Sat') {
                fecha_declamacion.setDate(fecha_declamacion.getDate() + 1);
                continue
            };
            i++;
            console.log(fecha_declamacion.toUTCString())
            fecha_declamacion.setDate(fecha_declamacion.getDate() + 1);
        }
    } else if (carnet.charAt(carnet.length - 1) == '3' && genero_poesia == 'Épica') {
        const lastDateOfThisMonth = new Date(fechaCreacion.getFullYear(), fechaCreacion.getMonth() + 1, -1);
        if (lastDateOfThisMonth.toUTCString().substring(0, 3) == 'Sun') {
            lastDateOfThisMonth.setDate(lastDateOfThisMonth.getDate() - 2);
            fecha_declamacion.setDate(lastDateOfThisMonth.getDate());

        } else if (lastDateOfThisMonth.toUTCString().substring(0, 3) == 'Sat') {
            lastDateOfThisMonth.setDate(lastDateOfThisMonth.getDate() - 1);
            fecha_declamacion.setDate(lastDateOfThisMonth.getDate());
        } else {
            console.log(lastDateOfThisMonth.getDate());
            fecha_declamacion.setDate(lastDateOfThisMonth.getDate());
        }
    } else {
        const weekEnd = new Date(fechaCreacion);
        weekEnd.setDate(fechaCreacion.getDate() - fechaCreacion.getDay() + 4);
        fecha_declamacion.setDate(weekEnd.getDate());
    }

    const data = {
        carnet: carnet,
        nombres: nombres,
        direccion: direccion,
        genero: genero,
        telefono: telefono,
        fecha_nacimiento: fecha_nacimiento,
        carrera_estudiante: carrera_estudiante,
        genero_poesia: genero_poesia,
        fecha_creacion: fechaCreacion,
        fecha_declamacion,
    }

    const newForm = new Formulario(data);

    // await newForm.save();

    res.json({
        msg: 'Agregado con éxito',
        newForm
    })
}

module.exports = {
    getFormularios,
    postFormularios
}
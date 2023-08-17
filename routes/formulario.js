const { Router } = require('express')
const router = Router()
const { getFormularios, postFormularios } = require('../controllers/formulario');

router.get('/registros/' ,getFormularios);

router.post('/agregar/registro/', postFormularios)

module.exports = router;

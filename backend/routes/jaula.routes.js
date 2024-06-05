const express = require('express');


const jaulaController = require("../controllers/jaula.controller.js");

const accesoController = require("../controllers/acceso.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();
router.use(authenticationMiddleware);



router.post('/', authorizationMiddleware.esAdmin, jaulaController.crearJaula);
router.put('/:id', authorizationMiddleware.esAdmin, jaulaController.actualizarJaula);
router.get('/', jaulaController.listarJaulas);  
router.get('/:id', jaulaController.getJaula);
router.delete('/:id', authorizationMiddleware.esAdmin, jaulaController.eliminarJaula);
router.post('/salidaGuardia', authorizationMiddleware.esAdmin, accesoController.salidaGuardiaAdmin);


module.exports = router;

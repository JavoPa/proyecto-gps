
const router = express.Router();
const userController = require('../controllers/user.controller.js');


router.get('/obtener', userController.obtenerUsuarios);

module.exports = router;
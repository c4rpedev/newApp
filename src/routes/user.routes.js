const express = require('express');
const router = express.Router();

//imports
const userCtr = require('../controllers/user.controller');
const auth = require('../security/authjwt');

//gestión de roles
const verifyToken = auth.verifyToken;
const Administrador = auth.Adminitrador;

//routes
router.get('/', [verifyToken], userCtr.getUser);
router.get('/:id', [verifyToken, Administrador], userCtr.getUserById);
router.get('/paginated/:page', [verifyToken, Administrador], userCtr.getUserPaginated);
router.put('/:id', [verifyToken], userCtr.editUser);
router.delete('/:id', [verifyToken, Administrador], userCtr.deleteUser);

module.exports = router;
//Imports
const express = require('express');
const router = express.Router();
const userCtr = require('../controllers/user.controller');
const auth = require('../security/authjwt');

//gestión de roles
const verifyToken = auth.verifyToken;
const Administrador = auth.Adminitrador;

//Routes
router.get('/', [verifyToken], userCtr.getUser);
router.get('/:id', [verifyToken, Administrador], userCtr.getUserById);
router.get('/paginated/:page', [verifyToken], userCtr.getUserPaginated);
router.put('/:id', [verifyToken, Administrador], userCtr.editUser);
router.delete('/:id', [verifyToken, Administrador], userCtr.deleteUser);

module.exports = router;
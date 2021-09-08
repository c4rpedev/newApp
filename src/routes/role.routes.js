const express = require('express');
const router = express.Router();

//imports
const roleCtr = require('../controllers/role.controller');
const auth = require('../security/authjwt');

//gestión de roles
const verifyToken = auth.verifyToken;
const Administrador = auth.Adminitrador;

//routes
router.get('/', [verifyToken], roleCtr.getRole);
router.post('/', [verifyToken, Administrador], roleCtr.createRole);
router.get('/:id', [verifyToken], roleCtr.getRoleById);
router.put('/:id', [verifyToken], roleCtr.editRole);
router.delete('/:id', [verifyToken, Administrador], roleCtr.deleteRole);

module.exports = router;
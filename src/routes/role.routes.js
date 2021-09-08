const express = require('express');
const router = express.Router();
// const auth = require('../security/authjwt');
// const verifyToken = auth.verifyToken;
// const Administrador = auth.Adminitrador;

const roleCtr = require('../controllers/role.controller');

router.get('/', roleCtr.getRole);
router.post('/', roleCtr.createRole);
router.get('/:id', roleCtr.getRoleById);
router.put('/:id', roleCtr.editRole);
router.delete('/:id', roleCtr.deleteRole);

module.exports = router;
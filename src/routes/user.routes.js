const express = require('express');
const router = express.Router();

const userCtr = require('../controllers/user.controller');

// const auth = require('../security/authjwt');
// const verifyToken = auth.verifyToken;
// const Adminitrador = auth.Adminitrador;
// const Usuario = auth.Usuario;


router.get('/', userCtr.getUser);
router.get('/:id', userCtr.getUserById);
router.get('/paginated/:page', userCtr.getUserPaginated);
router.put('/:id', userCtr.editUser);
router.delete('/:id', userCtr.deleteUser);

module.exports = router;
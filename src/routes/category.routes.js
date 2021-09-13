//Imports
const express = require('express');
const router = express.Router();
const cateCtr = require('../controllers/category.controller');
const auth = require('../security/authjwt');

//gestión de roles
const verifyToken = auth.verifyToken;
const Administrador = auth.Adminitrador;

//Routes!
router.get('/', [verifyToken], cateCtr.getCategory);
router.get('/active/', [verifyToken], cateCtr.getCategoryActive);
router.post('/', [verifyToken], cateCtr.createCategory);
router.get('/:id', [verifyToken], cateCtr.getCategoryById);
router.put('/:id', [verifyToken], cateCtr.editCategory);
router.delete('/:id', [verifyToken], cateCtr.deleteCategory);
router.get('/paginated/:page', [verifyToken], cateCtr.getCategoryPaginated);


module.exports = router;
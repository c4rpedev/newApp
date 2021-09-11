//Imports
const express = require('express');
const router = express.Router();
const productCtr = require('../controllers/products.controller');
const auth = require('../security/authjwt');

//gestión de roles
const verifyToken = auth.verifyToken;
const Administrador = auth.Adminitrador;

//Routes
router.get('/', [verifyToken], productCtr.getProduct);
router.post('/', [verifyToken], productCtr.createProduct);
router.get('/:id', [verifyToken], productCtr.getProductById);
router.put('/:id', [verifyToken], productCtr.editProduct);
router.delete('/:id', [verifyToken], productCtr.deleteProduct);
router.get('/paginated/:page', [verifyToken], productCtr.getProductPaginated);


module.exports = router;
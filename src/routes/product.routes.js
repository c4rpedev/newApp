//Imports
const express = require('express');
const router = express.Router();
const productCtr = require('../controllers/products.controller');
const auth = require('../security/authjwt');

//Imagen
const upload = require('./../libs/multer');

//gestión de roles
const verifyToken = auth.verifyToken;
const Administrador = auth.Adminitrador;

//Routes
router.get('/', productCtr.getProduct);
router.post('/', upload.single('picture'), productCtr.createProduct);
router.put('/img/:id', upload.single('picture'), productCtr.editProductImg);
router.get('/:id', [verifyToken], productCtr.getProductById);
router.put('/:id', [verifyToken], productCtr.editProduct);
router.delete('/:id', [verifyToken], productCtr.deleteProduct);
router.get('/paginated/:page', [verifyToken], productCtr.getProductPaginated);
router.get('/paginatedactive/:page', [verifyToken], productCtr.getProductPaginatedActive);


module.exports = router;
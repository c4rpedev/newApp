//Imports
const express = require('express');
const router = express.Router();
const orderCtr = require('../controllers/order.controller');

//gestión de roles
const auth = require('../security/authjwt');
const verifyToken = auth.verifyToken;
const Administrador = auth.Adminitrador;
const Usuario = auth.Usuario;

//Routes
router.get('/', orderCtr.getOrders);
router.post('/', orderCtr.createOrder);
router.get('/paginated/:page', [verifyToken, Administrador], orderCtr.getOrderPaginated);
router.get('/paginatedbyuser/:page', [verifyToken], orderCtr.getOrderPaginatedbyUser);
router.put('/:id', [verifyToken, Administrador], orderCtr.editOrder);
router.delete('/:id', [verifyToken, Administrador], orderCtr.deleteOrder);


module.exports = router;
// Imports
const Order = require('../models/Order');

// Variables
const orderCtrl = {};

// Metods
orderCtrl.getOrders = async (req, res) => {
    const order = await Order.find();
    res.json(order);
}

orderCtrl.getOrderPaginated = async (req, res) => {
    let perPage = 9;
    let page = req.params.page || 1;
    const order = await Order.find({})
        .skip((perPage * (page - 1)))
        .limit(perPage)
        .populate("products");
    const total = await Order.count();
    const pages = Math.ceil(total / perPage);
    res.json({ order, pages, current: page });
}

orderCtrl.getOrderPaginatedbyUser = async (req, res) => {
    let perPage = 9;
    let page = req.params.page || 1;
    const userid = req.query.userid;

    const order = await Order.find({ userId: userid })
        .skip((perPage * (page - 1)))
        .limit(perPage);
    const total = await Order.find({ userId: userid });
    const pages = Math.ceil(total.length / perPage);
    res.json({ order, pages, current: page, total: total.length });
}


orderCtrl.createOrder = async (req, res) => {
    const products = req.body.products;
    const numorder = await Order.count() + 1;
    const order = new Order();
    order.numorder = numorder;
    order.state = "En Proceso";
    order.userId = req.body.user;
    order.userName = req.body.userName;
    for (let i = 0; i < products.length; i++) {
        order.quantity.push(products[i][1]);
        order.products.push(products[i][0]._id);
    }
    await order.save(
        (error, docs) => {
            if (error) {
                res.send({ items: 'Error' })
            }
        });

    res.json({
        order: order
    });
};

orderCtrl.deleteOrder = async (req, res) => {
    await Order.findByIdAndRemove(req.params.id, (error, docs) => {
        if (error) {
            res.send({ items: 'Error' })
        } else {
            res.json({ status: 'Order eliminado' });
        };
    });
}

orderCtrl.editOrder = async (req, res) => {
    const { id } = req.params
    const body = req.body

    await Order.updateOne(
        { _id: id },
        body,
        (err, docs) => {
            if (err) {
                res.send({ items: 'Error' })
            } else {
                res.json({ status: 'Order actualizada' });
            }
        })
}

// Export
module.exports = orderCtrl;
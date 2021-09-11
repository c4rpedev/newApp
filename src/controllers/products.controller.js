//Imports
const Product = require('../models/Products');
const Category = require('../models/Category');

//Variables
const productCtrl = {};

//Metods
productCtrl.getProduct = async (req, res) => {
    const product = await Product.find();
    res.json(product);
}

productCtrl.createProduct = async (req, res) => {
    const product = new Product(req.body);
    const category = await Category.findOne({ name: req.body.category })
    product.category = category._id;
    await product.save(
        (error, docs) => {
            if (error) {
                res.send({ items: 'Error' })
            }
        });

    res.json({
        status: 'Producto guardado'
    });
};

productCtrl.getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id, (error, docs) => {
        if (error) {
            res.send({ items: 'Error' })
        }
    });
    res.json(product);
}

productCtrl.editProduct = async (req, res) => {

    const { id } = req.params
    const body = req.body

    const category = await Category.findOne({ name: req.body.category })
    if(category){
        body.category = category._id;
    }
    
    await Product.updateOne(
        { _id: id },
        body,
        (err, docs) => {
            if (err) {
                res.send({ items: 'Error' })
            }else{
                res.json({ status: 'Producto actualizado' });
            }
        })   
}


productCtrl.deleteProduct = async (req, res) => {
    await Product.findOneAndRemove({ _id: req.params.id }, (error, docs) => {
        if (error) {
            res.send({ items: 'Error' })
        } else {
            res.json({ status: 'Producto eliminado' });
        };
    });
}

productCtrl.getProductPaginated = async (req, res) => {
    let perPage = 9;
    let page = req.params.page || 1;
    const product = await Product.find()
        .skip((perPage * (page - 1)))
        .limit(perPage)
        .populate("category");
    const total = await Product.count();
    const pages = Math.ceil(total / perPage);
    res.json({ product, pages, current: page });
}


//Exports
module.exports = productCtrl;
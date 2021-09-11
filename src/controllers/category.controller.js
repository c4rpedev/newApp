//Imports
const Category = require('../models/Category');

//Variables
const cateCtrl = {};

//Metods
cateCtrl.getCategory = async (req, res) => {
    const category = await Category.find();
    res.json(category);
}

cateCtrl.getCategoryActive = async (req, res) => {
    const category = await Category.find({ active: true });
    res.json(category);
}

cateCtrl.createCategory = async (req, res) => {
    const category = new Category(req.body);

    if (await Category.findOne({ name: category.name })) {
        return res.status(401).json({ message: "Ya existe una Categoría con ese Nombre" })
    }

    await category.save(
        (error, docs) => {
            if (error) {
                res.send({ items: 'Error' })
            }
        });

    res.json({
        status: 'Categoría guardada'
    });
};

cateCtrl.getCategoryById = async (req, res) => {
    const category = await Category.findById(req.params.id, (error, docs) => {
        if (error) {
            res.send({ items: 'Error' })
        }
    });
    res.json(category);
}

cateCtrl.getCategoryPaginated = async (req, res) => {
    let perPage = 9;
    let page = req.params.page || 1;
    const category = await Category.find()
        .skip((perPage * (page - 1)))
        .limit(perPage)
    const total = await Category.count();
    const pages = Math.ceil(total / perPage);
    res.json({ category, pages, current: page });
}

cateCtrl.editCategory = async (req, res) => {

    const { id } = req.params
    const body = req.body
    await Category.updateOne(
        { _id: id },
        body,
        (err, docs) => {
            if (err) {
                res.send({ items: 'Error' })
            }else{
                res.json({ status: 'Categoría actualizada' });
            }
        })
    
}


cateCtrl.deleteCategory = async (req, res) => {
    await Category.findOneAndRemove({ _id: req.params.id }, (error, docs) => {
        if (error) {
            res.send({ items: 'Error' })
        } else {
            res.json({ status: 'Categoría eliminada' });
        };
    });
}

//Exports
module.exports = cateCtrl;
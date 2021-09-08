//Imports
const Role = require('../models/Role');

//Variables
const roleCtrl = {};

//Metods
roleCtrl.getRole = async (req, res) => {
    const role = await Role.find();
    res.json(role);
}

roleCtrl.createRole = async (req, res) => {
    const role = new Role(req.body);

    if (await Role.findOne({ name: role.name })) {
        return res.status(401).json({ message: "Ya existe un rol con ese Nombre" })
    }

    await role.save(
        (error, docs) => {
            if (error) {
                res.send({ items: 'Error' })
            }
        });

    res.json({
        status: 'Role guardado'
    });
};

roleCtrl.getRoleById = async (req, res) => {
    const role = await Role.findById(req.params.id, (error, docs) => {
        if (error) {
            res.send({ items: 'Error' })
        }
    });
    res.json(role);
}

roleCtrl.editRole = async (req, res) => {

    const { id } = req.params
    const body = req.body
    await Role.updateOne(
        { _id: id },
        body,
        (err, docs) => {
            if (err) {
                res.send({ items: 'Error' })
            }
        })
    res.json({ status: 'Role actualizado' });
}


roleCtrl.deleteRole = async (req, res) => {
    await Role.findOneAndRemove({ _id: req.params.id }, (error, docs) => {
        if (error) {
            res.send({ items: 'Error' })
        } else {
            res.json({ status: 'Role eliminado' });
        };
    });
}

//Exports
module.exports = roleCtrl;
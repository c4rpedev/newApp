const User = require('../models/User');
const Role = require('../models/Role');

const startup = {}

startup.init = async (req, res, next) => {
    try {
        //Creando datos básicos en BD(ROL, USER)
        const roles = await Role.countDocuments();
        if (roles < 1) {
            //ROL ADMIN
            const role = new Role({
                "name": "Super Administrador"
            });

            await role.save(
                (error, docs) => {
                    if (error) {
                        res.send({ items: 'Error' })
                    }else{
                        console.log(role + ' <--role creado')
                    }
                });
            
            //ROL USUARIO
            const user = new Role({
                "name": "Usuario"
            });

            await user.save(
                (error, docs) => {
                    if (error) {
                        res.send({ items: 'Error' })
                    }else{
                        console.log(user + ' <--role creado')
                    }
                });

            //USER ADMIN
            var userSA = new User({
                "username": "SA",
                "email": "yoyi1239707@gmail.com",
                "name": "Jorge",
                "CI": 97070407706,
                "password": "Qwerty2021*",
                "active": true
            });
            const pass = await User.encryptPassword(userSA.password);
            userSA.password = pass;

            const roleSA = await Role.findOne({ name: "Super Administrador" })
            userSA.roles = [roleSA._id];

            await userSA.save(
                (error, docs) => {
                    if (error) {
                        console.log(error)
                    }else{
                        console.log(userSA + ' <--administrador creado creado')
                    }
                });
        }
    } catch (error) {
        console.log(error);
    }
}





module.exports = startup;
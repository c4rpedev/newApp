//imports
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const Role = require('../models/Role');

const auth = {}
        //verificar si el token es real
        auth.verifyToken = async (req, res, next) => {
            try{
                const token = req.headers["x-access-token"];
            
                if(!token) return res.status(403).json({message: "No se envió un token."})
                const decoded = jwt.verify(token, config.SECRET.toString())
                const user = await User.findById(decoded.id, {password: 0})
                if(!user) return res.status(404).json({message: "No se encontró el ususario."})
            
            next()
            }catch (error){
            return res.status(401).json({message: "No autorizado."})
            }
        }

        //especificar rol a verificar
        var Rol = ""
        auth.Adminitrador = (req, res, next) => {
            Rol = "Administrador"
            auth.isInRole(req, res, next)
        }
        auth.Usuario = (req, res, next) => {
            Rol = "Usuario"
            auth.isInRole(req, res, next)
        }

        //verificar rol del usuario con el antes seleccionado
        auth.isInRole = async (req, res, next) => {
            var siguiente = true
            
            const token = req.headers["x-access-token"];
            const decoded = jwt.verify(token, config.SECRET.toString())

            const user = await User.findById(decoded.id)
            const roles = await Role.find({_id: {$in: user.roles}})
            
            for(let i = 0; i < roles.length; i++){
                if(roles[i].name === Rol || 'Super Administrador'){
                    siguiente = false
                    next()
                }
            }
            if(siguiente){
                return res.status(403).json({message: "No tiene el rol requerido"})
            }
        }
    
    


module.exports = auth;
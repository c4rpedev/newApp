//Imports
const mongoose = require('mongoose');
const { Schema } = mongoose;

//Model
const RoleSchema = new Schema(
    {
        name: { type: String, required: true, unique: true},
    },
    {
        versionKey: false,
        timestamps: true
    });

    
//Export
module.exports = mongoose.model('Role', RoleSchema);


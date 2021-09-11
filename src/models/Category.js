//Imports
const mongoose = require('mongoose');
const { Schema } = mongoose;

//Model
const CategorySchema = new Schema(
    {
        name: { type: String, required: true, unique: true},
        active: { type: Boolean, required: true },
    },
    {
        versionKey: false,
        timestamps: true
    });

    
//Export
module.exports = mongoose.model('Category', CategorySchema);


//Imports
const mongoose = require('mongoose');
const { Schema } = mongoose;

//Model
const ProductSchema = new Schema(
    {
        name: { type: String, required: true},
        price: { type: Number, required: true},
        cost: { type: Number},
        um: { type: String},
        amount: { type: Number},
        state: { type: Boolean, required: true},
        category: {
            ref: "Category",
            type: Schema.Types.ObjectId
        },
    },
    {
        versionKey: false,
        timestamps: true
    });

    
//Export
module.exports = mongoose.model('Product', ProductSchema);


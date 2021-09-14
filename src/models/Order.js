//Imports
const mongoose = require('mongoose');
const { Schema } = mongoose;

//Model
const OrderSchema = new Schema(
    {
        userId: {
            ref: "User",
            type: Schema.Types.ObjectId
        },
        products: [{
            ref: "Product",
            type: Schema.Types.ObjectId
        }],
        userName: { type: String},
        numorder: { type: Number, required: true },
        quantity: [{ type: Number, required: true }],
        state: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true
    });


//Export
module.exports = mongoose.model('Order', OrderSchema);


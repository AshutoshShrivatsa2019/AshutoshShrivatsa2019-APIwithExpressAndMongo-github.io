const mongoose = require("mongoose");
const Joi = require('@hapi/joi');

const productSchema = mongoose.Schema({
    // _id:Number,
    _id: mongoose.Schema.Types.ObjectId,
    sku: String,
    name: String,
    SOH: Number,
    price: Number
});

productSchema.methods.joiValidate = function (obj) {
var schema={
    sku:Joi.string().min(3).required(),
    name:Joi.string().min(3).required(),
    SOH:Joi.number().integer(),
    price:Joi.number().integer()
}
return Joi.validate(obj,schema);
}

module.exports = mongoose.model("Product", productSchema);
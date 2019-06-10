const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const ProductClaimedSchema = new mongoose.Schema({
    produit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Produit'
    },
    date_production:{
        type : String,
        required:true
    },
    date_reception:{
        type : String,
        required:true
    },
    quantity:{
        type : String,
        required:true
    }
});
ProductClaimedSchema.plugin(uniqueValidator);

const ProductClaimed = mongoose.model('ProductClaimed',ProductClaimedSchema);

function validateProductClaimed(productClaimed){
    const schema = {
        produit : Joi.string().required(),
        date_production:Joi.string().required(),
        date_reception:Joi.string().required(),
        quantity:Joi.string().required()
    };
    return Joi.validate(productClaimed,schema);
}


exports.ProductClaimed = ProductClaimed;
exports.validate=validateProductClaimed;

const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const CommandeProductSchema = new mongoose.Schema({
    produit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Produit'
    },
    dateDelivery:{
        type: String, required: true
    }, 
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    },
    quantity:{
        type: Number, required: true
    }
});
//ImportMatierePrimaireSchema.plugin(uniqueValidator);

const CommandeProduct = mongoose.model('CommandeProduct',CommandeProductSchema);

function validateCommandeProduct(commandeProduct){
    const schema = {
        produitId : Joi.string().required(),
        dateDelivery:Joi.string().required(),
        companyId:Joi.string().required(),
        quantity:Joi.number().required()
    };
    return Joi.validate(commandeProduct,schema);
}


exports.CommandeProduct = CommandeProduct;
exports.validate=validateCommandeProduct;

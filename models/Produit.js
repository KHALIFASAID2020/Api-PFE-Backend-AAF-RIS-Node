const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const ProduitSchema = new mongoose.Schema({
    RefProduit : {
        type: String, required: true,unique:true
    },
    DesignationProduit:{
        type : String,
        required:true,
    },
    typeProduit:{
        type : String,
        required:true
    }
});
ProduitSchema.plugin(uniqueValidator);

const Produit = mongoose.model('Produit',ProduitSchema);

function validateProduit(produit){
    const schema = {
        RefProduit : Joi.string().required(),
        DesignationProduit:Joi.string().required(),
        typeProduit:Joi.string().required()
    };
    return Joi.validate(produit,schema);
}


exports.Produit = Produit;
exports.validate=validateProduit;
/* 
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name : {type: String, required: true, unique: true},
    address : {type : String , required: true},
    pays : {type : String , required: true},
    website : {type : String , required: true}
},{
    timestamps : true
});
userSchema.plugin(uniqueValidator);

const User = mongoose.model('Company',userSchema);
module.exports = User; */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');
//const {Company} = require('./Company');
//const nodeMailer = require('nodemailer');
const reclamationSchema = new mongoose.Schema({
    refReclamation : {
        type: String, required: true,unique:true
    },
    typecompany:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Typecompany'
    },
     produit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Produit'
    },
    quantity:{
        type : Number,
        required:true,
    },
    description:{
        type : String,
        required:true,
    },
    daterep:{
        type : String,
        required:true
    },
    datelimit:{
        type : String,
        required:true
    },
    defaut:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Defaut'
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    destination:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
   

},{
    timestamps : true
});
reclamationSchema.plugin(uniqueValidator);

const Reclamation = mongoose.model('Reclamation',reclamationSchema);

function validateReclamation(reclamation){
    const schema = {
        refReclamation:Joi.string().required(),
        typecompany:Joi.string().required(),
        produit:Joi.string().required(),
        quantity:Joi.number().required(),
        description:Joi.string().required(),
        daterep:Joi.string().required(),
        datelimit:Joi.string().required(),
        defaut:Joi.string().required(),
        company:Joi.string().required(),
        creator:Joi.string().required(),
        destination:Joi.string().required(),
  
    };
    return Joi.validate(reclamation,schema);
}

exports.Reclamation = Reclamation;
exports.validate=validateReclamation; 
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
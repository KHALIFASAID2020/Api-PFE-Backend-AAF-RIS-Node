/* const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');
//const {Company} = require('./Company');
//const nodeMailer = require('nodemailer');

const documentUploadSchema=new mongoose.Schema({
    lien :{
        type: String, required: true,unique:true
    }
});
documentUploadSchema.plugin(uniqueValidator);

const document = mongoose.model('document',documentUploadSchema);

exports.document = document;



const reclamationSchema = new mongoose.Schema({
    refReclamation : {
        type: String, required: true,unique:true
    },
    produit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Produit'
    },
    defaut:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Defaut'
    },
    description:{
        type : String,
        required:true,
    },
    daterep:{
        type : Date,
        required:true
    },
    documents:{
        type : [document]
    },
    datelimit:{
        type : Date,
        required:true
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

function validateReclamation(Reclamation){
    const schema = {
        refReclamation:Joi.string().required(),
        typeId:Joi.string().required(),
        produitId:Joi.string().required(),
        defautId:Joi.string().required(),
        description:Joi.string().required(),
        daterep:Joi.string().required(),
        datelimit:Joi.string().required(),
        creator:Joi.string().required(),
        destination:Joi.string().required()
    };
    return Joi.validate(user,schema);
}

exports.Reclamation = Reclamation;
exports.validate=validateReclamation; */
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
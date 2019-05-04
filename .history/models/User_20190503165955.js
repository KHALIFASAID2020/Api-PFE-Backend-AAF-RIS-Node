const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {type: String, required: true, unique: true},
    password : {type : String , required: true},
    lastname : {type : String , required: true},
    firstname : {type : String , required: true},
    company : {type : String , required: true},
    poste : {type : String , required: true},
    role : {type : String , required: true}
},{
    timestamps : true
});
userSchema.plugin(uniqueValidator);

const User = mongoose.model('User',userSchema);
module.exports = User;


const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const userSchema = new mongoose.Schema({
    email : {
        type: String, required: true,unique:true
    },
    password:{
        type : String,
        required:true,
    },
    lastname:{
        type : String,
        required:true,
    },
    firstname:{
        type : String,
        required:true,
    },
    company:{
        type : String,
        required:true,
    },
    poste:{
        type : String,
        required:true,
    },
    role:{
        type : String,
        required:true,
    }

},{
    timestamps : true
});
CompanySchema.plugin(uniqueValidator);

const Company = mongoose.model('Company',CompanySchema);

function validateCompany(Company){
    const schema = {
        companyName : Joi.string().required(),
        companyAddress:Joi.string().required(),
        compnayPhone:Joi.string(),
        companyFax:Joi.string(),
        companyWebsite:Joi.string(),
        companyInfo:Joi.string(),
        companyCountry:Joi.string()
    };
    return Joi.validate(Company,schema);
}

exports.Company = Company;
exports.validate=validateCompany;
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
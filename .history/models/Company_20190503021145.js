const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    companyName : {
        type: String, required: true,unique:true
    },
    companyAddress:{
        type : String,
        required:true,
    },
    compnayPhone:{
        type: String
    },
    companyFax:{
        type:String
    },
    companyWebsite:{
        type:String
    },
    companyInfo:{
        type:String
    },
    companyCountry:{
        type:String
    }

});
CompanySchema.plugin(uniqueValidator);

const Company = mongoose.model('Company',CompanySchema);

function validateCompany(company){
    const schema = {
        companyName : Joi.string().required(),
        companyAddress:Joi.string().required(),
        compnayPhone:Joi.string(),
        companyFax:Joi.string(),
        companyWebsite:Joi.string(),
        companyInfo:Joi.string(),
        companyCountry:Joi.string()
    };
    return Joi.validate(company,schema);
}

exports.CompanySchema = CompanySchema;
exports.Company =Company;
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
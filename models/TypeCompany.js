const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const TypecompanySchema = new mongoose.Schema({
    type_company : {
        type: String, required: true,unique:true
    }
});
TypecompanySchema.plugin(uniqueValidator);

const Typecompany = mongoose.model('Typecompany',TypecompanySchema);

function validateCompany(company){
    const schema = {
        type_company : Joi.string().required()
    };
    return Joi.validate(company,schema);
}



exports.Typecompany = Typecompany;
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
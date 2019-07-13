const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const DocumentStandarisationSchema = new mongoose.Schema({
    RefDocument : {
        type: String, required: true,unique:true
    }
});
DocumentStandarisationSchema.plugin(uniqueValidator);

const DocumentStandarisation = mongoose.model('DocumentStandarisation',DocumentStandarisationSchema);

function validateDocument(document){
    const schema = {
        RefDocument : Joi.string().required()
    };
    return Joi.validate(document,schema);
}


exports.DocumentStandarisation = DocumentStandarisation;
exports.validate=validateDocument;
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
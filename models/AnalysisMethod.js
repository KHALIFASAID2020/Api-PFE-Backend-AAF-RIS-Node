const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const AnalysisMethodSchema = new mongoose.Schema({
    AnalysisMethodName : {
        type: String, required: true,unique:true
    }
});
AnalysisMethodSchema.plugin(uniqueValidator);

const AnalysisMethod = mongoose.model('AnalysisMethod',AnalysisMethodSchema);

function validateMethod(method){
    const schema = {
        AnalysisMethodName : Joi.string().required()
    };
    return Joi.validate(method,schema);
}


exports.AnalysisMethod = AnalysisMethod;
exports.validate=validateMethod;
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
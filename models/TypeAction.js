const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const TypeActionSchema = new mongoose.Schema({
    TypeAction : {
        type: String, required: true,unique:true
    }
});
TypeActionSchema.plugin(uniqueValidator);

const TypeAction = mongoose.model('TypeAction',TypeActionSchema);

function validateDocument(typeaction){
    const schema = {
        TypeAction : Joi.string().required()
    };
    return Joi.validate(typeaction,schema);
}


exports.TypeAction = TypeAction;
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
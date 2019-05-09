const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const TypeCompanySchema = new mongoose.Schema({
    TypeCompany : {
        type: String, required: true,unique:true
    }
});
TypeCompanySchema.plugin(uniqueValidator);

const Type = mongoose.model('Type',TypeCompanySchema);

function validateType(Type){
    const schema = {
        TypeCompany : Joi.string().required()
    };
    return Joi.validate(Type,schema);
}
exports.TypeCompanySchema = TypeCompanySchema;

exports.Type = Type;
exports.validate=validateType;

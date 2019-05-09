const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const DefautSchema = new mongoose.Schema({
    codeDefaut : {
        type: String, required: true,unique:true
    },
    DesignationDefautFr:{
        type : String,
        required:true,
    },
    DesignationDefautDe:{
        type : String,
        required:true,
    },
    DesignationDefautEn:{
        type : String,
        required:true,
    }
});
DefautSchema.plugin(uniqueValidator);

const Defaut = mongoose.model('Defaut',DefautSchema);

function validateDefaut(Defaut){
    const schema = {
        codeDefaut : Joi.string().required(),
        DesignationDefautFr:Joi.string().required(),
        DesignationDefautDe:Joi.string().required(),
        DesignationDefautEn:Joi.string().required()
    };
    return Joi.validate(Defaut,schema);
}
exports.DefautSchema = DefautSchema;

exports.Defaut = Defaut;
exports.validate=validateDefaut;

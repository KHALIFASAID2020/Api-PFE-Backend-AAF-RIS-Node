const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const Causechema = new mongoose.Schema({
    causeDefaut : {
        type: String, required: true,unique:true
    },
    analysisMethod:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AnalysisMethod'
    },
    DescriptionCause:{
        type : String,
        required:true
    }
});
Causechema.plugin(uniqueValidator);

const Cause = mongoose.model('Cause',Causechema);

function validateCause(cause){
    const schema = {
        causeDefaut : Joi.string().required(),
        analysisMethodId:Joi.string(),
        DescriptionCause:Joi.string().required(),
    };
    return Joi.validate(cause,schema);
}
exports.Causechema = Causechema;

exports.Cause = Cause;
exports.validate=validateCause;

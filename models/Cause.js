const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const Causechema = new mongoose.Schema({
    rootCause : {
        type: String, required: true
    },
    analysisMethod:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AnalysisMethod'
    },
    pourcent:{
        type : String,
        required:true
    },actionplan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ActionPlan'
    }
});
Causechema.plugin(uniqueValidator);

const Cause = mongoose.model('Cause',Causechema);

function validateCause(cause){
    const schema = {
        rootCause : Joi.string().required(),
        analysisMethod:Joi.string().required(),
        pourcent:Joi.string().required()
    };
    return Joi.validate(cause,schema);
}
exports.Causechema = Causechema;

exports.Cause = Cause;
exports.validate=validateCause;

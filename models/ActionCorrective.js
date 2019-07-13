//TypeAction

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const ActionCorrectiveSchema = new mongoose.Schema({
    refAction : {
        type: String, required: true,unique:true
    },
    status : {
        type: String, required: true
    },
    position : {
        type: Number, required: true
    },
    description : {
        type: String, required: true
    },
    actionplan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ActionPlan'
    },
    responsableAction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    typeAction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TypeActionPlan'
    },
    dateResponse:{
        type: String, required: true    
    },
    responseDescription:{
        type: String, required: true   
    },
    photo:{
        type: String, required: true 
    },
    cause:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cause'
    }
    /* responseDescription?:string;
  photo?:string; */
},{
    timestamps : true
});
ActionCorrectiveSchema.plugin(uniqueValidator);

const ActionCorrective = mongoose.model('ActionCorrective',ActionCorrectiveSchema);

function validateActionCorrective(actionCorrective){
    const schema = {
        refAction : Joi.string().required(),
        position:Joi.number().required(),
        status : Joi.string().required(),
        description : Joi.string().required(),
       // actionplan:Joi.string().required(),
        responsableAction:Joi.string().required(),
        //typeAction:Joi.string().required(),
        dateResponse: Joi.string().required(),
        cause: Joi.string().required()
    };
    return Joi.validate(actionCorrective,schema);
}
exports.ActionCorrective = ActionCorrective;
exports.validate=validateActionCorrective;

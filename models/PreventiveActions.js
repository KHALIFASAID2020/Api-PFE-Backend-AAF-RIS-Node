//TypeAction

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const PreventiveActionsSchema = new mongoose.Schema({
    refAction : {
        type: String, required: true,unique:true
    },
    status : {
        type: String, required: true
    },
    position : {
        type: Number, required: true
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
        type: Date, required: true    
    },
    responseDescription:{
        type: String, required: true   
    },photo:{
        type: String, required: true 
    },
    Document:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'DocumentStandarisation'
    }
    /* responseDescription?:string;
  photo?:string; */
},{
    timestamps : true
});
PreventiveActionsSchema.plugin(uniqueValidator);

const PreventiveActions = mongoose.model('PreventiveActions',PreventiveActionsSchema);

function validatePreventiveActions(preventiveActions){
    const schema = {
        refAction : Joi.string().required(),
        position:Joi.number().required(),
        status : Joi.string().required(),
       // actionplan:Joi.string().required(),
        responsableAction:Joi.string().required(),
        //typeAction:Joi.string().required(),
        dateResponse: Joi.date().required(),
        Document: Joi.string().required()
    };
    return Joi.validate(preventiveActions,schema);
}


exports.PreventiveActions = PreventiveActions;
exports.validate=validatePreventiveActions;

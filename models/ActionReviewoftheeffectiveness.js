//TypeAction

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const ActionReviewoftheeffectivenessSchema = new mongoose.Schema({
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
        type: Date, required: true    
    },
    responseDescription:{
        type: String, required: true   
    },
    photo:{
        type: String, required: true 
    },
    ActionCorrective:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ActionCorrective'
    }
    /* responseDescription?:string;
  photo?:string; */
},{
    timestamps : true
});
ActionReviewoftheeffectivenessSchema.plugin(uniqueValidator);

const ActionReviewoftheeffectiveness = mongoose.model('ActionReviewoftheeffectiveness',ActionReviewoftheeffectivenessSchema);

function validateActionReviewoftheeffectiveness(actionReviewoftheeffectiveness){
    const schema = {
        refAction : Joi.string().required(),
        position:Joi.number().required(),
        status : Joi.string().required(),
        description : Joi.string().required(),
       // actionplan:Joi.string().required(),
        responsableAction:Joi.string().required(),
        //typeAction:Joi.string().required(),
        dateResponse: Joi.date().required(),
        ActionCorrective: Joi.string().required()
    };
    return Joi.validate(actionReviewoftheeffectiveness,schema);
}


exports.ActionReviewoftheeffectiveness = ActionReviewoftheeffectiveness;
exports.validate=validateActionReviewoftheeffectiveness;

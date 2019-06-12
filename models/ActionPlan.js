const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const ActionPlanSchema = new mongoose.Schema({
    RefActionPlan : {
        type: String, required: true,unique:true
    },
    reclamation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reclamation'
    },
    teamLeader:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status : {
        type: String, required: true
    }
});
ActionPlanSchema.plugin(uniqueValidator);

const ActionPlan = mongoose.model('ActionPlan',ActionPlanSchema);

function validateActionPlan(actionplan){
    const schema = {
        RefActionPlan : Joi.string().required(),
        reclamation:Joi.string().required(),
        teamLeader:Joi.string().required(),
        status:Joi.string().required()
    };
    return Joi.validate(actionplan,schema);
}


exports.ActionPlan = ActionPlan;
exports.validate=validateActionPlan;
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
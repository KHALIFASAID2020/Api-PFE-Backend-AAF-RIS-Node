//TypeAction

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const ActionSchema = new mongoose.Schema({
    RefAction : {
        type: String, required: true,unique:true
    },
    Status : {
        type: String, required: true
    },
    Description : {
        type: String, required: true
    },
    ActionPlan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ActionPlan'
    },
    ResponsableAction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    TypeAction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TypeAction'
    }
});
ActionSchema.plugin(uniqueValidator);

const Action = mongoose.model('Action',ActionSchema);

function validateAction(actionplan){
    const schema = {
        RefAction : Joi.string().required(),
        Status : Joi.string().required(),
        Description : Joi.string().required(),
        ActionPlanId:Joi.string().required(),
        ResponsableActionId:Joi.string().required(),
        TypeActionId:Joi.string().required()
    };
    return Joi.validate(actionplan,schema);
}


exports.Action = Action;
exports.validate=validateAction;
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
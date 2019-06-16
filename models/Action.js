//TypeAction

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const ActionSchema = new mongoose.Schema({
    refAction : {
        type: String, required: true,unique:true
    },
    status : {
        type: String, required: true
    },
    position : {
        type: String, required: true,unique:true
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
    }
},{
    timestamps : true
});
ActionSchema.plugin(uniqueValidator);

const Action = mongoose.model('Action',ActionSchema);

function validateAction(actionplan){
    const schema = {
        refAction : Joi.string().required(),
        position:Joi.string().required(),
        status : Joi.string().required(),
        description : Joi.string().required(),
       // actionplan:Joi.string().required(),
        responsableAction:Joi.string().required(),
       // typeAction:Joi.string().required()
       dateResponse: Joi.date().required()
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
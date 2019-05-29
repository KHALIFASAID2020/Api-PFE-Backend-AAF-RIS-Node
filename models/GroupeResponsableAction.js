const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const GroupeResponsableActionSchema = new mongoose.Schema({
    RefGroupeResponsableAction : {
        type: String, required: true,unique:true
    },
    ActionPlan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ActionPlan'
    }
});
GroupeResponsableActionSchema.plugin(uniqueValidator);

const GroupeResponsableAction = mongoose.model('GroupeResponsableAction',GroupeResponsableActionSchema);

function validateGroupeResponsableAction(groupeResponsableAction){
    const schema = {
        RefGroupeResponsableAction : Joi.string().required(),
        ActionPlanId:Joi.string().required()
    };
    return Joi.validate(groupeResponsableAction,schema);
}


exports.GroupeResponsableAction = GroupeResponsableAction;
exports.validate=validateGroupeResponsableAction;
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
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const TypeActionPlanSchema = new mongoose.Schema({
    typeAction : {
        type: String, required: true,unique:true
    }
});
TypeActionPlanSchema.plugin(uniqueValidator);

const TypeActionPlan = mongoose.model('TypeActionPlan',TypeActionPlanSchema);

function validateType(typeactionplanvalidate){
    const schema = {
        typeAction : Joi.string().required()
    };
    return Joi.validate(typeactionplanvalidate,schema);
}
exports.TypeActionPlan = TypeActionPlan;
exports.validateType=validateType;
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
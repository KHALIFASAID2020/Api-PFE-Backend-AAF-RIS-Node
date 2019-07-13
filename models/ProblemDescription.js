const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const ProblemDescriptionSchema = new mongoose.Schema({
    actionplan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ActionPlan'
    },
    description:{
        type: String, required: true
    }
});
ProblemDescriptionSchema.plugin(uniqueValidator);

const ProblemDescription = mongoose.model('ProblemDescription',ProblemDescriptionSchema);

function validateActionPlan(problemDescription){
    const schema = {
        actionplan:Joi.string().required(),
        description:Joi.string().required()
    };
    return Joi.validate(problemDescription,schema);
}
exports.ProblemDescription = ProblemDescription;
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
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const ResponsableActionSchema = new mongoose.Schema({
    RefResponsableAction : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    GroupeResponsableAction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'GroupeResponsableAction'
    }
});
ResponsableActionSchema.plugin(uniqueValidator);

const ResponsableAction = mongoose.model('ResponsableAction',ResponsableActionSchema);

function validateResponsableAction(responsableAction){
    const schema = {
        RefResponsableActionId : Joi.string().required(),
        GroupeResponsableActionId:Joi.string().required()
    };
    return Joi.validate(responsableAction,schema);
}


exports.ResponsableAction = ResponsableAction;
exports.validate=validateResponsableAction;
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
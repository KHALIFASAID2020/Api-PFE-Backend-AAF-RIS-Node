const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');


const userSchema = new mongoose.Schema({
    email : {
        type: String, required: true,unique:true
    },
    password:{
        type : String,
        required:true,
    },
    lastname:{
        type : String,
        required:true,
    },
    
    firstname:{
        type : String,
        required:true,
    },
    poste:{
        type : String,
        required:true,
    },
    phone:{
        type : String,
        required:true,
    },
    role:{
        type : String,
        required:true,
    },
    company: { 
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
      }

},{
    timestamps : true
});
userSchema.plugin(uniqueValidator);

const User = mongoose.model('User',userSchema);

function validateUser(user){
    const schema = {
        email:Joi.string().required(),
        password:Joi.string().required(),
        lastname:Joi.string().required(),
        firstname:Joi.string().required(),
        poste:Joi.string().required(),
        role:Joi.string().required(),
        phone:Joi.string().required(),
        companyId: Joi.string().required(),
    };
    return Joi.validate(user,schema);
}

exports.User = User;
exports.validate=validateUser;
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
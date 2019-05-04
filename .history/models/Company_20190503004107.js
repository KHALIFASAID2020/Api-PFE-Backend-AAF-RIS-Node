const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Joi =require('joi');

const Company = mongoose.model('Company',new mongoose.Schema({
    companyName : {
        type : String,
        required:true,
        minlength:2,
        maxlength:50,
    },
    companyAddress:{
        type : String,
        required:true,
    },
    compnayPhone:{
        type: String
    },
    companyFax:{
        type:String
    },
    companyWebsite:{
        type:String
    },
    companyInfo:{
        type:String
    },
    companyCoutry:{
        typ:String
    }

}))

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
module.exports = User;
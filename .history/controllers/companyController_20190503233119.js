const {Company,validate} = require('../models/Company');


const getAllCompany=(req,res,next)=>{
Company.find().sort('companyName').then(company=>{
if(company){
    res.status(200).json(company);
}else{
    res.status(404).json({ message: "Post not found!" });
}
});
res.send(company);
}


const createComapny=  (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

let company = new Company({
    companyName : req.body.companyName,
    companyAddress:req.body.companyAddress,
    compnayPhone:req.body.compnayPhone,
    companyFax:req.body.companyFax,
    companyWebsite:req.body.companyWebsite,
    companyInfo:req.body.companyInfo,
    companyCountry:req.body.companyCountry
});
company.save().then(result=>{
    res.status(201).json({
        message : 'Company Created',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Company Exist',
        error: err
    });
});
}


module.exports = {createComapny,getAllCompany}
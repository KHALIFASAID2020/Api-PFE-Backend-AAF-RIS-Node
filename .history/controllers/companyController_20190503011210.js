const {Company,validate} = require('../models/Company');

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
    companyCoutry:req.body.companyCoutry,
});
company =await  company.save();
res.send(company);
}

module.exports = {createComapny}
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
    companyCountry:req.body.companyCountry,
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

/* const createUser = (req,res,next)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const user = new User({
            password: hash,
            email : req.body.email,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            company: req.body.company,
            poste:req.body.poste,
            role: req.body.role
        });
        user.save().then(result=>{
            res.status(201).json({
                message : 'User Created',
                result: result
            });
        }).catch(err=>{
            res.status(500).json({
                message : 'User Exist',
                error: err
            });
        });
    });
} */


module.exports = {createComapny}
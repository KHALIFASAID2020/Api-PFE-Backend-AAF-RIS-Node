const {Company,validate} = require('../models/Company');
const {Typecompany} = require('../models/Typecompany');


const getAllCompanyClient=(req,res,next)=>{


    //sort('companyName'). 5cd618fab9462327c832d57c
Company.find({companyType:{_id:'5cd61900b9462327c832d57d'}}).populate('companyType').sort('companyName').then(company=>{
if(company){
    res.status(200).json(company);
}else{
    res.status(404).json({ message: "Post not found!" });
}
});
//res.send(company);
}


const getAllCompany=(req,res,next)=>{
    //sort('companyName'). 5cd618fab9462327c832d57c
    
Company.find().sort('companyName').then(company=>{
if(company){
    res.status(200).json(company);
}else{
    res.status(404).json({ message: "Post not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020 


const getByIdCompanyType =(req,res,next)=>{
    Company.find({companyType : req.params.id}).then(resultcompanyType=>{
        if(resultcompanyType){
            res.status(200).json(resultcompanyType);
    
        }else{
            res.status(404).json({ message: "Produit not found!" });
        }
    });
    }




const getById = (req,res,next)=>{
Company.findById(req.params.id).then(company=>{
    if(company){
        res.status(200).json(company);

    }else{
        res.status(404).json({ message: "Post not found!" });
    }
});
}





const deleteCompany =(req,res,next)=>{
    Company.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}



const createComapny=  async(req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

const typecompany = await Typecompany.findById(req.body.companyTypeId);
    if (!typecompany) return res.status(400).send('Invalid type comapny.');
//const type = Type.findById(req.body.typeId);
  //  if (!type) return res.status(400).send('Invalid Type.');

let company = new Company({
    companyName : req.body.companyName,
    companyAddress:req.body.companyAddress,
    compnayPhone:req.body.compnayPhone,
    companyFax:req.body.companyFax,
    companyWebsite:req.body.companyWebsite,
    companyInfo:req.body.companyInfo,
    companyCountry:req.body.companyCountry,
    companyType:typecompany._id
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

const updateCompany = (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

const company = Company.findByIdAndUpdate(req.params.id,{
    companyName : req.body.companyName,
    companyAddress:req.body.companyAddress,
    compnayPhone:req.body.compnayPhone,
    companyFax:req.body.companyFax,
    companyWebsite:req.body.companyWebsite,
    companyInfo:req.body.companyInfo,
    companyCountry:req.body.companyCountry
},{new:true}).then(result => {
    res.status(201).json({
        message : 'Company Updated',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Error Update',
        error: err
    });  
});


}


module.exports = {createComapny,getAllCompany,getById,deleteCompany,updateCompany,getByIdCompanyType,getAllCompanyClient}
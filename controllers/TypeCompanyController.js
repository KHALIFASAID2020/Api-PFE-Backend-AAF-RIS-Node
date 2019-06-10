const {Typecompany,validate} = require('../models/Typecompany');



const getAllTypeCompany=(req,res,next)=>{
    //sort('companyName').
Typecompany.find().sort('type_company').then(typecompany=>{
if(typecompany){
    res.status(200).json(typecompany);
}else{
    res.status(404).json({ message: "type company not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020

const getById = (req,res,next)=>{
Typecompany.findById(req.params.id).then(type=>{
    if(type){
        res.status(200).json(type);

    }else{
        res.status(404).json({ message: "Type Company not found!" });
    }
});
}



const deleteTypeCompany =(req,res,next)=>{
    Typecompany.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}
 
const createTypeComapny=  (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

//const type = Type.findById(req.body.typeId);
  //  if (!type) return res.status(400).send('Invalid Type.');

let typecompany = new Typecompany({
    type_company : req.body.type_company,
});
typecompany.save().then(result=>{
    res.status(201).json({
        message : 'Company Type Created',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Company Type Exist',
        error: err
    });
});
}

const updateType= (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

const typeCompany = Typecompany.findByIdAndUpdate(req.params.id,{
    type_company : req.body.type_company
},{new:true}).then(result => {
    res.status(201).json({
        message : 'Company Type Updated',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Error Update',
        error: err
    });  
});


}
 

module.exports = {createTypeComapny,getAllTypeCompany,getById,updateType,deleteTypeCompany}
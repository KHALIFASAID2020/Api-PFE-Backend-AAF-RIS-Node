const {ResponsableAction,validate} = require('../models/Produit');
const {User} = require('../models/User');
const {GroupeResponsableAction} = require('../models/GroupeResponsableAction');
const getAllResponsableAction=(req,res,next)=>{
    //sort('companyName').
ResponsableAction.find().sort('RefProduit').then(produit=>{
if(produit){
    res.status(200).json(produit);
}else{
    res.status(404).json({ message: "Produit not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020

const getById = (req,res,next)=>{
Produit.findById(req.params.id).then(produit=>{
    if(produit){
        res.status(200).json(produit);

    }else{
        res.status(404).json({ message: "produit not found!" });
    }
});
}


const deleteResponsableAction =(req,res,next)=>{
    Produit.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}

const createResponsableAction= async (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);



const company = await Company.findById(req.body.companyId);
    if (!company) return res.status(400).send('Invalid comapny.');
  


let produit = new Produit({
    RefProduit : req.body.RefProduit,
    DesignationProduit:req.body.DesignationProduit,
    company:company._id
});
produit.save().then(result=>{
    res.status(201).json({
        message : 'Produit Created',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Produit Exist',
        error: err
    });
});
}

const updateResponsableAction = (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

const produit = Produit.findByIdAndUpdate(req.params.id,{
   RefProduit : req.body.RefProduit,
    DesignationProduit:req.body.DesignationProduit,
    company:req.body.companyId
},{new:true}).then(result => {
    res.status(201).json({
        message : 'Produit Updated',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Error Update',
        error: err
    });  
});


}






module.exports = {getAllProduit,updateProduit,createProduit,deleteProduit,getById}
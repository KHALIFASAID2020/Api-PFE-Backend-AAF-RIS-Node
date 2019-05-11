const {Reclamation,validate} = require('../models/Reclamation');


const getAllReclamation=(req,res,next)=>{
    //sort('companyName').
Produit.find().sort('refReclamation').then(produit=>{
if(produit){
    res.status(200).json(produit);
}else{
    res.status(404).json({ message: "Reclamation not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020

const getById = (req,res,next)=>{
    Reclamation.findById(req.params.id).then(reclamation=>{
    if(reclamation){
        res.status(200).json(reclamation);

    }else{
        res.status(404).json({ message: "Reclamation not found!" });
    }
});
}


const deleteReclamation =(req,res,next)=>{
    Reclamation.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}

const createReclamation=  (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

let reclamation = new Reclamation({
    refReclamation : req.body.refReclamation,
    produit:req.body.produitId
});
reclamation.save().then(result=>{
    res.status(201).json({
        message : 'Reclamation Created',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Reclamation Exist',
        error: err
    });
});
}

const updateReclamation = (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

const reclamation = Reclamation.findByIdAndUpdate(req.params.id,{
    refReclamation : req.body.refReclamation,
    produit:req.body.produitId
},{new:true}).then(result => {
    res.status(201).json({
        message : 'Reclamation Updated',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Reclamation Update',
        error: err
    });  
});


}






module.exports = {getAllReclamation,updateReclamation,createReclamation,deleteReclamation,getAllReclamation,getById}
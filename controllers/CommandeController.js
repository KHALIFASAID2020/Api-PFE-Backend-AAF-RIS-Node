const {CommandeProduct,validate} = require('../models/Commande');
const {Produit} = require('../models/Produit');
const {Company} = require('../models/Company');


const getByIdCompanyProduit=(req,res,next)=>{

    CommandeProduct.find({company:{_id:req.params.id}}).populate('company produit').then(commandeResult=>{
        if(commandeResult){
            res.status(200).json(commandeResult);
    
        }else{
            res.status(404).json({ message: "Produit not found!" });
        }
    });
}

/* 

const getByIdCompanyProduitAdregate=(req,res,next)=>{

    CommandeProduct.aggregate({company:{_id:req.params.id},same_qty : {$sum : 1}}).populate('company produit').then(commandeResult=>{
        if(commandeResult){
            res.status(200).json(commandeResult);
    
        }else{
            res.status(404).json({ message: "Produit not found!" });
        }
    });
} */







const getAllCommande=(req,res,next)=>{
    //sort('companyName').
    CommandeProduct.find().populate('company produit').sort('dateDelivery').then(commandeResult=>{
if(commandeResult){
    res.status(200).json(commandeResult);
}else{
    res.status(404).json({ message: "Commande not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020

const getByIdCommande = (req,res,next)=>{
    CommandeProduct.findById(req.params.id).then(commandeResult=>{
    if(commandeResult){
        res.status(200).json(commandeResult);

    }else{
        res.status(404).json({ message: "Produit not found!" });
    }
});
}



const deleteCommande =(req,res,next)=>{
    CommandeProduct.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}

const createCommande=  async(req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

const produit = await Produit.findById(req.body.produitId);
    if (!produit) return res.status(400).send('Invalid produit.');
    const company = await Company.findById(req.body.companyId);
    if (!company) return res.status(400).send('Invalid Company.');

let commande = new CommandeProduct({
    produit : produit._id,
    dateDelivery:req.body.dateDelivery,
    company:company._id,
    quantity:req.body.quantity
});
commande.save().then(result=>{
    res.status(201).json({
        message : 'Commande Created',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'commande Exist',
        error: err
    });
});
}


const updateCommande = async(req,res,next)=>{
    const { error }= validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const produit = await Produit.findById(req.body.produitId);
        if (!produit) return res.status(400).send('Invalid produit.');
        const company = await Company.findById(req.body.companyId);
        if (!company) return res.status(400).send('Invalid Company.');

const commande = CommandeProduct.findByIdAndUpdate(req.params.id,{
    produit : produit._id,
    dateDelivery:req.body.dateDelivery,
    company:company._id,
    quantity:req.body.quantity
},{new:true}).then(result => {
    res.status(201).json({
        message : 'Commande Updated',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Error Update',
        error: err
    });  
});
}


module.exports = {updateCommande,createCommande,deleteCommande,getByIdCommande,getAllCommande,getByIdCompanyProduit}
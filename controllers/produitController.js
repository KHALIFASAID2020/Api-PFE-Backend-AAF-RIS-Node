const {Produit,validate} = require('../models/Produit');
//const {Company} = require('../models/Company');

const getAllProduit=(req,res,next)=>{
    //sort('companyName').
Produit.find().sort('RefProduit').then(produit=>{
if(produit){
    res.status(200).json(produit);
}else{
    res.status(404).json({ message: "Produit not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020

const getProduitByType=(req,res,next)=>{
    Produit.find({typeProduit:"PF"}).sort('RefProduit').then(produit=>{
        if(produit){
            res.status(200).json(produit);
        }else{
            res.status(404).json({ message: "Produit not found!" });
        }
        });
}




const getById = (req,res,next)=>{
Produit.findById(req.params.id).then(produit=>{
    if(produit){
        res.status(200).json(produit);

    }else{
        res.status(404).json({ message: "produit not found!" });
    }
});
}


const getByIdCompanyProduit =(req,res,next)=>{
    Produit.find({company : req.params.id}).select('_id RefProduit').then(produit=>{
        if(produit){
            res.status(200).json(produit);
    
        }else{
            res.status(404).json({ message: "Produit not found!" });
        }
    });
    }


const deleteProduit =(req,res,next)=>{
    Produit.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}

const createProduit= async (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);




let produit = new Produit({
    RefProduit : req.body.RefProduit,
    DesignationProduit:req.body.DesignationProduit,
    typeProduit:req.body.typeProduit
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

const updateProduit = (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

const produit = Produit.findByIdAndUpdate(req.params.id,{
   RefProduit : req.body.RefProduit,
    DesignationProduit:req.body.DesignationProduit,
    typeProduit:req.body.typeProduit
    
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

module.exports = {getAllProduit,updateProduit,createProduit,deleteProduit,getById,getByIdCompanyProduit,getProduitByType}
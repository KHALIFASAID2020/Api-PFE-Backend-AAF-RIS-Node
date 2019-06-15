const {Reclamation,validate} = require('../models/Reclamation');
const {Produit} = require('../models/Produit');
const {Typecompany} = require('../models/Typecompany');
const {Defaut} = require('../models/Defaut');
const {Company} = require('../models/Company');
const {User}= require('../models/User');



const getAllReclamation=(req,res,next)=>{
    //sort('companyName').
Reclamation.find().populate('typecompany produit defaut company creator destination destinationencopy').sort({createdAt :'desc'}).then(reclamation=>{
if(reclamation){
    res.status(200).json(reclamation);
   
}else{
    res.status(404).json({ message: "Reclamation not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020



const getAllReclamationByDestination=(req,res,next)=>{
    //sort('companyName').
Reclamation.find(({destination:{_id:req.params.id}})).populate('typecompany produit defaut company creator destination destinationencopy').sort({createdAt :'desc'}).then(reclamation=>{
if(reclamation){
    res.status(200).json(reclamation);
}else{
    res.status(404).json({ message: "Reclamation not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020


//gettReclamationDetails



const getAllReclamationByCreator=(req,res,next)=>{
    //sort('companyName').
Reclamation.find(({creator:{_id:req.params.id}})).populate('typecompany produit defaut company creator destination destinationencopy').sort({createdAt :'desc'}).then(reclamation=>{
if(reclamation){
    res.status(200).json(reclamation);
}else{
    res.status(404).json({ message: "Reclamation not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020

const getById = (req,res,next)=>{
    Reclamation.findById(req.params.id).populate('typecompany produit defaut company creator destination destinationencopy').then(reclamation=>{
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

const createReclamation=async  (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);
    const typecompany = await Typecompany.findById(req.body.typecompany);
    if (!typecompany) return res.status(400).send('Invalid Type.');
 
    const produit = await Produit.findById(req.body.produit);
    if (!produit) return res.status(400).send('Invalid Produit.');

    const defaut = await Defaut.findById(req.body.defaut);
    if (!defaut) return res.status(400).send('Invalid Defaut.'); 
    

    const company = await Company.findById(req.body.company);
    if (!company) return res.status(400).send('Invalid Company.'); 

    const creator = await User.findById(req.body.creator);
    if (!creator) return res.status(400).send('Invalid User.'); 
    
    /* const destination = await User.findById(req.body.destination);
    if (!destination) return res.status(400).send('Invalid User destination.'); 
    

    const destinationencopy = await User.findById(req.body.destinationencopy);
    if (!destinationencopy) return res.status(400).send('Invalid User destination.'); 
     */

    //companyId
//destinationId
let reclamation = new Reclamation({
    refReclamation : req.body.refReclamation,
    typecompany:typecompany._id,
    produit:produit._id,
    quantity:req.body.quantity,
    description:req.body.description,
    daterep:req.body.daterep,
    datelimit:req.body.datelimit,
    defaut:defaut._id,
     company:company._id,
        creator:creator._id,
        destination:req.body.destination,
        destinationencopy:req.body.destinationencopy

        

        /* company: "5cdf2d735f147c0a848eafab"
dateOfDeadline: "2019-06-07"
dateOfResponse: "2019-06-07"
defautcomplaint: "5cf95037de714a1de059d28f"
defautquantity: 20
descriptioncomplaint: "20"
destinationcomplaint: (2) ["5ceaa783fc21e4120c86cbbf", "5cf94cc7de714a1de059d28e"]
product: "5cf8a2911ca3750ba890efa4"
typecomplaint: "5cd618fab9462327c832d57c" */
    
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

const updateReclamation =async (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

const typecompany = await Typecompany.findById(req.body.typecompanyId);
if (!typecompany) return res.status(400).send('Invalid Type.');

const produit = await Produit.findById(req.body.produitId);
if (!produit) return res.status(400).send('Invalid Produit.');

const defaut = await Defaut.findById(req.body.defautId);
if (!defaut) return res.status(400).send('Invalid Defaut.'); 


const company = await Company.findById(req.body.companyId);
if (!company) return res.status(400).send('Invalid Company.'); 

const creator = await User.findById(req.body.creatorId);
if (!creator) return res.status(400).send('Invalid User.'); 

/* const destination = await User.findById(req.body.destinationId);
if (!destination) return res.status(400).send('Invalid User destination.'); 
 */
const reclamation = Reclamation.findByIdAndUpdate(req.params.id,{
    refReclamation : req.body.refReclamation,
    typecompany:typecompany._id,
    produit:produit._id,
    quantity:req.body.quantity,
    description:req.body.description,
    daterep:req.body.daterep,
    datelimit:req.body.datelimit,
    defaut:defaut._id,
     company:company._id,
        creator:creator._id,
        destination:req.body.destinationId,
        destinationencopy:req.body.destinationencopy
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






module.exports = {getAllReclamation,updateReclamation,createReclamation,deleteReclamation,getAllReclamationByDestination,getAllReclamationByCreator,getAllReclamation,getById}
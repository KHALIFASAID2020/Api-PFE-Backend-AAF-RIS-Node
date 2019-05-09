const {Defaut,validate} = require('../models/Defaut');


const getAllDefaut=(req,res,next)=>{
    //sort('companyName').
Defaut.find().sort('codeDefaut').then(defaut=>{
if(defaut){
    res.status(200).json(defaut);
}else{
    res.status(404).json({ message: "fault not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020

const getById = (req,res,next)=>{
Defaut.findById(req.params.id).then(defaut=>{
    if(defaut){
        res.status(200).json(defaut);

    }else{
        res.status(404).json({ message: "Default not found!" });
    }
});
}


const deleteDefaut =(req,res,next)=>{
    Defaut.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}

const createDefaut=  (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

let defaut = new Defaut({
    codeDefaut : req.body.codeDefaut,
    DesignationDefautFr:req.body.DesignationDefautFr,
    DesignationDefautDe:req.body.DesignationDefautDe,
    DesignationDefautEn:req.body.DesignationDefautEn
});
defaut.save().then(result=>{
    res.status(201).json({
        message : 'Fault Created',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Fault Exist',
        error: err
    });
});
}

const updateDefaut = (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

const defaut = Defaut.findByIdAndUpdate(req.params.id,{
    codeDefaut : req.body.codeDefaut,
    DesignationDefautFr:req.body.DesignationDefautFr,
    DesignationDefautDe:req.body.DesignationDefautDe,
    DesignationDefautEn:req.body.DesignationDefautEn
},{new:true}).then(result => {
    res.status(201).json({
        message : 'Defaut Updated',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Error Update',
        error: err
    });  
});


}






module.exports = {updateDefaut,createDefaut,deleteDefaut,getById,getAllDefaut}
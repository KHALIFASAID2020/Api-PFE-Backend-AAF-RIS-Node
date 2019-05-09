const {Type,validate} = require('../models/TypeCompany');


const getAllType=(req,res,next)=>{
    //sort('companyName').
Type.find().sort('TypeCompany').then(type=>{
if(type){
    res.status(200).json(type);
}else{
    res.status(404).json({ message: "Type not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020

const getById = (req,res,next)=>{
Type.findById(req.params.id).then(type=>{
    if(type){
        res.status(200).json(type);
    }else{
        res.status(404).json({ message: "Type not found!" });
    }
});
}


const deleteType =(req,res,next)=>{
    Type.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}

const createType=  (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

let type = new Type({
    TypeCompany :req.body.TypeCompany
});
type.save().then(result=>{
    res.status(201).json({
        message : 'Type Created',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'type Exist',
        error: err
    });
});
}

const updateType= (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

const type = Type.findByIdAndUpdate(req.params.id,{
    TypeCompany :req.body.TypeCompany
},{new:true}).then(result => {
    res.status(201).json({
        message : 'Type Updated',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Error Update',
        error: err
    });  
});


}






module.exports = {getAllType,updateType,createType,deleteType,getById}
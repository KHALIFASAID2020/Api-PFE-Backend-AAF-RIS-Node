const {TypeAction,validate} = require('../models/TypeAction');



const getAllTypeAction=(req,res,next)=>{
    //sort('companyName').
    TypeAction.find().sort('TypeAction').then(typeaction=>{
if(typeaction){
    res.status(200).json(typeaction);
}else{
    res.status(404).json({ message: "type Action not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020

const getById = (req,res,next)=>{
    TypeAction.findById(req.params.id).then(type=>{
    if(type){
        res.status(200).json(type);

    }else{
        res.status(404).json({ message: "Type Action not found!" });
    }
});
}


const deleteTypeAction =(req,res,next)=>{
    TypeAction.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}
 
const createTypeAction=  (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

//const type = Type.findById(req.body.typeId);
  //  if (!type) return res.status(400).send('Invalid Type.');

let typeAction = new TypeAction({
    TypeAction : req.body.TypeAction,
});
typeAction.save().then(result=>{
    res.status(201).json({
        message : 'Action Type Created',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Action Type Type Exist',
        error: err
    });
});
}

const updateTypeAction= (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

const typeaction = TypeAction.findByIdAndUpdate(req.params.id,{
    TypeAction : req.body.TypeAction
},{new:true}).then(result => {
    res.status(201).json({
        message : 'Action Type Updated',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Error Update',
        error: err
    });  
});


}
 

module.exports = {updateTypeAction,createTypeAction,deleteTypeAction,getAllTypeAction,getById}
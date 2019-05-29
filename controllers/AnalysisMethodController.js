const {AnalysisMethod,validate} = require('../models/AnalysisMethod');



const getAllMethodAction=(req,res,next)=>{
    //sort('companyName').
    AnalysisMethod.find().sort('AnalysisMethodName').then(Method=>{
if(Method){
    res.status(200).json(Method);
}else{
    res.status(404).json({ message: "Method not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020
//AnalysisMethodName
const getById = (req,res,next)=>{
    AnalysisMethod.findById(req.params.id).then(type=>{
    if(type){
        res.status(200).json(type);

    }else{
        res.status(404).json({ message: "Method not found!" });
    }
});
}


const deleteAnalysisMethod =(req,res,next)=>{
    AnalysisMethod.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}
 
const createAnalysisMethod=  (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

//const type = Type.findById(req.body.typeId);
  //  if (!type) return res.status(400).send('Invalid Type.');

let actionMethod = new AnalysisMethod({
    AnalysisMethodName : req.body.AnalysisMethodName
});
actionMethod.save().then(result=>{
    res.status(201).json({
        message : 'Analysis Method Created',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Analysis Method  Type Exist',
        error: err
    });
});
}

const updateAnalysisMethod= (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

const actionMethod = AnalysisMethod.findByIdAndUpdate(req.params.id,{
    AnalysisMethodName : req.body.AnalysisMethodName
},{new:true}).then(result => {
    res.status(201).json({
        message : 'Analysis Method Updated',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Error Update',
        error: err
    });  
});


}
 

module.exports = {updateAnalysisMethod,createAnalysisMethod,deleteAnalysisMethod,getAllMethodAction,getById}
const {ProblemDescription,validate} = require('../models/ProblemDescription');
const {ActionPlan} = require('../models/ActionPlan');



const getAllProblemDescription=(req,res,next)=>{
    
    ProblemDescription.find().sort('RefDescriptionProblem').then(Method=>{
if(Method){
    res.status(200).json(Method);
}else{
    res.status(404).json({ message: "Description not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020
//AnalysisMethodName
const getByIdProblemDescription = (req,res,next)=>{
    ProblemDescription.findById(req.params.id).then(descriptionProblem=>{
    if(descriptionProblem){
        res.status(200).json(descriptionProblem);

    }else{
        res.status(404).json({ message: "Description not found!" });
    }
});
}


const deleteProblemDescription =(req,res,next)=>{
    ProblemDescription.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted Problem Description Successful !'});

}else{
    res.status(404).json({ message: "Error deleted !" });

}
    })
}
 
const createProblemDescription= async (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);


const actionplan = await ActionPlan.findById(req.body.actionplan);
    if (!actionplan) return res.status(400).send('Invalid Action Plan.');
    //res.send(actionplan._id);

let problemDescription = new ProblemDescription({
    RefDescriptionProblem :req.body.RefDescriptionProblem,
    actionplan:actionplan._id,
    description:req.body.description
});
problemDescription.save().then(result=>{
    res.status(201).json({
        message : 'Description Created',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Description  Exist',
        error: err
    });
}); 
}

const updateProblemDescription= async (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);


const actionplan = await ActionPlan.findById(req.body.actionplan);
    if (!actionplan) return res.status(400).send('Invalid Action Plan.');


const description = ProblemDescription.findByIdAndUpdate(req.params.id,{
    RefDescriptionProblem :req.body.RefDescriptionProblem,
    actionplan:actionplan._id,
    description:req.body.description
},{new:true}).then(result => {
    res.status(201).json({
        message : 'Description Updated',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Error Update',
        error: err
    });  
});


}
 

module.exports = {updateProblemDescription,createProblemDescription,deleteProblemDescription,getAllProblemDescription,getByIdProblemDescription}
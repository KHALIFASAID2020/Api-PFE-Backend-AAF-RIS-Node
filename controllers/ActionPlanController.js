const {ActionPlan,validate} =require('../models/ActionPlan');
const {Reclamation} = require('../models/Reclamation');
const {User}= require('../models/User');



const getAllActionPlan=(req,res,next)=>{
    //sort('companyName').
    ActionPlan.find().sort('RefActionPlan').then(actionplan=>{
if(actionplan){
    res.status(200).json(actionplan);
}else{
    res.status(404).json({ message: "Action Plan not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020

const getById = (req,res,next)=>{
    ActionPlan.findById(req.params.id).populate('Reclamation').then(actionplan=>{
    if(actionplan){
        res.status(200).json(actionplan);

    }else{
        res.status(404).json({ message: "Action Plan not found!" });
    }
});
}


const deleteActionPlan =(req,res,next)=>{
    ActionPlan.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}

const createActionPlan=async  (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);
    
 
const reclamation = await Reclamation.findById(req.body.reclamationId);
if (!reclamation) return res.status(400).send('Invalid Reclamation.');

const teamLeader = await User.findById(req.body.teamLeaderId);
if (!teamLeader) return res.status(400).send('Invalid TeamLeader.');


    //companyId
//destinationId
let actionplan = new ActionPlan({
    RefActionPlan : req.body.RefActionPlan,
    reclamation:reclamation._id,
    teamLeader:teamLeader._id
    
});
actionplan.save().then(result=>{
    res.status(201).json({
        message : 'Action Plan Created',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Action Plan Exist',
        error: err
    });
});
}

const updateActionPlan =async (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

 
const reclamation = await Reclamation.findById(req.body.reclamationId);
if (!reclamation) return res.status(400).send('Invalid Reclamation.');

const teamLeader = await User.findById(req.body.teamLeaderId);
if (!teamLeader) return res.status(400).send('Invalid TeamLeader.');

const actionplan = ActionPlan.findByIdAndUpdate(req.params.id,{
    
    RefActionPlan : req.body.RefActionPlan,
    reclamation:reclamation._id,
    teamLeader:teamLeader._id

},{new:true}).then(result => {
    res.status(201).json({
        message : 'Action Plan Updated',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Action Plan Update',
        error: err
    });  
});
}






module.exports = {createActionPlan,updateActionPlan,deleteActionPlan,getAllActionPlan,getById}
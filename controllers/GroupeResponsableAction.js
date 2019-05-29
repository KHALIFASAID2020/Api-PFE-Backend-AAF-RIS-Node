const {GroupeResponsableAction,validate} = require('../models/GroupeResponsableAction');
const {ActionPlan} = require('../models/ActionPlan');



const getAllGroupeResponsableAction=(req,res,next)=>{
    
    GroupeResponsableAction.find().sort('RefGroupeResponsableAction').then(Method=>{
if(Method){
    res.status(200).json(Method);
}else{
    res.status(404).json({ message: "Group not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020
//AnalysisMethodName
const getById = (req,res,next)=>{
    GroupeResponsableAction.findById(req.params.id).then(groupe=>{
    if(groupe){
        res.status(200).json(groupe);

    }else{
        res.status(404).json({ message: "Group not found!" });
    }
});
}


const deleteGroupeResponsableAction =(req,res,next)=>{
    GroupeResponsableAction.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted group Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}
 
const createGroupeResponsableAction= async (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);


const actionplan = await ActionPlan.findById(req.body.ActionPlanId);
    if (!actionplan) return res.status(400).send('Invalid Action Plan.');

let grouperesponsable = new GroupeResponsableAction({
    RefGroupeResponsableAction :req.body.RefGroupeResponsableAction,
    actionplan:actionplan._id
});
grouperesponsable.save().then(result=>{
    res.status(201).json({
        message : 'Group Created',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Group  Exist',
        error: err
    });
});
}

const updateGroupeResponsableAction= async (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);


const actionplan = await ActionPlan.findById(req.body.ActionPlanId);
    if (!actionplan) return res.status(400).send('Invalid Action Plan.');


const grouperesponsable = GroupeResponsableAction.findByIdAndUpdate(req.params.id,{
    RefGroupeResponsableAction :req.body.RefGroupeResponsableAction,
    actionplan:actionplan._id
},{new:true}).then(result => {
    res.status(201).json({
        message : 'Group Updated',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Error Update',
        error: err
    });  
});


}
 

module.exports = {getAllGroupeResponsableAction,deleteGroupeResponsableAction,createGroupeResponsableAction,updateGroupeResponsableAction,getById}
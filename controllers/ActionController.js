const {Action,validate} =require('../models/Action');
/* 
ActionPlanId:Joi.string().required(),
ResponsableActionId:Joi.string().required(),
TypeActionId:Joi.string().required() */
const {ActionPlan} = require('../models/ActionPlan');
const {TypeAction} = require('../models/TypeAction');
const {User}= require('../models/User');



const getAllAction=(req,res,next)=>{
    //sort('companyName').
    Action.find().sort('RefAction').then(action=>{
if(action){
    res.status(200).json(action);
}else{
    res.status(404).json({ message: "Action  not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020

const getById = (req,res,next)=>{
    Action.findById(req.params.id).then(action=>{
    if(action){
        res.status(200).json(actionplan);

    }else{
        res.status(404).json({ message: "Action Plan not found!" });
    }
});
}


const deleteAction =(req,res,next)=>{
    Action.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted Action Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}

const createAction=async  (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);
    
 /* 
ActionPlanId:Joi.string().required(),
ResponsableActionId:Joi.string().required(),
TypeActionId:Joi.string().required() */
 
const actionplan = await ActionPlan.findById(req.body.ActionPlanId);
if (!actionplan) return res.status(400).send('Invalid Action Plan.');

const responsableAction = await User.findById(req.body.ResponsableActionId);
if (!responsableAction) return res.status(400).send('Invalid Responsable Action.');

const typeAction = await TypeAction.findById(req.body.TypeActionId);
if (!typeAction) return res.status(400).send('Invalid Type Action.');


    //companyId
//destinationId


let action = new Action({
    RefAction :req.body.RefAction,
    Status : req.body.Status,
    Description : req.body.Description,
    ActionPlanId:actionplan._id,
    ResponsableActionId:responsableAction._id,
    TypeActionId:typeAction._id

    
});
action.save().then(result=>{
    res.status(201).json({
        message : 'Action  Created',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Action  Exist',
        error: err
    });
});
}

const updateAction =async (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

  
const actionplan = await ActionPlan.findById(req.body.ActionPlanId);
if (!actionplan) return res.status(400).send('Invalid Action Plan.');

const responsableAction = await User.findById(req.body.ResponsableActionId);
if (!responsableAction) return res.status(400).send('Invalid Responsable Action.');

const typeAction = await TypeAction.findById(req.body.TypeActionId);
if (!typeAction) return res.status(400).send('Invalid Type Action.');

const action = Action.findByIdAndUpdate(req.params.id,{
    
    RefAction :req.body.RefAction,
    Status : req.body.Status,
    Description : req.body.Description,
    ActionPlanId:actionplan._id,
    ResponsableActionId:responsableAction._id,
    TypeActionId:typeAction._id

},{new:true}).then(result => {
    res.status(201).json({
        message : 'Action  Updated',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Action  Update',
        error: err
    });  
});


}






module.exports = {getAllAction,deleteAction,deleteAction,createAction,updateAction,getById}
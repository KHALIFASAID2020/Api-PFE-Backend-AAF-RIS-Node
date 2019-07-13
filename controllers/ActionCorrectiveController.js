const {ActionCorrective,validate} =require('../models/ActionCorrective');


const {ActionPlan} = require('../models/ActionPlan');
const {TypeActionPlan} = require('../models/TypeActionPlan');
const {User}= require('../models/User');
const {Cause}= require('../models/Cause');


const getAllActionCorrective=(req,res,next)=>{
    //sort('companyName').
    ActionCorrective.find().sort('position').then(actionCorrective=>{
if(actionCorrective){
    res.status(200).json(actionCorrective);
}else{
    res.status(404).json({ message: "Action  not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020

const getById = (req,res,next)=>{
    ActionCorrective.findById(req.params.id).populate('actionplan responsableAction').then(action=>{
    if(action){
        res.status(200).json(action);

    }else{
        res.status(404).json({ message: "Action  not found!" });
    }
});
}


const getActionsCorrectiveByPlanId =async (req,res,next)=>{


   
    const actionplan = await ActionPlan.findById(req.query.idPlan);
if (!actionplan) return res.status(400).send('Invalid Action Plan.');




const typeAction = await TypeActionPlan.findOne({typeAction:req.query.ActionType});
if (!typeAction) return res.status(400).send('Invalid Type Action.');



ActionCorrective.find({typeAction:{_id:typeAction._id},actionplan:{_id:actionplan._id}}).populate('actionplan typeAction responsableAction cause').sort('position').then(action=>{
    if(action){
        res.status(200).json(action);

    }else{
        res.status(404).json({ message: "Actions not found!" });
    }
});
}



/* 


const getActions =async (req,res,next)=>{


   
    const actionplan = await ActionPlan.findById(req.query.idPlan);
if (!actionplan) return res.status(400).send('Invalid Action Plan.');




const typeAction = await TypeActionPlan.findOne({typeAction:req.query.ActionType});
if (!typeAction) return res.status(400).send('Invalid Type Action.');



ActionCorrective.find({typeAction:{_id:typeAction._id},actionplan:{_id:actionplan._id}}).populate('actionplan typeAction responsableAction').sort('position').then(action=>{
    if(action){
        res.status(200).json(action);

    }else{
        res.status(404).json({ message: "Actions not found!" });
    }
});
}

 */
const deleteActionCorrective =(req,res,next)=>{
    ActionCorrective.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted Action Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}

const createActionCorrective=async  (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);
  
 /* 
ActionPlanId:Joi.string().required(),
ResponsableActionId:Joi.string().required(),
TypeActionId:Joi.string().required() */
 
const actionplan = await ActionPlan.findById(req.query.idPlan);
if (!actionplan) return res.status(400).send('Invalid Action Plan.');

const typeAction = await TypeActionPlan.findOne({typeAction:req.query.ActionType});
if (!typeAction) return res.status(400).send('Invalid Type Action.');

const responsableAction = await User.findById(req.body.responsableAction).populate('responsableAction');
if (!responsableAction) return res.status(400).send('Invalid Responsable Action.');

const cause = await Cause.findById(req.body.cause).populate('Cause');
if (!cause) return res.status(400).send('Invalid cause.');

let action = new ActionCorrective({
    refAction :req.body.refAction,
    position : req.body.position,
    status : req.body.status,
    description:req.body.description,
    actionplan:actionplan._id,
    responsableAction:responsableAction._id,
    typeAction:typeAction._id,
    dateResponse:req.body.dateResponse,
    responseDescription:' ',
    photo:' ',
    cause:cause._id    
});
action.save().then(result=>{

  

/* You have received a corrective action type action REF: following Action Plan No. 23566 */



//console.log(responsableAction.lastname[0]);
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

    




const updateActionCorrectiveByCreator =async (req,res,next)=>{
/* const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

 */


const responsableAction = await User.findById(req.body.responsableAction).populate('responsableAction');
if (!responsableAction) return res.status(400).send('Invalid Responsable Action.');

const cause = await Cause.findById(req.body.cause).populate('Cause');
if (!cause) return res.status(400).send('Invalid cause.');




const action = ActionCorrective.findByIdAndUpdate(req.params.id,{
    
   
    position : req.body.position,
    description:req.body.description,
    responsableAction:responsableAction._id,
    dateResponse:req.body.dateResponse,
    cause:cause._id

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




/* AllContainementActionsByActionPlanId, */

module.exports = {updateActionCorrectiveByCreator,getActionsCorrectiveByPlanId,createActionCorrective,deleteActionCorrective,getById,getAllActionCorrective}
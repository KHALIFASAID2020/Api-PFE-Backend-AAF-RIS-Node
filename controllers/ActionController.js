const {Action,validate} =require('../models/Action');
var dateFormat = require('dateformat');
const nodeMailer = require('nodemailer');

/* 
ActionPlanId:Joi.string().required(),
ResponsableActionId:Joi.string().required(),
TypeActionId:Joi.string().required() */
const {ActionPlan} = require('../models/ActionPlan');
const {TypeActionPlan} = require('../models/TypeActionPlan');
const {User}= require('../models/User');

const AllActionGroupByStatus=async(req,res,next)=>{
    Action.aggregate([
        {
            
        },
        {
            $group: {
                _id: '$status',  //$region is the column name in collection
                count: {$sum: 1}
            }
        }
    ], function (err, result) {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });
 } 
 

/* 
isd.aggregate([
    {
        $group: {
            _id: '$region',  //$region is the column name in collection
            count: {$sum: 1}
        }
    }
], function (err, result) {
    if (err) {
        next(err);
    } else {
        res.json(result);
    }
}); */



const AllContainementActionsByActionPlanId=async(req,res,next)=>{
   const typeAction = await TypeActionPlan.findOne({typeAction:'Containement Actions'});
    if (!typeAction) return res.status(400).send('Invalid Type Action.');
//,{actionplan:{_id:req.params.id}}   {typeAction:{_id:typeAction._id}}
    //sort('companyName').
    Action.find({typeAction:{_id:typeAction._id},actionplan:{_id:req.params.id}}).populate('actionplan responsableAction').sort('position').then(action=>{
if(action){
    res.status(200).json(action);
}else{
    res.status(404).json({ message: "Action  not found!" });
}
});
} 

const getAllAction=(req,res,next)=>{
    //sort('companyName').
    Action.find().sort('position').then(action=>{
if(action){
    res.status(200).json(action);
}else{
    res.status(404).json({ message: "Action  not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020

const getById = (req,res,next)=>{
    Action.findById(req.params.id).populate('actionplan responsableAction typeAction').then(action=>{
    if(action){
        res.status(200).json(action);

    }else{
        res.status(404).json({ message: "Action  not found!" });
    }
});
}



//getAllActionReceived
const getAllActionReceived=(req,res,next)=>{
    Action.find(({responsableAction:{_id:req.params.id}})).populate('actionplan responsableAction').then(actionplan=>{
    if(actionplan){
        res.status(200).json(actionplan);
    }else{
        res.status(404).json({ message: "Action Plan not found!" });
    }
});
}

const getAllActionReceivedNotAttribue=(req,res,next)=>{
    Action.count(({responsableAction:{_id:req.params.id},status:'Non Attribué'})).populate('actionplan responsableAction').then(actionplan=>{
    if(actionplan){
        res.status(200).json(actionplan);
    }else{
        res.status(404).json(0);
    }
});
}

const UpdateActionReceived=(req,res,next)=>{
  

    const action = Action.findByIdAndUpdate(req.params.id,{
        status :req.body.status,
        responseDescription : req.body.responseDescription
    },{new:true}).then(result => {
        res.status(201).json({
            message : 'Action  Updated',
            result: result
        });
    }).catch(err=>{
        res.status(500).json({
            message : 'Action not Update',
            error: err
        });  
    });
    


}



const getActions =async (req,res,next)=>{


   
    const actionplan = await ActionPlan.findById(req.query.idPlan);
if (!actionplan) return res.status(400).send('Invalid Action Plan.');




const typeAction = await TypeActionPlan.findOne({typeAction:req.query.ActionType});
if (!typeAction) return res.status(400).send('Invalid Type Action.');



    Action.find({typeAction:{_id:typeAction._id},actionplan:{_id:actionplan._id}}).populate('actionplan typeAction responsableAction').sort('position').then(action=>{
    if(action){
        res.status(200).json(action);

    }else{
        res.status(404).json({ message: "Actions not found!" });
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
 
const actionplan = await ActionPlan.findById(req.query.idPlan);
if (!actionplan) return res.status(400).send('Invalid Action Plan.');

const typeAction = await TypeActionPlan.findOne({typeAction:req.query.ActionType});
if (!typeAction) return res.status(400).send('Invalid Type Action.');

const responsableAction = await User.findById(req.body.responsableAction).populate('responsableAction');
if (!responsableAction) return res.status(400).send('Invalid Responsable Action.');

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,  //true for 465 port, false for other ports
    auth: {
      user: 'aaf.ris.manager.2020@gmail.com',
      pass: 'aaf.ris.manager.2020aaf.ris.manager.2020'
    }
  });



console.log(responsableAction.email);





let action = new Action({
    refAction :req.body.refAction,
    position : req.body.position,
    status : req.body.status,
    description:req.body.description,
    actionplan:actionplan._id,
    responsableAction:responsableAction._id,
    typeAction:typeAction._id,
    dateResponse:req.body.dateResponse,
    responseDescription:' ',
    photo:' '


 
    
});
action.save().then(result=>{

    let subject = 'you have an' 
let htmlEmail = 'Hi '+ responsableAction.lastname +' You have received a  '+ typeAction.typeAction +
'  REF° :'+ req.body.refAction +
'  for response date :'+req.body.dateResponse +
'  Subject :'+req.body.description +
'  http://localhost:4200/actions/detailsactionreceived/'+result._id;

/* You have received a corrective action type action REF: following Action Plan No. 23566 */


    const mailOptions = {
        from: '"AAF Tunisien Quality Portal" <aaf.ris.manager.2020@gmail.com>', // sender address
        to: responsableAction.email, // list of receivers
        subject: subject, // Subject line
        text: htmlEmail, // plain text body
       // html: htmlEmail // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(400).send({success: false})
        } else {
          res.status(200).send({success: true});
        }
      }); 

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
//updateActionByCreator
const updateActionByCreator =async (req,res,next)=>{
  /*   const { error }= validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const actionplan = await ActionPlan.findById(req.body.actionplan);
    if (!actionplan) return res.status(400).send('Invalid Action Plan.');
    
    const responsableAction = await User.findById(req.body.responsableAction);
    if (!responsableAction) return res.status(400).send('Invalid Responsable Action.');
    
    
    const typeAction = await TypeActionPlan.findById(req.body.typeAction);
    if (!typeAction) return res.status(400).send('Invalid Type Action.');
     */
    
    
    const action = Action.findByIdAndUpdate(req.params.id,{
        
        dateResponse :req.body.dateResponse,
        description : req.body.description,
        position : req.body.position,
        responsableAction:req.body.responsableAction
    
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
    




  /*   const cron = require("node-cron");

    cron.schedule("* * * * *", function() {
        console.log("---------------------");
        console.log("Running Cron Job");
        var day=dateFormat(new Date(), "yyyy-mm-dd");
       // console.log("The current date is: " + day) 

     Action.find({dateResponse:{"$gte":day}}).sort('position').then(action=>{
            if(action){
              //  var day=dateFormat(action, "yyyy-mm-dd");

                console.log('Mongoose date : ' +action)
            }else{
                console.log('Error')
            }
            });   */

            //ar d = Date(); 
    
            // Converting the number value to string 
            //a = d.toString()  
              
            // Printing the current date 
            //console.log("The current date is: " + a) 
           

//console.log(Date.now());
       /*  if (shell.exec("sqlite3 database.sqlite  .dump > data_dump.sql").code !== 0) {
          shell.exit(1);
        }
        else{
          shell.echo("Database backup complete");
        } */
     /*  }); */
      

















const updateAction =async (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

const actionplan = await ActionPlan.findById(req.body.actionplan);
if (!actionplan) return res.status(400).send('Invalid Action Plan.');

const responsableAction = await User.findById(req.body.responsableAction);
if (!responsableAction) return res.status(400).send('Invalid Responsable Action.');


const typeAction = await TypeActionPlan.findById(req.body.typeAction);
if (!typeAction) return res.status(400).send('Invalid Type Action.');



const action = Action.findByIdAndUpdate(req.params.id,{
    
    refAction :req.body.refAction,
    position : req.body.position,
    status : req.body.status,
    description:req.body.description,
    actionplan:actionplan._id,
    responsableAction:responsableAction._id,
    typeAction:typeAction._id,
    dateResponse:req.body.dateResponse

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

module.exports = {AllContainementActionsByActionPlanId,AllActionGroupByStatus,getAllActionReceivedNotAttribue,UpdateActionReceived,getActions,updateActionByCreator,getAllActionReceived,getAllAction,deleteAction,deleteAction,createAction,updateAction,getById}
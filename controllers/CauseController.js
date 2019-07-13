const {Cause,validate} = require('../models/Cause');
const {AnalysisMethod} = require('../models/AnalysisMethod');
const {ActionPlan} = require('../models/ActionPlan');


const getAllCause=(req,res,next)=>{
    //sort('companyName').
Cause.find().sort('causeDefaut').then(cause=>{
if(cause){
    res.status(200).json(cause);
}else{
    res.status(404).json({ message: "Cause not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020

const getById = (req,res,next)=>{
Cause.findById(req.params.id).then(cause=>{
    if(cause){
        res.status(200).json(cause);

    }else{
        res.status(404).json({ message: "Cause not found!" });
    }
});
}


//getAllRootCauseByActionPlan

const getAllRootCauseByActionPlan = (req,res,next)=>{
    Cause.find({actionplan:{_id:req.params.id}}).populate('analysisMethod actionplan').then(cause=>{
        if(cause){
            res.status(200).json(cause);
    
        }else{
            res.status(404).json({ message: "Cause not found!" });
        }
    });
    }



const deleteCause =(req,res,next)=>{
    Cause.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}

const createCause=  async(req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

const analysisMethod = await AnalysisMethod.findById(req.body.analysisMethod);
    if (!analysisMethod) return res.status(400).send('Invalid  Method.');

    const actionplan = await ActionPlan.findById(req.params.id);
    if (!actionplan) return res.status(400).send('Invalid  actionplan.');
//const type = Type.findById(req.body.typeId);
  //  if (!type) return res.status(400).send('Invalid Type.');

let cause = new Cause({

    rootCause :req.body.rootCause,
        analysisMethod:analysisMethod._id,
        pourcent:req.body.pourcent,
        actionplan:actionplan._id


});
cause.save().then(result=>{
    res.status(201).json({
        message : 'Cause Created',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Cause Exist',
        error: err
    });
});
}

const updateCause = async (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);
const analysisMethod = await AnalysisMethod.findById(req.body.analysisMethod);
    if (!analysisMethod) return res.status(400).send('Invalid  Method.');


const cause = Cause.findByIdAndUpdate(req.params.id,{
    rootCause :req.body.rootCause,
    analysisMethod:req.body.analysisMethod,
    pourcent:req.body.pourcent
},{new:true}).then(result => {
    res.status(201).json({
        message : 'Cause Updated',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Error Update',
        error: err
    });  
});


}


module.exports = {updateCause,createCause,deleteCause,getById,getAllCause,getAllRootCauseByActionPlan}
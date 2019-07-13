const {ResponsableAction,validate} = require('../models/ResponsableAction');
const {User} = require('../models/User');
const {GroupeResponsableAction} = require('../models/GroupeResponsableAction');


const getAllResponsableAction=(req,res,next)=>{
    //sort('companyName').
ResponsableAction.find().populate('responsableAction').sort('RefResponsable').then(responsable=>{
if(responsable){
    res.status(200).json(responsable);
}else{
    res.status(404).json({ message: "Responsable Not not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020



const getAllResponsableByGroupAnalyse = async (req,res,next)=>{


 /*   const responsableAction = await User.findById(req.body.responsableAction);
    if (!responsableAction) return res.status(400).send('Invalid Responsable.');
   */
  const groupeResponsable = await GroupeResponsableAction.findOne(({actionplan:{_id:req.params.id}}));
  if (!groupeResponsable) return res.status(400).send('Invalid Group.');
//5d048db4f623af14201da3e9
    

    ResponsableAction.find(({groupeResponsableAction:groupeResponsable._id})).populate('responsableAction').then(responsable=>{
    if(responsable){
        res.status(200).json(responsable);

    }else{
        res.status(404).json({ message: "Responsable not found!" });
    }
});
}

const getById = (req,res,next)=>{
    ResponsableAction.findById(req.params.id).then(responsable=>{
    if(responsable){
        res.status(200).json(responsable);

    }else{
        res.status(404).json({ message: "Responsable not found!" });
    }
});
}


const deleteResponsableAction =(req,res,next)=>{
    ResponsableAction.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Deleted Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}

const createResponsableAction= async (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);



    const responsableAction = await User.findById(req.body.responsableAction);
    if (!responsableAction) return res.status(400).send('Invalid Responsable.');
  
    const groupeResponsableAction = await GroupeResponsableAction.findOne(({actionplan:{_id:req.params.id}}));
    if (!groupeResponsableAction) return res.status(400).send('Invalid Group.');

    const ResponsableExist = await ResponsableAction.findOne({groupeResponsableAction:{_id:groupeResponsableAction._id},responsableAction:{_id:responsableAction._id}});
    if (ResponsableExist) return res.status(400).send('Responsable Exist.');


    


    console.log(groupeResponsableAction._id);

let responsable = new ResponsableAction({
    RefResponsable : req.body.RefResponsable,
    responsableAction:responsableAction._id,
    groupeResponsableAction:groupeResponsableAction._id
});
responsable.save().then(result=>{
    res.status(201).json({
        message : 'responsable Created',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Responsable Exist',
        error: err
    });
});
}

const updateResponsableAction =async (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);



const responsableAction = await User.findById(req.body.responsableAction);
    if (!ResponsableAction) return res.status(400).send('Invalid Responsable.');
  
    const groupeResponsableAction = await GroupeResponsableAction.findById(req.body.groupeResponsableAction);
    if (!GroupeResponsableAction) return res.status(400).send('Invalid Responsable.');



const responsable = ResponsableAction.findByIdAndUpdate(req.params.id,{
    RefResponsable : req.body.RefResponsable,
    responsableAction:responsableAction._id,
    groupeResponsableAction:groupeResponsableAction._id
},{new:true}).then(result => {
    res.status(201).json({
        message : 'Produit Updated',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Error Update',
        error: err
    });  
});


}






module.exports = {getAllResponsableAction,deleteResponsableAction,getAllResponsableByGroupAnalyse,createResponsableAction,updateResponsableAction,getById}
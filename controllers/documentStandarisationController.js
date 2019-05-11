const {DocumentStandarisation,validate} = require('../models/DocumentStansarisation');

const getAllDocument=(req,res,next)=>{
    //sort('companyName').
DocumentStandarisation.find().sort('RefDocument').then(document=>{
if(document){
    res.status(200).json(document);
}else{
    res.status(404).json({ message: "Document not found!" });
}
});
//res.send(company);
}//aaf.ris.manager.2020

const getById = (req,res,next)=>{
DocumentStandarisation.findById(req.params.id).then(document=>{
    if(document){
        res.status(200).json(document);

    }else{
        res.status(404).json({ message: "Document of Standarisation not found!" });
    }
});
}


const deleteDocument =(req,res,next)=>{
    DocumentStandarisation.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'Document Deleted Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}

const createDocument= async (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);



//const document = await DocumentStandarisation.findById(req.body.D);
//    if (!document) return res.status(400).send('Invalid document.');
  


let document = new DocumentStandarisation({
    RefDocument : req.body.RefDocument
});
document.save().then(result=>{
    res.status(201).json({
        message : 'Document Created',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Document Exist',
        error: err
    });
});
}

const updateDocument = (req,res,next)=>{
const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);

const document = DocumentStandarisation.findByIdAndUpdate(req.params.id,{
    RefDocument : req.body.RefDocument
},{new:true}).then(result => {
    res.status(201).json({
        message : 'Document Updated',
        result: result
    });
}).catch(err=>{
    res.status(500).json({
        message : 'Error Update',
        error: err
    });  
});


}






module.exports = {getAllDocument,updateDocument,createDocument,deleteDocument,getById}
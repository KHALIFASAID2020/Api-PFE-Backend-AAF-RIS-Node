const userService = require('../service/userService');
const {Company} = require('../models/Company');
//const authorize = require('_helpers/authorize')
// routes
const jwt = require('jsonwebtoken');
//const User = require('../models/User');
const bcrypt =require('bcrypt');
const {User,validate} = require('../models/User');

const nodeMailer = require('nodemailer');

const createUser = async (req,res,next)=>{
   const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,  //true for 465 port, false for other ports
        auth: {
          user: 'aaf.ris.manager.2020@gmail.com',
          pass: 'aaf.ris.manager.2020aaf.ris.manager.2020'
        }
      });
   
    let subject = 'Welcome to the A.A.F Production Quality Portal platform'
    let htmlEmail = 'Hi '+req.body.firstname+'  '+req.body.lastname+' , You can access in our quality management area (http://localhost:4200/) with your email: '+req.body.email+' and password: '+req.body.password;

 

const { error }= validate(req.body);
if(error) return res.status(400).send(error.details[0].message);


const company = await Company.findById(req.body.companyId);
    if (!company) return res.status(400).send('Invalid comapny.');
  

    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const user = new User({
            password: hash,
            email : req.body.email,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            poste:req.body.poste,
            role: req.body.role,
            phone: req.body.phone,
            company:company._id
        });
        user.save().then(result=>{
           const mailOptions = {
                from: '"AAF Tunisien Quality Portal" <aaf.ris.manager.2020@gmail.com>', // sender address
                to: req.body.email, // list of receivers
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
            res.status(201).json({
                message : 'User Created',
                result: result
            });
        }).catch(err=>{
            res.status(500).json({
                message : 'User Exist',
                error: err
            });
        });
    });
}


function authenticate(req, res, next) {
   /*  userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'email or password is incorrect' }))
        .catch(err => next(err)); 
  */
      /*   const user=users.find(users=>users.email === email && users.password===password)
        if (user) {
            const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
            const { password, ...userWithoutPassword } = user;
            return {
                ...userWithoutPassword,
                token
            };
        } */
   let fetchedUser;
      User.findOne({email : req.body.email}).then(user=>{
            if(!user){
                return res.status(400).json({
                    message: 'email or password is incorrect'
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        }).then(result=>{
            console.log(result);
            if(!result){
                return res.status(400).json({
                    message: 'email or password is incorrect'
                });
            }
            const token = jwt.sign({sub : fetchedUser.id,role: fetchedUser.role},"secret_this_should_be_longer");
       const { password, ...userWithoutPassword } = fetchedUser.toObject();
//const u = {token,fetch}
            res.status(200).json({
               token,...userWithoutPassword
            });
        }).catch(err=>{
            return res.status(401).json({
                message : "Auth failed"
            })
        }) 

}



    

/*    const users = await User.find().populate('company');
   console.log(users);
   res.send(users); */
 /* User.find().populate({path :'company', model:'Company',populate:{path :'companyType',model:'Typecompany'}}).then(user=>{
if(user){

    res.status(200).json(user);

}else{
    res.status(404).json({ message: "Users not found!" });
} */
const getAll=  (req,res,next)=>{

  console.log('req.user',req.user);
  User.find()
    .populate({path :'company', model:'Company',populate:{path :'companyType',model:'Typecompany'}})
    .sort({ 'createdOn': -1 })
		.exec()
		.then(users => res.status(200).json(users))
		.catch(err => res.status(500).json({
			message: 'users not found - :(',
			error: err
		}));
  /* const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = User.find().populate({path :'company', model:'Company',populate:{path :'companyType',model:'Typecompany'}});
  let fetchedUsers;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
        fetchedUsers = documents;
      return User.count();
    })
    .then(count => {
      res.status(200).json({
        message: "User fetched successfully!",
        users: fetchedUsers,
        maxUsers: count
      });
    }); */
}

function getById(req,res,next){

const currentUser = req.user;
const id=parseInt(req.params.id);
if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
    return res.status(401).json({ message: 'Unauthorized' });
}
userService.getById(req.params.id)
.then(user => user ? res.json(user) : res.sendStatus(404))
.catch(err => next(err));
}




const deleteUser =(req,res,next)=>{
    User.deleteOne({_id: req.params.id}).then(result=>{
if(result.n>0){
    res.status(200).json({message : 'User Deleted Successful !'});

}else{
    res.status(404).json({ message: "Not authorized!" });

}
    })
}


/* function createUser (req,res,next){
    const currentUser = req.user;


} */

module.exports = {authenticate,getAll,getById,createUser,deleteUser}
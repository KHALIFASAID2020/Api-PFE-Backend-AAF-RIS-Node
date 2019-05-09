const userService = require('../service/userService');
//const authorize = require('_helpers/authorize')
// routes
const jwt = require('jsonwebtoken');
//const User = require('../models/User');
const bcrypt =require('bcrypt');
const {User,validate} = require('../models/User');
const {Company} = require('../models/Company');

const nodeMailer = require('nodemailer');

const createUser = (req,res,next)=>{
    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,  //true for 465 port, false for other ports
        auth: {
          user: 'aaf.ris.manager.2020@gmail.com',
          pass: 'aaf.ris.manager.2020aaf.ris.manager.2020'
        }
      });

     


    const { error }= validate(req.body);

    let subject = 'Welcome to the A.A.F Production Quality Portal platform'
    let htmlEmail = 'Hi '+req.body.firstname+'  '+req.body.lastname+' , You can access in our quality management area (http://localhost:4200/) with your email: '+req.body.email+' and password: '+req.body.password;



    if(error) return res.status(400).send(error.details[0].message);

    const company = Company.findById(req.body.companyId);
    if (!company) return res.status(400).send('Invalid comapny.');
  

    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const user = new User({
            password: hash,
            email : req.body.email,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            company: req.body.companyId,
            poste:req.body.poste,
            role: req.body.role,
            phone: req.body.phone
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

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
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



/* function createUser (req,res,next){
    const currentUser = req.user;


} */

module.exports = {authenticate,getAll,getById,createUser}
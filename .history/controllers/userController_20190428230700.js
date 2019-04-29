const userService = require('../service/userService');
//const authorize = require('_helpers/authorize')
// routes
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt =require('bcrypt');

const createUser = (req,res,next)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const user = new User({
            password: hash,
            email : req.body.email,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            company: req.body.company,
            poste:req.body.poste,
            role: req.body.role
        });
        user.save().then(result=>{
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
     userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'email or password is incorrect' }))
        .catch(err => next(err)); 

      /*   const user=users.find(users=>users.email === email && users.password===password)
        if (user) {
            const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
            const { password, ...userWithoutPassword } = user;
            return {
                ...userWithoutPassword,
                token
            };
        } */
      /*   let fetchedUser;
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
         const { password, ...userWithoutPassword } = fetchedUser;
//const u = {token,fetch}
            res.status(200).json({
                token,...userWithoutPassword
            });
        }).catch(err=>{
            return res.status(401).json({
                message : "Auth failed"
            })
        })  */

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
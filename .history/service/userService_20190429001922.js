const jwt = require('jsonwebtoken');
const Role = require('../_helpers/role');
const config = require('../config.json');
const User = require('../models/User');





const users = [
    { id: 1, email: 'khalifasaid.2020@gmail.com', password: 'admin', firstName: 'Admin', lastName: 'MAHMOUD', role: Role.Admin },
    { id: 2, email: 'said.epi.aaf2015@gmail.com', password: 'user', firstName: 'Normal', lastName: 'MEKKI', role: Role.User }
];

module.exports={authenticate,getAll,getById};

async function authenticate({email,password}){
    const user=users.find(users=>users.email === email && users.password===password)
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    } 
   // let fetchedUser;
 /*  const user =  User.findOne(users => users.email === email , password : password});
  if(user){
      
    const token = jwt.sign({ sub: user.id, role: user.role }, "secret_this_should_be_longer");
    const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
  }

 */
 /*  .then(user=>{
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
      }) 

 */

}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id){
    const user = users.find(u => u.id === parseInt(id));
if(!user) return ;
const{password,...userWithoutPassword}=user ;
return userWithoutPassword;       
}

const secret =require('../config.json');
const jwt = require('jsonwebtoken');
const Role = require('../_helpers/role');


const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
];

module.exports={authenticate};

async function authenticate({username,password}){
    const user=users.find(u=>u.username === username && u.password===password)
if(user){
    const token = jwt.sign({sub : user.id,role:user.role},secret: "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING"
    );
    const { password, ...userWithoutPassword } = user;
    return{ ...userWithoutPassword,
    token}
}
}
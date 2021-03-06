const jwt = require('jsonwebtoken');
const Role = require('../_helpers/role');
const config = require('../config.json');





const users = [
    { id: 1, email: 'khalifasaid.2020@gmail.com', password: 'admin', firstName: 'Admin', lastName: 'MAHMOUD', role: Role.Admin },
    { id: 2, email: 'said.epi.aaf2015@gmail.com', password: 'user', firstName: 'Normal', lastName: 'MEKKI', role: Role.User }
];

module.exports={authenticate,getAll,getById};

async function authenticate({email,password}){
    const user=users.find(users=>users.email === email && users.password===password)
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user();
        return {
            ...userWithoutPassword,
            token
        };
    }
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

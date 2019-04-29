const expressJwt = require('express-jwt');
const secret =require('./config.json');

module.exports = authorize;

function authorize(roles= []){
    if(typeof roles === 'string'){
        roles = [roles];
    }
    return[
        expressJwt({ secret= "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING"
    }),
        (req,res,next)=>{
            if(roles.length && !roles.includes(req.user.role)){
                return res.status(401).json({ message: 'Unauthorized' });
            }
            next();  
        }
        
    ]
}
const jwt = require('jsonwebtoken');

const authCheck = async (req, res, next) => {
    try{
        let newId = req.params.userId
        let token = req.headers['x-auth-token']
        if (!token) token=req.headers['x-Auth-Token']
        if(!token){
            return res.status(401).send({msg: "Token is required"})
        }
        let decodedToken= jwt.verify(token, "group-15-blog-project")
        if(!decodedToken){
            return res.status(401).send({status: false, msg: "Authentication Failed"})
        }
        
        if( newId!==decodedToken.userId){
            return res.status(403).send({status: false, msg: "Not Authorized"})
        }   
         
        next()
    }
    catch(err) {
        return res.status(500).send({status: false, msg: err.message})
    }
}

module.exports.authCheck = authCheck
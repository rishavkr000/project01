const jwt = require('jsonwebtoken');

const authCheck = async (req, res, next) => {
    try{
        // let newUserId = req.params.userId
        let token = req.headers['x-auth-token']
        if (!token) token=req.headers['x-Auth-Token']
        if(!token){
            return res.status(401).send({msg: "Token is required"})
        }
        let validToken = jwt.verify(token, "group-15-blog-project")
        if(!validToken){
            return res.status(400).send({status: false, msg: "validation failed"})
        }
        // req.body.tokenId= validToken._id
        // if( newUserId!==validToken.userId){
        //     return res.status(403).send({status: false, msg: "Unable to verify User"})
        // }      
        next()
    }
    catch(err) {
        return res.status(500).send({status: false, msg: err.message})
    }
}

module.exports.authCheck = authCheck
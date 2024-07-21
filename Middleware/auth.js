const jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const BearerToken=token.slice(7)
        console.log(BearerToken,"bearer")
        if (BearerToken) {
            jwt.verify(BearerToken, "Str0ngP@ssw0rd!", (err, user) => {
                if (err) {
                    return res.status(403).json({message:"Not Authorized User", success:false});
                }
                req.user = user;
                next();
            });
        } else {
             res.status(401).json({success:false})
        }
    } catch (error) {
        res.status(500).json({error:error.message, success:false})
    }
   
};

module.exports=authenticateJWT
const jwt = require('jsonwebtoken');

//Admin@123
const authenticateJWT = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const BearerToken=token.slice(7)
        console.log("BearerToken",BearerToken)
        console.log(BearerToken)
        if (BearerToken) {
            jwt.verify(BearerToken, "Str0ngP@ssw0rd!", (err, user) => {
                if (err) {
                    return res.status(403).json({message:"Not Authorized Admin", success:false,token:false});
                }
                req.user = user;
                next();
            });
        } else {
             res.status(401).json({success:false,token:false})
        }
    } catch (error) {
        res.status(500).json({error:error.message, success:false,token:false})
    }
};

module.exports=authenticateJWT
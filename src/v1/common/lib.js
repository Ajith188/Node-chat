const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const config=require('../../../config.json')

exports.createToken=(_id)=>{
return jwt.sign({_id},config.Jwt_Secret_Key,{expiresIn:"3d"})
}



exports.verifyToken=async function(req, res, next) {
    const token = req.headers["authorization"]
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Token is missing or invalid" });
    }
    const bearerToken = token.slice(7);
    try {
      const decoded = jwt.verify(bearerToken, config.Jwt_Secret_Key)
      req.user = decoded
    //   if (req.body.account!== decoded.account) {
    //       return res.status(403).json({ message: "Access denied" });
    //   }
      next()
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
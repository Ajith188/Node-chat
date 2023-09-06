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
      // console.log(decoded)
      const user=await userModel.userModel.findById(decoded.userid)
      // console.log(user)
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.user = user
      next()
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }

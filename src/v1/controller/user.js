const userModel = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const common = require('../common/lib')
const config=require('../../../config.json')
const { use } = require('../router/user')

const asyncHandler = require('express-async-handler')


exports.register =asyncHandler( async function (req, res) {
    // const{name,email,password}=req.body
    const user = await userModel.userModel.countDocuments({ email: req.body.email })
    // console.log(user)
    if (user == 0) {
        if (req.body.email && req.body.name && req.body.password) {
            // if (!validator.isEmail(email)) {
            // if (!validator.isStrongPassword(password)) {
            if (req.body.password === req.body.Confirmpassword) {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
                const result = await userModel.userModel.create(req.body)
                if (result) {
                    res.send({ status: 1, message: "Successfully register", data: result })
                } else {
                    res.send({ status: 0, message: "Successfully not created" })
                }
            } else {
                res.send({ status: 0, message: "password does not match" })
            }
            // } else {
            //     res.send({ status: 0, message: "Password must be StrongPassword..." })
            // }
            // } else {
            //     res.send({ status: 0, message: "Email Must be a Valid email..." })
            // }
        } else {
            res.send({ status: 0, message: "All fields are required" })
        }
    } else {
        res.send({ status: 0, message: "User with the given email already exist...." })
    }
})


exports.login = asyncHandler(async function (req, res) {
    const email = await userModel.userModel.findOne({ email: req.body.email })
    if (email) {
        const password = await bcrypt.compare(req.body.password, email.password)
        if (password == true) {
        const userid=email._id
        const token= jwt.sign({userid},config.Jwt_Secret_Key,{expiresIn:"3d"})
        const result =await userModel.userModel.findOneAndUpdate({email:req.body.email},{new:true})
        if(result){
            res.send({ status: 0, message: "Login Successfully ",data:result,token })
        }else{
            res.send({ status: 0, message: " " })
        }
        } else {
            res.send({ status: 0, message: "Password doesnot correct " })
        }
    } else {
        res.send({ status: 0, message: "Email is Not register and go to register " })
    }
}
)
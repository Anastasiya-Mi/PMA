const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')
const keys = require('../config/keys')

const User = require('../models/User')


module.exports.login = async function(req,res){
    const candidate = await User.findOne({email:req.body.email})
    if(candidate){
        const passwordResult = bcrypt.compareSync(req.body.password,candidate.password)
        if(passwordResult){
            //token password match
            const token = jsonWebToken.sign({
                email:candidate.email,
                userId: candidate._id
            },keys.jsonWebToken,{expiresIn:60*60})
            res.status(200).json({
                token:`Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message:'Password mismatch'
            })
        }


    } else{
        res.status(404).json({
            message:'This email is not found'
        })
    }
}

module.exports.register = async function (req,res) {
//email password
const candidate = await User.findOne({email:req.body.email})
if(candidate){  
    res.status(409).json({
        message:'This email is already registered'
    })
} else{
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password

  const user = new User({
    email:req.body.email,
    password:bcrypt.hashSync(password,salt)
  })
try{
    await user.save()
    res.status(201).json(user)
} catch (error){
    // ERROR
}
  
}

}


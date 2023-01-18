const User = require('../models/user')
const jwt = require('jsonwebtoken')

const maxAge = 3*60*60
const genToken = (id)=>{
    return jwt.sign({id},process.env.SECRET,{
        expiresIn: maxAge
    })
}

const post_signup=async (req, res)=>{
    try {
        const user = new User(req.body)
        await user.save()
        const token = genToken(user._id)
        res.cookie('jwt',token,{
            expiresIn: maxAge
        })
        res.send({user, token})
    } catch (err) {
     var error = err.message
     if(error.includes('password')){
        error = 'Not a strong password'
     }else if(error.includes('email')){
        error = 'Please enter a valid email'
     }else{
        error ='Name cannot contain a special character or a number'
     }
     res.send({error})   
    }
}

const post_login=async (req, res)=>{
    try {
        const user = await User.verifyCredentials(req.body.email, req.body.userName, req.body.password)
        const token = genToken(user._id)
        res.cookie('jwt',token,{
            expiresIn: maxAge
        })
        res.send({user, token})
    }catch (err) {
    const error = err.message
     res.send({error})   
    }
}

const logout = (req, res)=>{
    res.cookie('jwt','',{maxAge:0})
    res.send()
}


module.exports = {
    post_signup,
    post_login,
    logout
}
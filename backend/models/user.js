const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        maxLength: 10,
        validate:[nameValidation,'Name cannot contain a special character or a number']
    
    },lastName:{
        type: String,
        maxLength: 10,
        validate:[nameValidation,'Name cannot contain a special character or a number']
    },userName:{
        type: String,
        lowerCase: true,
        unique:true,
        maxLength: 15

    },birthdate:{
        type:String,
        maxLength:30
    },
    email:{
        type: String,
        require: true,
        lowerCase: true,
        maxLength:30,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please Enter a valid email')
            }
        }
    },
    password:{
        type: String,
        require: true,
        minLength: [8,'Password is too short'],
        maxLength: 255,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain password')
            }
        }
    }
}) 

//Hashing password before storing in db
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//logging in
userSchema.statics.verifyCredentials = async function(email,userName, password){
    const User = this
    var usr = null;

    if(email !== ''){
        usr = await User.findOne({email})
    }else{
        usr = await User.findOne({userName})
    }

    if(!usr){
        throw new Error ('Email or Username not found')
    }
    const isMatch =await bcrypt.compare(password, usr.password)
    if(!isMatch){
        throw new Error ('Password incorrect')
    }
    return usr
}
function nameValidation(value) {
    return /^[A-Za-z]+$/.test(value);
}
const User = mongoose.model('User',userSchema) 

module.exports = User
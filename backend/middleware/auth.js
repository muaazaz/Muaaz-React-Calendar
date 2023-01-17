const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if (err) {
                req.error = err
            } else {
                const _id = decodedToken.id
                const user = await User.findOne({ _id })
                req.user = user
                req.error = undefined
                next()
            }
        })
    } else {
        req.error = {
            message: 'User not found'
        }
    }
}

module.exports = auth
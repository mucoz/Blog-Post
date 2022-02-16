const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res)=>{
    const username = req.body.username
    const password = req.body.password

    User.findOne({username: username}, (error, user)=>{
        if (user){
            bcrypt.compare(password, user.password, (error, same)=>{
                if (same){
                    req.session.userId = user._id
                    res.redirect('/')
                }
                else{
                    
                    req.flash('loginError', 'Username or password is incorrect')
                    req.flash('data', req.body)
                    res.redirect('/auth/login')
                }
            })
        }
        else{
            req.flash('loginError', 'Username or password is incorrect')
            req.flash('data', req.body)
            res.redirect('/auth/login')
        }
    })
}
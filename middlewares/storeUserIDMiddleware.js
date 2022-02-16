module.exports = function(req, res, next){
    loggedIn = req.session.userId
    next()
}
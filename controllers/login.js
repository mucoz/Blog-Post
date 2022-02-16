module.exports = function(req, res){
    var username = ""
    var password = ""

    const data = req.flash('data')[0]
    if (typeof data != "undefined")
    {
        username = data.username
        password = data.password
    }
    res.render('login', {
        error : req.flash('loginError'),
        username: username,
        password: password
    })
}
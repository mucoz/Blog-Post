module.exports = function(req, res){

    var title = ""
    var description = ""

    const data = req.flash('dataPost')[0]

    if (req.session.userId)
    {
        
        return res.render('create', {
            errors: req.flash('dataPost')
        })
    }
    res.redirect('/auth/login')
}
const BlogPost = require('../models/BlogPost')
const path = require('path')

module.exports  = (req, res)=>{
    let image = req.files.image
    image.mv(path.resolve(__dirname, 'public/img', image.name), (error)=>{
    BlogPost.create({
            
            title: req.body.title,
            body: req.body.body,
            image: '/img/' + image.name,
            userid: req.session.userId
        }, function(error) {
            if (error) {
                const infoErrors = Object.keys(error.errors).map(key => error.errors[key].message)
                
                req.flash('infoErrors', infoErrors)
                req.flash('dataPost', req.body)
                
                return res.redirect('/posts/new')
            }
            res.redirect('/')
        })
    })
    
}
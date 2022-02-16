const BlogPost = require('../models/BlogPost')

module.exports = async(req, res)=>{
        
    const blogpost = await BlogPost.find({title:req.body.search})
    
    res.render('index', {
            blogposts:blogpost,
            searchKeyword: req.body.search
    })
}
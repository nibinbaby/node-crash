
const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find()
    .sort({createdAt: -1})
        .then((result) => {
            res.render('blogs/index', {
                title: 'All blogs', blogs: result
            })
        })
        .catch(err => console.log(err))
}

const blog_create_get = (req, res) => {
    // res.send('<p>about page</p>');
    res.render('blogs/create', {title: 'create a blog'});
}

const blog_details =  (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', {blog: result, title: 'Blog details'})
        })
        .catch(err => res.status(404).render('404', {title: 'blog not found'}))
}

const blog_create_post = (req, res) => {
    
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => console.lgo(err))
};

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({redirect: '/blogs'})
        })
        .catch(err => console.log(err))

}


module.exports = {
    blog_index,
    blog_create_get,
    blog_details,
    blog_create_post,
    blog_delete
}
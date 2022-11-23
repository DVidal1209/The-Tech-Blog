const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = Blog.findAll({include: {model: User, attributes: username}},{
            where: {
                user_id: req.session.user_id,
            }
        })
        const blogs = (await blogData).map((blog) => blog.get({ plain: true }))

        res.status(200).render('dashboard', { blogs });
    }
    catch (err) {
        res.status(500).json(err)
    }
})

router.get('/blogspot/:id', withAuth, async (req, res) => {
    try{
        const blogData = Blog.findByPk({id: req.params.id})
        const blog = (await blogData).map((blogInfo) => blogInfo.get({ plain: true }))
        
        res.status(200).render('userBlog', {blog});
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;
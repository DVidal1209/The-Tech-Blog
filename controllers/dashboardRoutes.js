const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = Blog.findAll({
            include: {
                model: User,
                attributes: ["username"]
            }
        }, {
            where: {
                user_id: req.session.user_id,
            }
        })
        const blogs = (await blogData).map((blog) => blog.get({ plain: true }))

        res.status(200).render('dashboard', { blogs, logged_in: req.session.logged_in });
    }
    catch (err) {
        res.status(500).json(err)
    }
})

router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        req.session.user_id = 1;
        const id = parseInt(req.params.id);
        const blogData = await Blog.findByPk(id,{
            include:{
                model: Comment,
                attributes: ['comment_body'],
                include: {
                    model: User,
                    attributes: ['username']
                },
            },
            where: {
                user_id: req.session.user_id
            }
        })

        const blog = blogData.get({ plain: true });
        console.log(blog);

        res.status(200).render('userBlog', { blog, logged_in: req.session_logged_in });
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;
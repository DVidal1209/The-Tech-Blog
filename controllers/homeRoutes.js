const router = require('express').Router();
const { Blog, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {

    const blogData = await Blog.findAll({
      include: 
        {
          model: User,
          attributes: 'username',
        },
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));


    res.render('homepage', { blogs, logged_in: req.session.logged_in })
  }
  catch (err) {
    res.status(500).json(err);
  }
})

router.get('/login', async (req, res) => {
  if (req.session.logged_in){
    res.redirect('/dashboard');
    return
  }
    res.render('login')
})

router.get('/signup', async (req, res) => {
  if (req.session.logged_in){
    res.redirect('/dashboard');
    return
  }
    res.render('signup')
})

router.get("/blogpost/:id", async (req, res) => {
  try {

    // Get blog information including all comments
    const blogData = await Blog.findByPk({
      include: {
        model: Comment,
        include: { model: User, attributes: username}
      }
    })

    if(!blogData){
      res.status(404).json(message= `No blog found under id: ${req.params.id}`)
    }
    // Serializing data
    const blog = blogData.map((blogInfo) => blogInfo.get({ plain: true }));

    res.render('blog', { blog, logged_in: req.session.logged_in })
  }
  catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;

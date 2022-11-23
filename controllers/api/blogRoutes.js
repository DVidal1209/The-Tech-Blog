const router = require('express').router();
const { User } = require('../../../../01-Activities/28-Stu_Mini-Project/Main/models');
const { Blog } = require('../../models');

// Create new blog
router.post('/', async (req, res) => {
    try {
        const blogData = await Blog.create({ ...req.body, user_id: req.session.user_id });
        res.status(200).render('dashboard', {})
    }
    catch (err) {
        req.status(500).json(err);
    }
})

// Update a blog
router.put('/:id', async (req, res) => {
    try{
        const blogData = await Blog.update(
            {comment: req.body.comment},
        )
        res.status(200).render('dashboard', {})
    }
    catch (err) {
        req.status(500).json(err);
    }
})

// Delete a blog
router.delete('/:id', async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }

        res.status(200).render('dashboard', {});
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
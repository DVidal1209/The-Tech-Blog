const router = require('express').Router();
const { Blog } = require('../../models');

// Create new blog
router.post('/', async (req, res) => {
    try {
        const blogData = await Blog.create({...req.body, user_id: req.session.user_id});
        res.status(200).json(blogData);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// Update a blog
router.put('/:id', async (req, res) => {
    try{
        const blogData = await Blog.update(
            {
                title: req.body.title,
                content: req.body.content
            },{
            where: {
                id: req.body.id,
                user_id: req.session.user_id
            }
        })
        res.status(200).json(blogData)
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// Delete a blog
router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user_id = req.session.user_id
        console.log(id);
        console.log(req.session.user_id);

        console.log("Hello")

        Blog.destroy({
            where: {
                id: id,
                user_id: req.session.user_id
            }
        })
        .then ((blogData) => {
            if (!blogData){
                res.status(404).json({ message: 'No blog found with this id!' });
            return;
            }
            console.log(blogData)
            res.status(200).json(blogData);
        })

    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
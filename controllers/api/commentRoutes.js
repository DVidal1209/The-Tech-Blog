const router = require('express').Router();
const { Comment } = require('../../models');


// Add a new comment
router.post('/', async (req, res) => {
    try{
        const commentData = await Comment.create({ 
            comment_body: req.body.comment_body,
            blog_id:  parseInt(req.body.blog_id),
            user_id: req.session.user_id
        })
        res.status(200).json(commentData);
    }
    catch (err){
        res.status(500).json(err);
    }
})

// Delete a comment
router.delete('/:id', async (req, res) => {
    try{
        const commentData = await Comment.destroy(
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                }
            }
        )
        res.status(200).json(commentData);
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;
const router = require('express').Router();
const postModel = require('../model/postModel');
const bcrypt = require('bcrypt')

// get all the posts
router.get('/', async (req, res)=>{
    try {
        const posts = await postModel.find()
        const reversePosts = posts.reverse()
        res.status(200).json({
            status: 'Success',
            post: reversePosts
        })
    } catch (error) {
        res.status(500).json({
            message:' Something went wrong!'
        })
    }
})

// new post
router.post('/', async (req, res)=>{
    try {
        if(req.body.password){
            const Password = await bcrypt.hash(req.body.password, 10)
            var newPost = await postModel.create({
                label: req.body.label,
                url: req.body.url,
                password: Password
            })
        }else{
            newPost = await postModel.create(req.body)
        }

        if(newPost){
            return res.status(200).json({
                status:'Post created succesfully!',
                post: newPost
            })
        }

        res.status(400).json({
            status:'Failed to create post'
        })
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong!"
        })
    }
})

// delete post 
router.delete('/:postID', async (req, res)=>{
    try {
        const postID = req.params.postID
        const post = await postModel.findByIdAndDelete(postID)
        if(post){
            return res.status(200).send('Post deleted successfully!')
        }else{
            return res.status(400).send('You can delete only with right ID')
        }
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong!"
        })
    }
})
module.exports = router;
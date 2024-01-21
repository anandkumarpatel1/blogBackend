const express = require('express')
const {createPost, allPosts, deleteUserPost} = require('../controller/postController')
const {protect} = require('../middleWare/Auth')

const router = express.Router()

router.route('/createpost').post(protect, createPost)
router.route('/allposts').get(protect, allPosts)
router.route('/deletePost/:id').delete(protect, deleteUserPost)

module.exports = router
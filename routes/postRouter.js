const express = require('express')
const {createPost, allPosts, deleteUserPost, editUserPost} = require('../controller/postController')
const {protect} = require('../middleWare/Auth')

const router = express.Router()

router.route('/createpost').post(protect, createPost)
router.route('/allposts').get(protect, allPosts)
router.route('/deletePost/:id').delete(protect, deleteUserPost)
router.route('/updatePost/:id').put(protect, editUserPost)

module.exports = router
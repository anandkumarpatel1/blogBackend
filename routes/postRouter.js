const express = require('express')
const {createPost, allPosts} = require('../controller/postController')
const {protect} = require('../middleWare/Auth')

const router = express.Router()

router.route('/createpost').post(protect, createPost)
router.route('/allposts').get(protect, allPosts)

module.exports = router
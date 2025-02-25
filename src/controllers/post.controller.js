const postModel = require('../models/post.model');

module.exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.userId;

        if (!title || !content) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const post = await postModel.create({
            title,
            content,
            userId,
        });

        return res.status(201).json({
            message: "Post created",
            post,
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Error is create post",
        });
    }
}
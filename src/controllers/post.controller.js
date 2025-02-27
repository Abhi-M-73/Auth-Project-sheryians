const postModel = require('../models/post.model');
const userModel = require('../models/user.model');

module.exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.userId;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const post = await postModel.create({ title, content, author: userId });

        const user = await userModel.findById(userId)
        user.posts.push(post);
        await user.save();

        return res.redirect("/users/home")

    } catch (error) {
        console.error("Error in createPost:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

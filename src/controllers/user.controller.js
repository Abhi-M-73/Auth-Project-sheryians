const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const postModel = require("../models/post.model");

module.exports.registerView = async (req, res) => {
    try {
        res.render('register');
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Error is register view",
        });
    }
}

module.exports.loginView = async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Error is login view",
        });
    }
}

module.exports.homeView = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);

        const allPosts = await postModel.find().populate("author");

        res.render('home', { user, allPosts });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Error is home view",
        });
    }
}

module.exports.userRegister = async (req, res) => {
    try {
        const { username, email, profileImage, password } = req.body;
        if (!username || !email || !profileImage || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already registered",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            profileImage,
            password: hashPassword,
        });

        res.redirect('/users/login');

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Error is user register",
        });
    }
}

module.exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY);
        res.cookie("token", token);

        return res.redirect("/users/home");

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error in user login" });
    }
};

module.exports.userLogout = async (req, res) => {
    try {
        res.clearCookie("token");

        return res.redirect("/users/login");

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Error is user logout",
        });
    }
}
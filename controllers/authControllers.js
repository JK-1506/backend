const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User');

let refreshTokens = [];
const authController = {
    //Register
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const usertest = await User.findOne({ username: req.body.username });
            if (usertest) {
                return res.status(404).json("Số điện thoại đã tồn tại!");
            }
            if(!usertest){
            //Create new user
            const newUser = await new User({
                username: req.body.username,
                password: hashed,
                name: req.body.name,
                address: req.body.address
            })
        

            //Save to DB
            const user = await newUser.save();
            res.status(200).json(user);
        }

        } catch (err) {
            res.status(500).json(err);

        }

    },

    //Generate access token
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
        },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "1h" }
        );
    },

    //Generate refresh token
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
        },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        );
    },

    //Login
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json("Nhập sai số điện thoại!");
            }
            const valiPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!valiPassword) {
                return res.status(404).json("Nhập sai mật khẩu!");
            }
            if (user && valiPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                })

                const { password, ...others } = user._doc;
                res.status(200).json({ ...others, accessToken });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Logout
    logoutUser: async (req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("Đăng xuất thành công");
    },

    //Refresh token
    requestRefreshToken: async (req, res) => {
        //Lay refresh token tu user
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("Bạn chưa đăng nhập");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token đã hết hạn");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            //Tao moi accesstoken, refresh token
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({ accessToken: newAccessToken });
        })
    }

};

module.exports = authController;
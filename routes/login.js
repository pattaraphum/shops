const e = require('express');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
    try {
        let userData =
            [
                {
                    username: 'user1',
                    password: 'pass1',
                    fullname: 'User One'
                },
                {
                    username: 'user2',
                    password: 'pass2',
                    fullname: 'User Two'
                }
            ]
        let body = req.body;
        if (!body.username || !body.password) {
            throw new Error('Username and password are required.');
        }

        let userNameIsValid = false;
        let passwordIsValid = false;

        for (let user of userData) {
            if (body.username === user.username) {
                userNameIsValid = true;
            }
            if (body.password === user.password) {
                passwordIsValid = true;
            }
        }

        if (!userNameIsValid || !passwordIsValid) {
            throw new Error('Username or password invalid.');
        }

        let token = jwt.sign({ username: body.username }, 'shhhhh', { expiresIn: '24h' });
        console.log(token);

        res.status(200).json({
            message: 'Login successful',
            token: token,
        });
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
});

router.get('/members', function (req, res) {
    res.status(200).json({
        message: 'Protected route accessed.'
    });
});

module.exports = router;

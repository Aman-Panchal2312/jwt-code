const express = require('express');
const jwt = require('jsonwebtoken');
const secretkey = "secretkey";

const app = express();


app.get('/',(req, resp) => {
    resp.json({
        message: "Jwt token app"
    })
})

app.post("/login", (req, resp) => {
    const user = {
        id: 1,
        username:"aman"
    }
    jwt.sign({ user }, secretkey, { expiresIn: '120s' }, (error, token) => {
        resp.json({
            token
        })
    })
})

app.post("/profile", verifyToken, (req, resp) => {
    jwt.verify(req.token, secretkey, (error, authData) => {
        if (error) {
            resp.send({result:"Invalid hai token"})
        } else {
            resp.json({
                message: "profile accessed",
                authData
            })
        }
    })
    
})

function verifyToken (req, resp,next){
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        resp.send({
            result:'Token is not Valid'
        })
    }
}

app.listen(5000);
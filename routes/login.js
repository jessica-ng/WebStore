var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser')
router.use(cookieParser())

var login = [{ name: "Bob", username: "admin", password: "admin" }];

var error403 = {
    status: "403",
    message: "Forbidden",
    stack: "You don't have permission"
}

/* GET home page. */
router.post('/auth', function (req, res) {
    
    for (i = 0; i < login.length; i++) {
        if (login[i].username == req.body.username && login[i].password == req.body.password) {
            var token={access_token: "concertina"};
            req.access_token = "concertina";
            console.log(req)
            res.cookie('access_token',"concertina");
            //console.log(res);
            //var data = JSON.stringify(token) +",http://localhost:8000/admin"
            //res.write(data)
            
            res.end()
            
        }
        else{
            throw new Error("Incorrect login details")
        }
    }
});

router.use(function (err, req, res, next) {
    res.send(err.message);
    res.status(400).end()
});

router.get('/addnewusers', function (req, res, next) {
    if (req.cookies.access_token == "concertina") {
        res.render('addnewusers');
    }
    else {

        res.status(403);
        res.render('error', { error: error403, message: "Forbidden" })
    };
    

});

router.post('/addnewusers/submit', function (req, res, next) {
    console.log(req.body)
    if (req.cookies.access_token == "concertina") {
        login.push(req.body);
    };


});

module.exports = router;

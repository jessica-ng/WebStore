var express = require('express');
var router = express.Router();
var app = express();
var createError = require('http-errors');

var people = [
    {
        username: "doctorwhocomposer",
        forename: "Delia",
        surname: "Derbyshire"
    }

];

var orders = [{
    forename: "Bob",
    surname: "Johnson",
    orderitem: "4",
    shippingstatus: "processing order",
    ordernum: "1"
}]

var error400 = {
    status: "400",
    message: "Please choose a different username",
    stack: "You don't have permission"
}

var error403 = {
    status: "403",
    message: "Forbidden",
    stack: "You don't have permission"
}

/* GET people listing. */
router.get('/', function (req, resp) {
    resp.send(people);
});

router.get('/:username', function (req, resp) {
    for (i = 0; i < people.length; i++) {
        if (people[i].username == req.params.username) {
            resp.send(people[i]);
            break
        }
    }

});

router.post('/order', function (req, resp) {
    const JSON = require('circular-json');
    var obj = JSON.stringify(req.body);
    for (i = 0; i < orders.length; i++) {
        if (orders[i].ordernum != null && orders[i].ordernum == req.body.ordernum) {
            resp.send(orders[i]);
            break
        }
    }

});

router.post('/neworder', function (req, resp) {
    const JSON = require('circular-json');
    var obj = JSON.stringify(req.body);
    if (req.body.forename != '') {
        orders.push(obj);
        resp.send(orders);
    }
});

router.post('/updateorder', function (req, resp) {
    if (req.cookies != null && req.cookies.access_token == "concertina") {
        const JSON = require('circular-json');
        var obj = JSON.stringify(req.body);
        for (i = 0; i < orders.length; i++) {
            if (orders[i].ordernum != null && orders[i].ordernum == req.body.ordernum) {
                orders[i].shippingstatus = req.body.shippingstatus;
                resp.send(orders[i]);
                break
            }
        }
    }

});

router.post('/', function (req, res, next) {
    if (req.cookies != null || req.body.params != null) {
        if (req.cookies != null && req.cookies.access_token == "concertina" || req.body.params != null && req.body.params.access_token == "concertina") {
            for (i = 0; i < people.length; i++) {
                if (req.body.username == people[i].username) {
                    throw new Error('username was taken');
                }
            }
            people.push(req.body);
        }
        else {
            res.status(403).end();
        }
    }

    else {
        res.status(403).end();
    }

});

router.use(function (err, req, res, next) {
    res.send(err.message);
    res.status(400).end()
});

module.exports = router;
var express = require('express');
var router = express.Router();

var error403 = {
    status: "403",
    message: "Forbidden",
    stack: "You don't have permission"
}


/* GET admin page. */
router.get('/', function (req, res) {
    if (req.cookies.access_token == "concertina") {
        res.render('admin');
    }
    else {
        res.status(403);      
        res.render('error', { error: error403, message: "Forbidden"})
    }
});



module.exports = router;
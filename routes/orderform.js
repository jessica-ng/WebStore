var express = require('express');
var router = express.Router();

var orderform = '<form> Forename:<br> <input type="text" name="forename"><br>Surename:<br><input type="text" name="surename"><br>Order item number:<br><input type="text" name="orderitem"></form> <br><button id="submit">Submit</button>';

var jquery = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"> </script><script> var $ = jQuery; $("#submit").on("click", function () {alert("lolol"); $.post("http://localhost:8000/people/neworder",{forename: $("#forename").val(),surename: $("#surename").val(),orderitem: $("#orderitem").val()},function (data) { console.log(data); $("#footer").html(data); }); return false;})</script>';

//function formhandler() {
    //var title = $("#title").val();
   // $.post("http://localhost:8000/neworder",
        //{
           // forename: $("#forename").val(),
            //surename: $("#surename").val(),
          //  orderitem: $("#orderitem").val()
        //},
        //function (data) {
      //      $('#orderresult').html(data);
    //    });
  //  return false;

//};

router.use('/', function (req, res, next) {
    res.send(orderform + jquery);

});

module.exports = router;

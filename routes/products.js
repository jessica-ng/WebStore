var express = require('express');
var router = express.Router();

var products = [{
    product_name: "Milkyway galaxy friction erasable pen",
    type: "pens",
    short_name: "mk",
    image_name: "/images/mk1.jpg",
    product_des: "Super beautiful pen with milkyway and galaxy inspired prints on. It has a friction erasable function, the rubber end of the pen acts as the eraser. And the rubber can erase any writing with this pen by rubbing it over the area you want to erase. >>> Blue ink + 0.5mm tip << <",
    price: "1.75",
    star_rating: "5"
},
{
    product_name: "Starry Sky Galaxy Forest Pen",
    type: "pens",
    short_name: "ss",
    image_name: "/images/ss1.jpg",
    product_des: "It's amazing!",
    price: "1.25",
    star_rating: "4"
},
{
    product_name: "Watercolour x Geometric Post-it Notes",
    type: "notes",
    short_name: "wg",
    image_name: "/images/wg1.jpg",
    product_des: "It's amazing!",
    price: "1.00",
    star_rating: "3"
},

{
    product_name: "Galaxy washi tape",
    type: "stickers",
    short_name: "wt",
    image_name: "/images/wt1.jpg",
    product_des: "It's amazing!",
    price: "1.50",
    star_rating: "4"
},
{
    product_name: "Journal stickers",
    type: "stickers",
    short_name: "st",
    image_name: "/images/st1.jpg",
    product_des: "It's amazing!",
    price: "1.20",
    star_rating: "5"
},
{
    product_name: "Polar bear post-it notes",
    type: "notes",
    short_name: "pn",
    image_name: "/images/pn1.jpg",
    product_des: "It's amazing!",
    price: "1.25",
    star_rating: "3"
    },
    {
    product_name: "Milkyway galaxy friction erasable pen",
    type: "pens",
    short_name: "mk",
    image_name: "/images/mk1.jpg",
    product_des: "It's amazing!",
    price: "1.25",
    star_rating: "5"
},
{
    product_name: "Starry Sky Galaxy Forest Pen",
    type: "pens",
    short_name: "ss",
    image_name: "/images/ss1.jpg",
    product_des: "It's amazing!",
    price: "1.00",
    star_rating: "4"
},
{
    product_name: "Floral wreath Post-it Notes",
    type: "notes",
    short_name: "fn",
    image_name: "/images/fn1.jpg",
    product_des: "It's amazing!",
    price: "2.00",
    star_rating: "4"
},
];

/* GET products page. */
router.get('/', function (req, res, next) {
    res.send(products);
});


router.get('/:short_name', function (req, res, next) {
    console.log(req.protocol + '://' + req.get('host') + '/products' + req.url);
    for (i = 0; i < products.length; i++) {
        if (req.params.short_name == products[i].short_name) {
            res.render('products', products[i]);
            break
        }
    }
    next()

});

router.get('/:type', function (req, res) {

    console.log(req.protocol + '://' + req.get('host') + '/products' + req.url);
    var list = [];
    for (i = 0; i < products.length; i++) {
        if (req.params.type == products[i].type) {
            list.push(products[i])
        }
    }
    res.render('category_product', { data: list, length: list.length });

});

module.exports = router;
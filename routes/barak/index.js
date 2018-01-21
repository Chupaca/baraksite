var express = require('express');
var router = express.Router();



router.get('/gallery', function (req, res) {
    let imagesList = [
        "38476_dark_souls.jpg",
        "42409_dark_souls.jpg",
        "55686_dark_souls.jpg",
        "57112_dark_souls.jpg",
        "57121_dark_souls.jpg",
        "412938.jpg",
        "8357576.jpg",
        "412938.jpg",
        "8357576.jpg",
        "8357604.jpg",
        "8357630.jpg",
        "8563550.jpg",
        "8665194.jpg",
        "8357604.jpg",
        "8357630.jpg",
        "8563550.jpg",
        "8665194.jpg"
    ]
    res.render('startpage/gallerypreview',{ImagesList:imagesList});
})

router.get('/aboutus', function (req, res) {
    res.render('startpage/ourstory',{title:""});
});
module.exports = router;
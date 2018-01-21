
var right_side_animation = {
    "border": "0",
    "border-image":
        "repeating-linear-gradient( 60deg,#fbfb08 2px,#c5c50b 9px,#000000db 7px,#000000d9 14px )",
    "border-image-slice": "6"
}
var right_side_animation_generalcontaint = {
    "border": "0",
    "border-image":
        "repeating-linear-gradient( 60deg,#fbfb08 2px,#c5c50b 9px,#000000db 7px,#000000d9 14px )",
    "border-image-slice": "6"
}

function scrollPageNavItemsMoving(item, active) {
    var navItem = item || ".nav_item";
    if (global_nav_flag && active) {
        flag_active = false;
        $(navItem).each((i, item) => {
            setTimeout(function () {
                $(item).addClass("active");
            }, i * 100);
        })

        setTimeout(function () {
            $(navItem).removeClass("active");
            flag_active = true;
        }, 1000);
    }
}

function scrollNavHeaderZooming(down) {
    if (down) {
        $(".warp_icon").animate({
            "height": "35px",
            "font-size": "25px",
            "margin-top": "15px"
        }, 500);
        $(".discript_title, .phone_title").animate({
            "opacity": 0,
            "height": "0px"
        })
        $(".nav_item").animate({ "top": "115px" })
    } else {
        $(".warp_icon").animate({
            "height": "100px",
            "font-size": "90px",
            "margin-top": "35px"
        }, 500);
        $(".discript_title, .phone_title").animate({
            "opacity": 1,
            "height": "100px"
        })
        $(".nav_item").animate({ "top": "135px" })
    }
}

function closeSection(item, right, left, rightSpeed, leftSpeed) {
    $("." + item + "_right_block").animate({
        "right": right
    }, rightSpeed, "easeOutBounce")
    $("." + item + "_left_block").animate({
        "left": left
    }, leftSpeed, "easeOutBounce")
}

function openSections() {
    $(".section_right").animate({
        "right": "-1200px"
    }, 500)
    $(".section_left").animate({
        "left": "-1200px"
    }, 500)
    $(".section_right, .section_left").removeAttr("style");
    firstSection_flag = false, secondSection_flag = false;
}

function dropOurStory() {
    return new Promise((resolve, reject) => {
        $(".our_story").animate({
            "width": "51%",
            "opacity": "1",
            "margin": "17% 22% 16% 25%",
            "z-index": "100"
        }, 400, "easeInOutBack", function () {
            firstSection_flag = true, secondSection_flag = true; generalPage = false;
            resolve(true);
        })
    })
};

function removeOurStory() {
    return new Promise((resolve, reject) => {
        if ($(".our_story").length) {
            $(".our_story").animate({
                "margin-left": "-57%"
            }, 400, "easeInCirc", function () {
                $(".our_story").remove();
                resolve(true);
            })
        } else {
            resolve(true);
        }
    })
};

function removeGallery() {
    return new Promise((resolve, reject) => {
        if ($("#gallery_warp").length) {
            $(".image_continer").animate({
                "margin-left": "-57%",
            }, 700, "easeInCirc", function () {
                $("#gallery_warp").remove();
                resolve(true);
            })
        } else {
            resolve(true);
        }
    })
};


function returnToBlankPage() {
    return upPage()
        .then(openGeneralPage)
        .then(removeAllViews)
        .then(closeGeneralPage)
}


function removeAllViews() {
    return removeOurStory()
        .then(removeGallery)
}

function openGeneralPage() {
    return new Promise((resolve, reject) => {
        $("#general_containt").css(right_side_animation_generalcontaint);
        $(".our_story, .image_continer").css(right_side_animation);
        $("#general_containt").animate({ textIndent: 60 }, {
            step: (now, fx) => {
                $("#general_containt").css({
                    'transform': 'perspective(1000px) rotateY(' + (-now) + 'deg)',
                    "border-right": (now / 3.5) + "px solid",
                });
                $(".our_story, .image_continer").css({
                    "border-right": (now / 4) + "px solid",
                })
            },
            complete: () => {
                $("#general_containt").css({ "text-indent": "-60px" })
                resolve(true);
            }
        }, 300)
    })
}

function closeGeneralPage() {
    return new Promise((resolve, reject) => {
        $("#general_containt").animate({ textIndent: 0 }, {
            step: (now, fx) => {
                $("#general_containt").css({
                    'transform': 'perspective(1000px) rotateY(' + now + 'deg)',
                    "border": now / (-3)
                });
            },
            complete: () => {
                $("#general_containt").css({
                    "text-indent": "0"
                })
                resolve(true);
            }
        }, 300)
    })
}

function upPage() {
    return new Promise((resolve, reject) => {
        $('html,body').animate({ scrollTop: 0 }, 200, function () {
            resolve(true);
        })
    })
}

function openImage(items) {
    return new Promise((resolve, reject) => {
        let item = items.shift();
        if (item) {
            $(item).animate({ textIndent: 110 }, {
                step: (now, fx) => {
                    $(item).css({
                        "display": "block",
                        "box-shadow": "inset 0px 1px 20px " + (120 - now) + "px" + " #727272"
                    });
                },
                complete: () => {
                    $(item).on("click", openPreviewImage)
                    resolve(openImage(items))
                }
            })

        } else {
            // $(".image_continer").on("click", openPreviewImage)
            resolve(true)
        }
    })
}
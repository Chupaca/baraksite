var global_nav_flag = false;
var firstSection_flag = false;
var secondSection_flag = false;
var generalPage = true;
var flag_active_nav = true;


$(window).scroll(function () {
  if ($(".warp_icon").offset().top > 50 && !global_nav_flag) {
    global_nav_flag = true;
    scrollNavHeaderZooming(true);

  }
  else if ($(".warp_icon").offset().top < 49 && global_nav_flag) {
    global_nav_flag = false;
    scrollNavHeaderZooming(false);
    if (generalPage) openSections();
  }
  if (global_nav_flag)
    scrollPageNavItemsMoving(null, flag_active_nav)

  if ($(".warp_icon").offset().top > 60 && !firstSection_flag) {
    closeSection("first", "-90px", "-90px", 900, 900);
    firstSection_flag = true;
  }
  if ($(".warp_icon").offset().top > 250 && !secondSection_flag) {
    closeSection("second", "-120px", "-90px", 500, 1500);
    secondSection_flag = true;
  }
});

$(".nav_item").mouseleave(function () {
  scrollPageNavItemsMoving(this, flag_active_nav)
})

$("#home").click(() => {
  return returnToBlankPage()
    .then(r => {
      firstSection_flag = false, secondSection_flag = false; generalPage = true;
    })
})

$("#about_us").click(() => {
  return returnToBlankPage()
    .then(r => {
      $.get("/barak/aboutus")
        .then(result => {
          $("#general_containt").append(result);
          return dropOurStory()
        })
    })
})



$("#gallery").click(() => {
  return returnToBlankPage()
    .then(() => {
      $.get("/barak/gallery")
        .then(result => {
          $("#general_containt").append(result);
          openImage(Array.prototype.slice.call($(".image_continer")));
          firstSection_flag = true, secondSection_flag = true;
          generalPage = false;
        })
    })
})


//modal images 

var modal = document.getElementById('myModal');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

function openPreviewImage(e){
    modal.style.display = "block";
    modalImg.src = $(this).css("background-image").replace('url("', "").replace('")', "");
    // captionText.innerHTML = $(this).alt;
}
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
    modal.style.display = "none";
}

$("#myModal").click(()=>{
  modal.style.display = "none";
})



window.onload = (e) => {

}

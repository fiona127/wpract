var prev = document.getElementById("prev");
var next = document.getElementById("next");
var image = document.getElementById("image");

var images = ["Images/travel2.jpg", "Images/travel3.jpg", "Images/travel4.jpg"];

var imageIndex = 0;

prev.onclick = function(){
    if(imageIndex == 0){
        imageIndex = images.length -1;
    }
    else{
        imageIndex--;
    }
    image.setAttribute("src", images[imageIndex]);
}

next.onclick = function(){
    if(imageIndex == images.length -1){
        imageIndex = 0;
    }
    else{
        imageIndex++
    }
    image.setAttribute("src", images[imageIndex]);
}
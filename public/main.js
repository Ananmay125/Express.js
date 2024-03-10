var imageArray = ["images/sanic-.jpg", "images/huh_cat.jpg", "images/smudge.png"];
var currentImageIndex = 0;

function changeImage() {
    var bruhImage;
    bruhImage = document.getElementById("bruh-image");

    bruhImage.style.opacity = 0;

    setTimeout(function() {
        bruhImage.src = imageArray[currentImageIndex];
    }, 500);

    setTimeout(function() {
        bruhImage.style.opacity = 1;
    }, 500);

    currentImageIndex = (currentImageIndex + 1) % imageArray.length;
}

setInterval(changeImage, 5000);
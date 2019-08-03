var canvas = document.getElementById("canvas");
image1 = new MarvinImage();
image1.load("https://i.imgur.com/ChdMiH7.jpg", imageLoaded);
image2 = new MarvinImage();
image2.load("https://i.imgur.com/h3HBUBt.png", imageLoaded);
image3 = new MarvinImage();
image3.load("https://i.imgur.com/UoISVdT.png", imageLoaded);

var loaded = 0;

function imageLoaded() {
    if (++loaded == 3) {
        var image = new MarvinImage(image1.getWidth(), image1.getHeight());
        // Marvin.combineByAlpha(image1, image2, image, 0, 0);
        Marvin.combineByAlpha(image1, image3, image, 20, 20);
        image.draw(canvas);
    }
}
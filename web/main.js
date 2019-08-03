var canvas = document.getElementById("canvas");
image1 = new MarvinImage();
image1.load("https://i.imgur.com/ChdMiH7.jpg", imageLoaded);
image3 = new MarvinImage();
image3.load("https://i.imgur.com/AMsXIc8.png", imageLoaded);

var loaded = 0;

function imageLoaded() {
    if (++loaded == 2) {
        var image = new MarvinImage(image1.getWidth(), image1.getHeight());
        // Marvin.combineByAlpha(image1, image2, image, 0, 0);
        Marvin.scale(image3.clone(), image3, 80)
        Marvin.combineByAlpha(image1, image3, image, 0, 0);
        image.draw(canvas);
    }
}
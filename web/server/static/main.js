var canvas = document.getElementById("canvas");
image1 = new MarvinImage();
image1.load($('#img_src').val(), imageLoaded);
image3 = new MarvinImage();
image3.load($('#window_src').val(), imageLoaded);

var loaded = 0;
var coords = JSON.parse($('#coords').val())[0];
x = coords[0];//Math.floor((coords[0] + coords[2]) / 2);
y = coords[1];//362 - Math.floor((coords[1] + coords[3]) / 2);
console.log(x, y);
function imageLoaded() {
    if (++loaded == 2) {
        var image = new MarvinImage(image1.getWidth(), image1.getHeight());
        Marvin.scale(image3.clone(), image3, coords[3] - coords[1], coords[2] - coords[0])
        Marvin.combineByAlpha(image1, image3, image, y, x);
        image.draw(canvas);
    }
}
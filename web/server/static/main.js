$(document).ready(function () {
    $('#blogCarousel').carousel({
        interval: 3600000
    });

    var c = document.getElementById("canvas1");
    var ctx = c.getContext("2d");
    var coords = JSON.parse($('#coords').val());

    function drawAllImages(windowSrc) {
        console.log(windowSrc);
        ctx.clearRect(0, 0, c.width, c.height);

        var imageObj1 = new Image();
        var imageObj2 = new Image();
        var imageObj3 = new Image();

        imageObj1.src = $('#img_src').val();
        imageObj3.src = $('#glass_src').val();

        imageObj1.onload = function () {
            ctx.drawImage(imageObj1, 0, 0);
            imageObj2.src = windowSrc;
            imageObj2.onload = function () {
                for (let i = 0; i < coords.length; i++) {
                    const coodArr = coords[i];
                    // ctx.globalCompositeOperation = "darken";
                    ctx.drawImage(imageObj3, coodArr[1], coodArr[0], coodArr[3] - coodArr[1], coodArr[2] - coodArr[0]);
                    // ctx.globalCompositeOperation = "xor";
                    ctx.drawImage(imageObj2, coodArr[1], coodArr[0], coodArr[3] - coodArr[1], coodArr[2] - coodArr[0]);
                }
            }
        };
    }

    drawAllImages($('#window_src').val());

    $('a.window-btn').on('click', function (e) {
        e.preventDefault();
        var windowSrc = $(this).attr("data-id");
        drawAllImages("/static/images/windows/" + windowSrc);
    });
});
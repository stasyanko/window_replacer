$(document).ready(function () {
    $('#blogCarousel').carousel({
        interval: 3600000
    });

    // var c = document.getElementById("canvas1");
    // var ctx = c.getContext("2d");
    var coords = JSON.parse($('#coords').val());

    // function drawAllImages(windowSrc) {
    //     console.log(windowSrc);
    //     ctx.clearRect(0, 0, c.width, c.height);

    //     var imageObj1 = new Image();
    //     var imageObj2 = new Image();
    //     var imageObj3 = new Image();

    //     imageObj1.src = $('#img_src').val();
    //     imageObj3.src = $('#glass_src').val();

    //     imageObj1.onload = function () {
    //         ctx.drawImage(imageObj1, 0, 0);
    //         imageObj2.src = windowSrc;
    //         imageObj2.onload = function () {
    //             for (let i = 0; i < coords.length; i++) {
    //                 const coodArr = coords[i];

    //                 // ctx.translate(coodArr[1] / 2, coodArr[0] / 2);
    //                 ctx.rotate(-20 + Math.PI / 2.0);
    //                 // ctx.translate(-coodArr[1] / 2, -coodArr[0] / 2);
    //                 // ctx.globalCompositeOperation = "darken";
    //                 // ctx.drawImage(imageObj3, coodArr[1], coodArr[0], coodArr[3] - coodArr[1], coodArr[2] - coodArr[0]);
    //                 // ctx.globalCompositeOperation = "xor";
    //                 ctx.drawImage(imageObj2, coodArr[1], coodArr[0], coodArr[3] - coodArr[1], coodArr[2] - coodArr[0]);

    //                 // ctx.restore();
    //             }
    //         }
    //     };
    // }

    // drawAllImages($('#window_src').val());

    // $('a.window-btn').on('click', function (e) {
    //     e.preventDefault();
    //     var windowSrc = $(this).attr("data-id");
    //     drawAllImages("/static/images/windows/" + windowSrc);
    // });

    // var raster = new paper.Raster($('#img_src').val());
    // var loaded = false;

    // raster.on('load', function (res) {
    //     console.log(res['event']['path'][0]['height']);
    //     loaded = true;
    //     paper.view.viewSize.width = res['event']['path'][0]['width'];
    //     paper.view.viewSize.height = res['event']['path'][0]['height'];
    //     raster.position = paper.view.center;

    //     var windowImage = new Raster($('#glass_src').val());
    //     for (let i = 0; i < coords.length; i++) {
    //         const coodArr = coords[i];
    //         // ctx.drawImage(imageObj2, coodArr[1], coodArr[0], coodArr[3] - coodArr[1], coodArr[2] - coodArr[0]);

    //         // Move the raster to the center of the view
    //         windowImage.position = new Point(coodArr[0], coodArr[3]);

    //         // Scale the raster by 50%
    //         windowImage.width = coodArr[3] - coodArr[1];
    //         windowImage.height = coodArr[2] - coodArr[0];
    //         debugger;
    //         break;
    //         // Rotate the raster by 45 degrees:
    //         // windowImage.rotate(45);
    //     }
    // });



    function drawAllImages(windowSrc) {
        Konva.Image.fromURL($('#img_src').val(), function (houseObj) {
            var ctxWidth = houseObj.attrs.image.width;
            var ctxHeight = houseObj.attrs.image.height;

            var stage = new Konva.Stage({
                container: 'ctx-container',
                width: ctxWidth,
                height: ctxHeight
            });

            var layer = new Konva.Layer();
            stage.add(layer);
            layer.add(houseObj);
            layer.batchDraw();

            for (let i = 0; i < coords.length; i++) {
                const coodArr = coords[i];

                Konva.Image.fromURL($('#glass_src').val(), function (glassObj) {
                    var opts = {
                        x: coodArr[1],
                        y: coodArr[0],
                        width: coodArr[3] - coodArr[1],
                        height: coodArr[2] - coodArr[0]
                    };

                    glassObj.setAttrs(opts);
                    layer.add(glassObj);
                    layer.batchDraw();

                    Konva.Image.fromURL(windowSrc, function (windowObj) {
                        windowObj.setAttrs(opts);
                        layer.add(windowObj);
                        layer.batchDraw();
                    });
                });
            }
        });
    }

    var windowSrc = $('#window_src').val();
    drawAllImages(windowSrc);

    $('a.window-btn').on('click', function (e) {
        e.preventDefault();
        var windowSrc = $(this).attr("data-id");
        drawAllImages("/static/images/windows/" + windowSrc);
    });
});
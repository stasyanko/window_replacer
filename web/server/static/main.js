$(document).ready(function () {
    $('#blogCarousel').carousel({
        interval: 3600000
    });

    var coords = JSON.parse($('#coords').val());

    function drawAllImages(windowSrc) {
        Konva.Image.fromURL($('#img_src').val(), function (houseObj) {
            var ctxWidth = houseObj.attrs.image.width;
            var ctxHeight = houseObj.attrs.image.height;

            var stage = new Konva.Stage({
                container: 'ctx-container',
                width: ctxWidth,
                height: ctxHeight
            });
            stage.on('click tap', function (e) {
                // if click on empty area - remove all transformers
                if (e.target === stage) {
                    stage.find('Transformer').destroy();
                    layer.draw();
                    return;
                }
                // remove old transformers
                // TODO: we can skip it if current rect is already selected
                stage.find('Transformer').destroy();

                // create new transformer
                var tr = new Konva.Transformer();
                layer.add(tr);
                tr.attachTo(e.target);
                layer.draw();
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
                        height: coodArr[2] - coodArr[0],
                        draggable: true
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
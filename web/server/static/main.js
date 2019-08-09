$(document).ready(function () {
    $('#blogCarousel').carousel({
        interval: 3600000
    });

    var coords = JSON.parse($('#coords').val());

    function updateObjData(node) {
        var lines = [
            'x: ' + node.x(),
            'y: ' + node.y(),
            'rotation: ' + node.rotation(),
            'width: ' + node.width(),
            'height: ' + node.height(),
            'scaleX: ' + node.scaleX(),
            'scaleY: ' + node.scaleY()
        ];
        console.log(lines.join('\n'), node);
    }

    var windowSrcObj = {
        old: null,
        new: $('base').attr('href') + $('#window_src').val(),
    };

    function drawAllImages() {
        Konva.Image.fromURL($('#img_src').val(), function (houseObj) {
            var ctxWidth = houseObj.attrs.image.width;
            var ctxHeight = houseObj.attrs.image.height;

            var stage = new Konva.Stage({
                container: 'ctx-container',
                width: ctxWidth,
                height: ctxHeight
            });

            stage.on('click tap', function (e) {
                // console.log(windowSrc, e.target['attrs']['image']['currentSrc']);

                // if click on empty area - remove all transformers
                if (e.target['attrs']['image']['currentSrc'] === windowSrcObj['new']) {
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

            $('a.window-btn').on('click', function (e) {
                e.preventDefault();
                //TODO: перебрать все объекты image кроме stage
                //TODO: и заменить src
                // windowSrcObj['old'] = windowSrcObj['new'];
                let c = $('base').attr('href') + "/static/images/windows/" + $(this).attr("data-id");
                // drawAllImages();

                var a = layer.getChildren()[3];
                let b = a.clone();
                b['image']['currentSrc'] = c;

                layer.add(b);
                layer.batchDraw();
                console.log(a['image']['currentSrc'], b['image']['currentSrc']);
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

                    Konva.Image.fromURL(windowSrcObj['new'], function (windowObj) {
                        windowObj.setAttrs(opts);
                        layer.add(windowObj);
                        layer.batchDraw();

                        windowObj.on('transform', function () {
                            updateObjData(windowObj);
                        });
                    });
                });
            }
        });
    }

    drawAllImages();
});
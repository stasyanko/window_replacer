import React from "react";
import { render } from "react-dom";
import { Stage, Layer, Image, Transformer } from "react-konva";
import useImage from 'use-image';

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    const [image] = useImage(shapeProps.url);


    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.setNode(shapeRef.current);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <Image
                image={image}
                onClick={onSelect}
                ref={shapeRef}
                {...shapeProps}
                onDragEnd={e => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y()
                    });
                }}
                onTransformEnd={e => {
                    // transformer is changing scale
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        width: node.width() * scaleX,
                        height: node.height() * scaleY
                    });
                }}
            />
            {isSelected && <Transformer ref={trRef} />}
        </React.Fragment>
    );
};

const initialRectangles = window._shared_data.coords.map((coodArr, i) => {
    return {
        x: coodArr[1],
        y: coodArr[0],
        width: coodArr[3] - coodArr[1],
        height: coodArr[2] - coodArr[0],
        fill: "red",
        id: "rect" + i + 1,
        draggable: true
    };
});


const Canvas2 = () => {
    const [rectangles, setRectangles] = React.useState(initialRectangles);
    const [selectedId, selectShape] = React.useState(null);
    const [windowUrl, setWindowUrl] = React.useState('https://konvajs.org/assets/lion.png');


    React.useEffect(() => {
        setTimeout(() => {
            setWindowUrl('http://127.0.0.1:5000/static/images/windows/window_PNG17641.png');
        }, 3000);
    });

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={e => {
                // deselect when clicked on empty area
                const clickedOnEmpty = e.target === e.target.getStage();
                if (clickedOnEmpty) {
                    selectShape(null);
                }
            }}
        >
            <Layer>
                <Rectangle
                    shapeProps={{
                        x: 0,
                        y: 0,
                        id: "1",
                        url: window._shared_data.house_img
                    }}
                />
            </Layer>
            <Layer>
                {rectangles.map((rect, i) => {
                    rect['url'] = windowUrl;

                    return (
                        <Rectangle
                            key={i}
                            shapeProps={rect}
                            isSelected={rect.id === selectedId}
                            onSelect={() => {
                                selectShape(rect.id);
                            }}
                            onChange={newAttrs => {
                                const rects = rectangles.slice();
                                rects[i] = newAttrs;
                                setRectangles(rects);
                            }}
                        />
                    );
                })}
            </Layer>
        </Stage>
    );
};

export default Canvas2;
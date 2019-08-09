import React, { Component } from 'react';
import Konva from 'konva';
import { Stage, Layer, Star, Text, Image } from 'react-konva';
import useImage from 'use-image';

const LionImage = () => {
    const [image] = useImage('https://konvajs.org/assets/lion.png');
    return <Image image={image} />;
};

class URLImage extends Component {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.setNode(shapeRef.current);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

constructor(props) {
    super(props);

    this.state = {
        image: null
    };
}

componentDidMount() {
    this.loadImage();
}

componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
        this.loadImage();
    }
}

componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
}

loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', () => {
        this.handleLoad();
    });
}

handleLoad() {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
        image: this.image
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
};

render() {
    console.log(123, this.state.image);
    return (
        <React.Fragment>
            <Image
                x={this.props.x}
                y={this.props.y}
                height={this.props.h || undefined}
                width={this.props.w || undefined}
                image={this.state.image}
                ref={node => {
                    this.imageNode = node;
                }}
                draggable={this.props.draggable}
                onClick={this.props.onClick}
            />
            {isSelected && <Transformer ref={trRef} />}
        </React.Fragment>
    );
}
}

export default class Canvas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            window_img: window['_shared_data']['window_img'],
            selected_id: null,
            select_shape: null,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                window_img: '/static/images/windows/window_PNG17639.png'
            });
        }, 3000);
    }

    render() {
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
                    <URLImage
                        src={window['_shared_data']['house_img']}
                        x={0}
                        y={0}
                        onClick={() => { }}
                    />
                    <URLImage
                        src={this.state.window_img}
                        x={110}
                        y={110}
                        h={30}
                        w={30}
                        draggable={true}
                        onClick={() => {
                            alert(123213);
                        }}
                    />
                </Layer>
            </Stage>
        );
    }
}
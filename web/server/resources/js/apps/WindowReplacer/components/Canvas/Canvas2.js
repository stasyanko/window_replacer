import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Image, Transformer } from "react-konva";

export default class Canvas2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null
        };
    }

    componentDidMount() {
        const image = new window.Image();
        image.onload = () => {
            this.setState({
                image: image
            }, () => {
                this.transformer.attachTo(this.image);
            });
        };
        image.src = "https://konvajs.github.io/assets/yoda.jpg";

        setTimeout(() => {
            const image2 = new window.Image();
            image2.onload = () => {
                this.setState({
                    image: image2
                }, () => {
                    this.transformer.attachTo(this.image);
                });
            };
            image2.src = "http://127.0.0.1:5000/static/images/windows/window_PNG17652.png";
        }, 3000);
    }

    handleTransform() {
        const props = {
            x: this.image.x(),
            y: this.image.y(),
            rotatio: this.image.rotation(),
            width: this.image.width(),
            height: this.image.height(),
            scaleX: this.image.scaleX(),
            scaleY: this.image.scaleY()
        };
        console.log(props);
    };
    render() {
        return (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Image
                        image={this.state.image}
                        ref={node => {
                            this.image = node;
                        }}
                        draggable
                        onTransform={this.handleTransform}
                        onDragMove={this.handleTransform}
                        width={300}
                        height={300}
                    />
                    <Transformer
                        ref={node => {
                            this.transformer = node;
                        }}
                    />
                </Layer>
            </Stage>
        );
    }
}

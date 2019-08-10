import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Canvas from './Canvas/Canvas';
import WindowCarousel from './WindowCarousel/WindowCarousel';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.setCurWindowUrl = this.setCurWindowUrl.bind(this);
        this.state = {
            windowUrl: '/static/images/windows/window_PNG17641.png',
            rectangles: window._shared_data.coords.map((coodArr, i) => {
                return {
                    x: coodArr[1],
                    y: coodArr[0],
                    width: coodArr[3] - coodArr[1],
                    height: coodArr[2] - coodArr[0],
                    id: "rect" + i + 1,
                    draggable: true
                };
            }),
        };
    }

    setCurWindowUrl(windowUrl) {
        this.setState({
            windowUrl: '/static/images/windows/' + windowUrl
        });
    }

    addNewWindow() {
        const oldRectangles = this.state.rectangles.slice();
        let newRect = Object.assign({}, oldRectangles[0]);
        newRect['x'] = 0;
        newRect['y'] = 0;
        newRect['id'] = newRect['id'] + 1;
        oldRectangles.push(newRect);
        this.setState({
            rectangles: oldRectangles
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-8">
                    <Canvas
                        windowUrl={this.state.windowUrl}
                        rectangles={this.state.rectangles}
                        setRectangles={(rects) => this.setState({ rectangles: rects })}
                    />
                </div>
                <div className="col-md-4">
                    <p>Press on a window to rotate it or change its scale.</p>
                    <button type="button" className="btn btn-primary" onClick={() => this.addNewWindow()}> New window</button>
                    <br /><br />
                    <WindowCarousel setCurWindowUrl={this.setCurWindowUrl} />
                </div>
            </React.Fragment>
        );
    }
}

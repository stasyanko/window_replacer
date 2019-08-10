import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Canvas from './Canvas/Canvas';
import WindowCarousel from './WindowCarousel/WindowCarousel';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.setCurWindowUrl = this.setCurWindowUrl.bind(this);
        this.state = {
            windowUrl: '/static/images/windows/window_PNG17641.png'
        };
    }

    setCurWindowUrl(windowUrl) {
        this.setState({
            windowUrl: '/static/images/windows/' + windowUrl
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-8">
                    <Canvas windowUrl={this.state.windowUrl} />
                </div>
                <div className="col-md-4">
                    <WindowCarousel setCurWindowUrl={this.setCurWindowUrl} />
                </div>
            </React.Fragment>
        );
    }
}

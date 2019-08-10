import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Canvas from './Canvas/Canvas';
import WindowCarousel from './WindowCarousel/WindowCarousel';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-8">
                    <Canvas />
                </div>
                <div className="col-md-4">
                    <WindowCarousel />
                </div>
            </React.Fragment>
        );
    }
}

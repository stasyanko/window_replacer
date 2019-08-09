import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// import Canvas from './Canvas/Canvas';
import Canvas2 from './Canvas/Canvas2';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Canvas2 />
            </React.Fragment>
        );
    }
}

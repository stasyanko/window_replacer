import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import App from './components/App';

if (document.getElementById('react-root-window-replacer')) {
    ReactDOM.render(<App />, document.getElementById('react-root-window-replacer'));
}

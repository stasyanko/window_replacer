import React from "react";
import { render } from "react-dom";
import useImage from 'use-image';

const WindowCarousel = ({ setCurWindowUrl }) => {

    const windows = window._shared_data.windows.map((windowTitle, i) => {
        const imgSrc = "static/images/windows/" + windowTitle;
        return <div className="col-md-3">
            <a href="#" className="window-btn" key={windowTitle} onClick={(e) => {
                e.preventDefault();
                setCurWindowUrl(windowTitle);
            }}>
                <img src={imgSrc}
                    alt="Image" style={{ maxWidth: '100%' }} />
            </a>
        </div>
    });
    const noRows = Math.round(windows.length / 4);
    const [readyWindows, setWindows] = React.useState(windows);

    const readyWindowsWithRows = Array.from(Array(noRows)).map((n, i) => {
        let cssClass = "carousel-item";
        if (i === 0) {
            cssClass += " active";
        }

        return <div className={cssClass} key={i}>
            <div className="row">
                {readyWindows.slice(i * 4, (i + 1) * 4)}
            </div>
        </div>;
    });
    const indicators = Array.from(Array(noRows)).map((n, i) => {
        return <li data-target="#windowsCarousel" data-slide-to={i} className="active"></li>;
    });

    return (
        <React.Fragment>
            <p>Press no a window to rotate it or change its scale.</p>
            <button type="button" className="btn btn-primary">New window</button>

            <br /><br />

            <div className="window-carousel">
                <div id="windowsCarousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        {indicators}
                    </ol>

                    <div className=" carousel-inner">
                        {readyWindowsWithRows}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default WindowCarousel;
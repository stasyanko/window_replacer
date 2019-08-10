import React from "react";
import { render } from "react-dom";
import useImage from 'use-image';

const windows = window._shared_data.windows.map((windowTitle, i) => {
    const imgSrc = "static/images/windows/" + windowTitle;
    return <div className="col-md-3">
        <a href="#" className="window-btn" key={windowTitle}>
            <img src={imgSrc}
                alt="Image" style={{ maxWidth: '100%' }} />
        </a>
    </div>
});
const numOfCols = Math.round(windows.length / 4);

const WindowCarousel = () => {
    const [readyWindows, setWindows] = React.useState(windows);

    //     const readyWindows = windows.map((windowUrl, i) => {
    //         return (
    //             <div className="col-md-3">
    //                 <a href="#" className="window-btn" id="{{window}}" dataId="{{window}}">
    //                     <img src="{{ url_for('static', filename='images/windows/' + window) }}"
    //                         alt="Image" style="max-width:100%;">
    //             </a>
    //         </div>
    //                 {% if loop.index % 4 == 0 %}
    //     </div>
    // </div >

    //     <div className="carousel-item">
    //         <div className="row">
    //             {% endif %}
    //             );
    //         });

    return (
        <React.Fragment>
            <p>Press no a window to rotate it or change its scale.</p>
            <button type="button" className="btn btn-primary">New window</button>

            <br /><br />

            <div className="window-carousel">
                <div id="windowsCarousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        {/* {% for index in slider_btn_range %} */}
                        <li data-target="#windowsCarousel" data-slide-to="" className="active"></li>
                        {/* {% endfor %} */}
                    </ol>

                    <div className=" carousel-inner">
                        <div className="carousel-item active">
                            <div className="row">
                                {readyWindows}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default WindowCarousel;
import React, { Component } from 'react';
import WithLayout from '../../components/WithLayout';
// import './stype.css';

class index extends Component {
    render() {
        return (
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img className="d-block w-100" src="http://diamondcreative.net/plus-v1.1/img/slider/slider_03.jpg" alt="First slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>New Collection touch of Chania</h3>
                            <p>The atmosphere in Chania has a touch<br /> of Florence and Venice.</p>
                            <button className="btn btn-danger">READ MORE</button>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="http://diamondcreative.net/plus-v1.1/img/slider/slider_03.jpg" alt="First slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>New Collection touch of Chania</h3>
                            <p>The atmosphere in Chania has a touch<br /> of Florence and Venice.</p>
                            <button className="btn btn-danger">READ MORE</button>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}

export default WithLayout(index)
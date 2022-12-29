import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Specialty.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {

    render() {
        let settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };
        return (
            <div className='section'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='header-title'>Chuyen kho pho bien</span>
                        <button className='header-button'>Xem them</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='section-child'>
                                <div className='section-img'></div>
                                <div className='section-descript'>Co xuong khop 1</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img'></div>
                                <div className='section-descript'>Co xuong khop 2</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img'></div>
                                <div className='section-descript'>Co xuong khop 3</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img'></div>
                                <div className='section-descript'>Co xuong khop 4</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img'></div>
                                <div className='section-descript'>Co xuong khop 5</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img'></div>
                                <div className='section-descript'>Co xuong khop 6</div>
                            </div>
                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);

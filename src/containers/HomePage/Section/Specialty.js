import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick"

class Specialty extends Component {

    render() {
        return (
            <div className='section section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='header-title'>Chuyên khoa phổ biến</span>
                        <button className='header-button'>xem them</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-child'>
                                <div className='section-img section-specialty'></div>
                                <div className='section-descript'>Co xuong khop 1</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img section-specialty'></div>
                                <div className='section-descript'>Co xuong khop 2</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img section-specialty'></div>
                                <div className='section-descript'>Co xuong khop 3</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img section-specialty'></div>
                                <div className='section-descript'>Co xuong khop 4</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img section-specialty'></div>
                                <div className='section-descript'>Co xuong khop 5</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img section-specialty'></div>
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

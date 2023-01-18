import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick";

class Facility extends Component {

    render() {
        return (
            <div className='section section-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='header-title'>Cơ sở y tế nổi bật</span>
                        <button className='header-button'>xem them</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-child'>
                                <div className='section-img section-facility'></div>
                                <div className='section-descript'>Bệnh viện Chợ Rẫy 1</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img section-facility'></div>
                                <div className='section-descript'>Bệnh viện Chợ Rẫy 2</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img section-facility'></div>
                                <div className='section-descript'>Bệnh viện Chợ Rẫy 3</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img section-facility'></div>
                                <div className='section-descript'>Bệnh viện Chợ Rẫy 4</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img section-facility'></div>
                                <div className='section-descript'>Bệnh viện Chợ Rẫy 5</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img section-facility'></div>
                                <div className='section-descript'>Bệnh viện Chợ Rẫy 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Facility);

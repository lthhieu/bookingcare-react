import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

class Handbook extends Component {

    render() {
        let settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1
        }
        return (
            <div className='section section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='header-title'>Cẩm nang</span>
                        <button className='header-button'>tất cả bài viết</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='section-child'>
                                <div className='section-img section-handbook left-cus'></div>
                                <div className='section-descript right-cus'>6 bác sĩ siêu âm thai giỏi tại phòng khám tư ở Hà Nội 1</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img section-handbook left-cus'></div>
                                <div className='section-descript right-cus'>6 bác sĩ siêu âm thai giỏi tại phòng khám tư ở Hà Nội 2</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img section-handbook left-cus'></div>
                                <div className='section-descript right-cus'>6 bác sĩ siêu âm thai giỏi tại phòng khám tư ở Hà Nội 3</div>
                            </div>
                            <div className='section-child'>
                                <div className='section-img section-handbook left-cus'></div>
                                <div className='section-descript right-cus'>6 bác sĩ siêu âm thai giỏi tại phòng khám tư ở Hà Nội 4</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);

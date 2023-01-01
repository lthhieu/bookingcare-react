import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";

class Doctor extends Component {

    render() {
        return (
            <div className='section section-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='header-title'>Bác sĩ nổi bật tuần qua</span>
                        <button className='header-button'>xem them</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-child'>
                                <div className='border-custom'>
                                    <div className='outer-img'>
                                        <div className='section-img section-doctor'></div>
                                    </div>
                                    <div className='section-descript custom-descript'>
                                        <div>Phó giáo sư, Tiến sĩ, Bác sĩ cao cấp Lý Trần Hoàng Hiếu</div>
                                        <div>Cơ Xương Khớp</div>
                                    </div>
                                </div>

                            </div>
                            <div className='section-child'>
                                <div className='border-custom'>
                                    <div className='outer-img'>
                                        <div className='section-img section-doctor'></div>
                                    </div>
                                    <div className='section-descript custom-descript'>
                                        <div>Phó giáo sư, Tiến sĩ, Bác sĩ cao cấp Lý Trần Hoàng Hiếu</div>
                                        <div>Cơ Xương Khớp</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-child'>
                                <div className='border-custom'>
                                    <div className='outer-img'>
                                        <div className='section-img section-doctor'></div>
                                    </div>
                                    <div className='section-descript custom-descript'>
                                        <div>Phó giáo sư, Tiến sĩ, Bác sĩ cao cấp Lý Trần Hoàng Hiếu</div>
                                        <div>Cơ Xương Khớp</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-child'>
                                <div className='border-custom'>
                                    <div className='outer-img'>
                                        <div className='section-img section-doctor'></div>
                                    </div>
                                    <div className='section-descript custom-descript'>
                                        <div>Phó giáo sư, Tiến sĩ, Bác sĩ cao cấp Lý Trần Hoàng Hiếu</div>
                                        <div>Cơ Xương Khớp</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-child'>
                                <div className='border-custom'>
                                    <div className='outer-img'>
                                        <div className='section-img section-doctor'></div>
                                    </div>
                                    <div className='section-descript custom-descript'>
                                        <div>Phó giáo sư, Tiến sĩ, Bác sĩ cao cấp Lý Trần Hoàng Hiếu</div>
                                        <div>Cơ Xương Khớp</div>
                                    </div>
                                </div>
                            </div>
                            <div className='section-child'>
                                <div className='border-custom'>
                                    <div className='outer-img'>
                                        <div className='section-img section-doctor'></div>
                                    </div>
                                    <div className='section-descript custom-descript'>
                                        <div>Phó giáo sư, Tiến sĩ, Bác sĩ cao cấp Lý Trần Hoàng Hiếu</div>
                                        <div>Cơ Xương Khớp</div>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);

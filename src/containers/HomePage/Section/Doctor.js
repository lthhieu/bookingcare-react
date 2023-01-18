import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import * as utils from '../../../utils'
import { withRouter } from 'react-router';

class Doctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            doctors: []
        }
    }
    componentDidUpdate(prevProps, prevState) {
        let { doctorsRedux } = this.props
        if (doctorsRedux != prevProps.doctorsRedux) {
            this.setState({
                doctors: doctorsRedux
            })
        }

    }
    componentDidMount() {
        this.props.fetchDoctorHomeStart()
    }
    handleClickDetailDoctor = (id) => {
        this.props.history.push(`/doctor/${id}`)

    }
    render() {
        let { doctors } = this.state
        let { language } = this.props
        return (
            <div className='section section-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='header-title'><FormattedMessage id='sections.doctors' /></span>
                        <button className='header-button'><FormattedMessage id='sections.button' /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {doctors && doctors.length > 0 &&
                                doctors.map((item, index) => {
                                    let objectUrl = '', imageBase64 = ''
                                    if (item.image.data.length !== 0) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('ascii')
                                        let blob = utils.CommonUtils.b64toBlob(imageBase64)
                                        objectUrl = URL.createObjectURL(blob)
                                    } else {
                                        objectUrl = ''
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.fNameVi} ${item.lNameVi}`
                                    let nameEn = `${item.positionData.valueEn}, ${item.fNameEn} ${item.lNameEn}`
                                    return (
                                        <div onClick={() => this.handleClickDetailDoctor(item.id)} className='section-child' key={index}>
                                            <div className='border-custom'>
                                                <div className='outer-img'>
                                                    <div style={{ backgroundImage: `url(${objectUrl})` }} className='section-img section-doctor'></div>
                                                </div>
                                                <div className='section-descript custom-descript'>
                                                    <div>{language === utils.LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div className='sub-specialty-cus'>Cơ Xương Khớp</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        doctorsRedux: state.homepage.doctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorHomeStart: () => dispatch(actions.fetchDoctorHomeStart())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor))

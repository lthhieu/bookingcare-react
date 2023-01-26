import React, { Component } from 'react'
import { connect } from "react-redux"
import Header from '../../HomePage/Header';
import Footer from '../../HomePage/Footer'
import * as actions from '../../../store/actions'
import * as utils from '../../../utils'
import Schedule from './Schedule';
import DoctorInfo from './DoctorInfo';
import DoctorProfile from './DoctorProfile';

class DoctorDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailVi: '',
            detailEn: '',
            showName: false,
            doctorId: '',
            nameVi: '',
            nameEn: ''
        }
    }
    async componentDidMount() {
        window.addEventListener('scroll', this.scrollFunction)
        let { match, fetchDoctorDetailStart, getNameDoctorsStart } = this.props
        if (match && match.params && match.params.id) {
            this.setState({ doctorId: match.params.id })
            await fetchDoctorDetailStart(match.params.id)
            await getNameDoctorsStart(match.params.id)
        }
    }
    scrollFunction = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            this.setState({ showName: true })
        } else {
            this.setState({ showName: false })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        let { doctorDetail, nameDoctors } = this.props
        if (prevProps.doctorDetail !== doctorDetail) {
            this.setState({
                detailVi: doctorDetail.contentHtmlVi,
                detailEn: doctorDetail.contentHtmlEn
            })
        }
        if (prevProps.nameDoctors !== nameDoctors) {
            this.setState({
                nameVi: nameDoctors.fNameVi + ' ' + nameDoctors.lNameVi,
                nameEn: nameDoctors.fNameEn + ' ' + nameDoctors.lNameEn
            })
        }
    }
    render() {
        console.log(this.props)
        let { detailVi, detailEn, showName, doctorId, nameVi, nameEn } = this.state
        let { language } = this.props
        return (
            <>
                <Header
                    showName={showName}
                    nameVi={nameVi}
                    nameEn={nameEn}
                />
                <div className='doctor-detail-info-container'>
                    {/* <div className='doctor-description'>
                        <div style={{ backgroundImage: `url(${imageURL})` }} className='content-left'></div>
                        <div className='content-right'>
                            <div className='doctor-name'>
                                {language === utils.LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='doctor-info'>
                                {language === utils.LANGUAGES.VI ? <div dangerouslySetInnerHTML={{ __html: descriptionVi }}></div> : <div dangerouslySetInnerHTML={{ __html: descriptionEn }}></div>}
                            </div>
                        </div>
                    </div> */}
                    <DoctorProfile
                        isShowDescript={true}
                        doctorId={doctorId} />
                    <div className='doctor-schedule'>
                        <div className='left'>
                            <Schedule
                                doctorId={doctorId} />
                        </div>
                        <div className='right'>
                            <DoctorInfo doctorId={doctorId} />
                        </div>

                    </div>
                    <div className='doctor-detail-info'>
                        {language === utils.LANGUAGES.VI ? <div dangerouslySetInnerHTML={{ __html: detailVi }}></div> : <div dangerouslySetInnerHTML={{ __html: detailEn }}></div>}
                    </div>
                    <div className='doctor-comment'></div>
                </div>
                <Footer />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        nameDoctors: state.doctor.nameDoctors,
        doctorDetail: state.doctor.doctorDetail,
        language: state.app.language
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getNameDoctorsStart: (id) => dispatch(actions.getNameDoctorsStart(id)),
        fetchDoctorDetailStart: (doctorId) => dispatch(actions.fetchDoctorDetailStart(doctorId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);

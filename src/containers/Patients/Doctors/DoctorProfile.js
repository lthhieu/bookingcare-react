import React, { Component } from 'react'
import { connect } from "react-redux"
import { FormattedMessage } from 'react-intl'
import * as actions from '../../../store/actions'
import * as utils from '../../../utils'
import _ from 'lodash'
import moment from 'moment/moment'
import DoctorInfo from './DoctorInfo'
import * as services from '../../../services'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router'
class DoctorProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fNameVi: '', fNameEn: '', lNameVi: '', lNameEn: '', descriptionVi: '', descriptionEn: '', imageURL: '', positionVi: '', positionEn: '',
            timeVi: '', timeEn: '', locationVi: '', locationEn: ''
        }
    }
    async componentDidMount() {
        let { fetchDoctorProfileStart, doctorId } = this.props
        if (doctorId) {
            let res = await services.fetchDoctorProfileService(doctorId)
            if (res && res.errCode === '0') {
                let { fNameVi, fNameEn, lNameVi, lNameEn } = res.data
                //image
                let imageBase64 = '', objectUrl = ''
                if (res.data.image && res.data.image.data.length === 0) {
                    imageBase64 = ''
                    objectUrl = ''
                } else {
                    imageBase64 = Buffer.from(res.data.image, 'base64').toString('ascii')
                    let blob = utils.CommonUtils.b64toBlob(imageBase64)
                    objectUrl = URL.createObjectURL(blob)
                }
                //position
                if (res.data.positionData && !_.isEmpty(res.data.positionData)) {
                    let positions = res.data.positionData
                    this.setState({
                        positionVi: positions.valueVi,
                        positionEn: positions.valueEn
                    })
                }
                // description
                if (res.data.userPostData && !_.isEmpty(res.data.userPostData)) {
                    let descripts = res.data.userPostData
                    this.setState({
                        descriptionVi: descripts.descriptionVi.split('\n').join('</br>'),
                        descriptionEn: descripts.descriptionEn.split('\n').join('</br>')
                    })
                }
                // location
                if (res.data.doctorInfoData && !_.isEmpty(res.data.doctorInfoData)) {
                    let location = res.data.doctorInfoData
                    this.setState({
                        locationVi: location.provinceData.valueVi,
                        locationEn: location.provinceData.valueEn
                    })
                }
                this.setState({
                    fNameVi, fNameEn, lNameVi, lNameEn,
                    imageURL: objectUrl
                })
            } else {
                toast.error('Something went wrong..')
            }
            //using redux
            // await fetchDoctorProfileStart(doctorId)
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        let { fetchDoctorProfileStart, doctorId, doctorProfile } = this.props
        if (prevProps.doctorId !== doctorId) {
            let res = await services.fetchDoctorProfileService(doctorId)
            if (res && res.errCode === '0') {
                let { fNameVi, fNameEn, lNameVi, lNameEn } = res.data
                //image
                let imageBase64 = '', objectUrl = ''
                if (res.data.image && res.data.image.data.length === 0) {
                    imageBase64 = ''
                    objectUrl = ''
                } else {
                    imageBase64 = Buffer.from(res.data.image, 'base64').toString('ascii')
                    let blob = utils.CommonUtils.b64toBlob(imageBase64)
                    objectUrl = URL.createObjectURL(blob)
                }
                //position
                if (res.data.positionData && !_.isEmpty(res.data.positionData)) {
                    let positions = res.data.positionData
                    this.setState({
                        positionVi: positions.valueVi,
                        positionEn: positions.valueEn
                    })
                }
                // //description
                if (res.data.userPostData && !_.isEmpty(res.data.userPostData)) {
                    let descripts = res.data.userPostData
                    this.setState({
                        descriptionVi: descripts.descriptionVi.split('\n').join('</br>'),
                        descriptionEn: descripts.descriptionEn.split('\n').join('</br>')
                    })
                }
                // location
                if (res.data.doctorInfoData && !_.isEmpty(res.data.doctorInfoData)) {
                    let location = res.data.doctorInfoData
                    this.setState({
                        locationVi: location.provinceData.valueVi,
                        locationEn: location.provinceData.valueEn
                    })
                }
                this.setState({
                    fNameVi, fNameEn, lNameVi, lNameEn,
                    imageURL: objectUrl
                })
            } else {
                toast.error('Something went wrong..')
            }
        }
        //using redux
        // if (prevProps.doctorProfile !== doctorProfile) {
        //     let { fNameVi, fNameEn, lNameVi, lNameEn } = doctorProfile
        //     //image
        //     let imageBase64 = '', objectUrl = ''
        //     if (doctorProfile.image && doctorProfile.image.data.length === 0) {
        //         imageBase64 = ''
        //         objectUrl = ''
        //     } else {
        //         imageBase64 = Buffer.from(doctorProfile.image, 'base64').toString('ascii')
        //         let blob = utils.CommonUtils.b64toBlob(imageBase64)
        //         objectUrl = URL.createObjectURL(blob)
        //     }
        //     //position
        //     if (doctorProfile.positionData && !_.isEmpty(doctorProfile.positionData)) {
        //         let positions = doctorProfile.positionData
        //         this.setState({
        //             positionVi: positions.valueVi,
        //             positionEn: positions.valueEn
        //         })
        //     }
        //     // //description
        //     if (doctorProfile.userPostData && !_.isEmpty(doctorProfile.userPostData))  {
        //         let descripts = doctorProfile.userPostData
        //         this.setState({
        //             descriptionVi: descripts.descriptionVi.split('\n').join('</br>'),
        //             descriptionEn: descripts.descriptionEn.split('\n').join('</br>')
        //         })
        //     }
        //     if (doctorProfile.doctorInfoData && !_.isEmpty(doctorProfile.doctorInfoData)) {
        //         let location = res.data.doctorInfoData
        //         this.setState({
        //             locationVi: location.provinceData.valueVi,
        //             locationEn: location.provinceData.valueEn
        //         })
        //     }
        //     this.setState({
        //         fNameVi, fNameEn, lNameVi, lNameEn,
        //         imageURL: objectUrl
        //     })
        // }
    }

    renderBookingTime = (dataModal) => {
        let { language, doctorId } = this.props
        if (dataModal && !_.isEmpty(dataModal)) {
            let dateMail = language === utils.LANGUAGES.VI ? moment(dataModal.date, utils.DATE_FORMAT.SEND_TO_SERVER).format(utils.DATE_FORMAT.DATE_IN_MODAL).toLowerCase().replace(/\b[a-z]/, function (letter) {
                return letter.toUpperCase();
            }) : moment(dataModal.date, utils.DATE_FORMAT.SEND_TO_SERVER).locale('en').format(utils.DATE_FORMAT.DATE_IN_MODAL)
            let timeMail = language === utils.LANGUAGES.VI ? dataModal.timeScheduleData.valueVi : dataModal.timeScheduleData.valueEn
            return (<div className='doctor-info'>

                <div>{timeMail}, {dateMail}</div>
                <DoctorInfo
                    modal={true}
                    doctorId={doctorId} />
            </div>)
        }
        return <></>
    }
    handleClickDoctorDetail = () => {
        let { history, doctorId } = this.props
        if (history) {
            history.push(`/doctor/${doctorId}`)
        }
    }

    render() {
        let { language, modal, isShowDescript, dataModal, specialty } = this.props
        let { fNameVi, fNameEn, lNameVi, lNameEn, descriptionVi, descriptionEn, imageURL, positionVi, positionEn, locationEn, locationVi } = this.state
        let doctorDescriptionClass = ''
        if (modal) {
            doctorDescriptionClass = 'in-modal doctor-description'
        } else {
            if (specialty) {
                doctorDescriptionClass = 'doctor-description in-specialty'
            } else {
                doctorDescriptionClass = 'doctor-description'
            }
        }
        let doctorNameClass = ''
        if (modal) {
            doctorNameClass = 'modal-name doctor-name'
        } else {
            if (specialty) {
                doctorNameClass = 'doctor-name in-specialty'
            } else {
                doctorNameClass = 'doctor-name'
            }
        }
        return (
            <div className={`${doctorDescriptionClass}`}>
                <div style={{ backgroundImage: `url(${imageURL})` }} className={specialty ? 'content-left in-specialty' : 'content-left'}>
                    {specialty && <div onClick={() => this.handleClickDoctorDetail()} className='see-more'><FormattedMessage id='sections.button' /></div>}
                </div>

                <div className={specialty ? 'content-right in-specialty' : 'content-right'}>
                    <div className={`${doctorNameClass}`}>
                        {language === utils.LANGUAGES.VI ? `${positionVi} ${fNameVi} ${lNameVi}` : `${positionEn} ${fNameEn} ${lNameEn}`}
                    </div>
                    {isShowDescript ? <>
                        <div className='doctor-info'>
                            {language === utils.LANGUAGES.VI ? <div dangerouslySetInnerHTML={{ __html: descriptionVi }}></div> : <div dangerouslySetInnerHTML={{ __html: descriptionEn }}></div>}
                        </div>
                        {specialty && <span className='color-location'><i className="fa-solid fa-location-dot"></i> {language === utils.LANGUAGES.VI ? locationVi : locationEn}</span>}</> :
                        <>{this.renderBookingTime(dataModal)}</>}

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        doctorProfile: state.doctor.doctorProfile,
        language: state.app.language
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorProfileStart: (id) => dispatch(actions.fetchDoctorProfileStart(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorProfile))

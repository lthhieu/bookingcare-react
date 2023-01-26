import React, { Component } from 'react'
import { connect } from "react-redux"
import { FormattedMessage } from 'react-intl'
import * as actions from '../../../store/actions'
import * as utils from '../../../utils'
import _ from 'lodash'
import moment from 'moment/moment'
import DoctorInfo from './DoctorInfo'
class DoctorProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fNameVi: '', fNameEn: '', lNameVi: '', lNameEn: '', descriptionVi: '', descriptionEn: '', imageURL: '', positionVi: '', positionEn: '',
            timeVi: '', timeEn: ''
        }
    }
    async componentDidMount() {
        let { fetchDoctorProfileStart, doctorId } = this.props
        if (doctorId) {
            await fetchDoctorProfileStart(doctorId)
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        let { fetchDoctorProfileStart, doctorId, doctorProfile } = this.props
        if (prevProps.doctorId !== doctorId) {
            await fetchDoctorProfileStart(doctorId)
        }
        if (prevProps.doctorProfile !== doctorProfile) {
            let { fNameVi, fNameEn, lNameVi, lNameEn } = doctorProfile
            //image
            let imageBase64 = '', objectUrl = ''
            if (doctorProfile.image && doctorProfile.image.data.length === 0) {
                imageBase64 = ''
                objectUrl = ''
            } else {
                imageBase64 = Buffer.from(doctorProfile.image, 'base64').toString('ascii')
                let blob = utils.CommonUtils.b64toBlob(imageBase64)
                objectUrl = URL.createObjectURL(blob)
            }
            //position
            if (doctorProfile.positionData) {
                let positions = doctorProfile.positionData
                this.setState({
                    positionVi: positions.valueVi,
                    positionEn: positions.valueEn
                })
            }
            // //description
            if (doctorProfile.userPostData) {
                let descripts = doctorProfile.userPostData
                this.setState({
                    descriptionVi: descripts.descriptionVi.split('\n').join('</br>'),
                    descriptionEn: descripts.descriptionEn.split('\n').join('</br>')
                })
            }
            this.setState({
                fNameVi, fNameEn, lNameVi, lNameEn,
                imageURL: objectUrl
            })
        }
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

    render() {
        let { language, modal, isShowDescript, dataModal } = this.props
        let { fNameVi, fNameEn, lNameVi, lNameEn, descriptionVi, descriptionEn, imageURL, positionVi, positionEn } = this.state

        return (
            <div className={modal ? 'in-modal doctor-description' : 'doctor-description'}>
                <div style={{ backgroundImage: `url(${imageURL})` }} className='content-left'></div>
                <div className='content-right'>
                    <div className={modal ? 'modal-name doctor-name' : 'doctor-name'}>
                        {language === utils.LANGUAGES.VI ? `${positionVi} ${fNameVi} ${lNameVi}` : `${positionEn} ${fNameEn} ${lNameEn}`}
                    </div>
                    {isShowDescript ?
                        <div className='doctor-info'>
                            {language === utils.LANGUAGES.VI ? <div dangerouslySetInnerHTML={{ __html: descriptionVi }}></div> : <div dangerouslySetInnerHTML={{ __html: descriptionEn }}></div>}
                        </div> :
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);

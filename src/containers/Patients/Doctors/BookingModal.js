import React, { Component } from 'react'
import { connect } from "react-redux"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import DoctorProfile from './DoctorProfile'
import DatePickerCustom from '../../../components/MyCustom/DatePickerCustom'
import * as utils from '../../../utils'
import moment from 'moment'
import * as actions from '../../../store/actions'
import _ from 'lodash'
import Swal from 'sweetalert2'
class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doctorId: null, fullName: '', email: '', address: '', phoneNo: '', genderId: '', reason: '', time: '', date: '',
            birthday: new Date(), genders: [],
            fullNameErr: '', emailErr: '', addressErr: '', phoneNoErr: '', reasonErr: '', birthdayErr: ''
        }
        this.listenEmitter()
    }
    listenEmitter = () => {
        utils.emitter.on('CLOSE MODAL', () => {
            this.handleOpenModal()
            let { language } = this.props
            if (language === utils.LANGUAGES.VI) {
                Swal.fire({
                    title: 'Đặt lịch hẹn thành công!',
                    text: 'Bạn vui lòng kiểm tra email để hoàn tất quá trình đặt lịch',
                    icon: 'success',
                    confirmButtonText: 'Đồng ý'
                })
            } else if (language === utils.LANGUAGES.EN) {
                Swal.fire({
                    title: 'Create an appointment successfully!',
                    text: 'Please check your email to complete the booking process',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }
        })
    }
    async componentDidMount() {
        let { fetchGenderStart } = this.props
        await fetchGenderStart()
    }
    async componentDidUpdate(prevProps, prevState) {
        let { doctorId, genders, dataModal } = this.props
        if (prevProps.doctorId !== doctorId) {
            this.setState({ doctorId })
        }
        if (prevProps.genders !== genders) {
            this.setState({
                genders,
                genderId: genders && genders.length > 0 ? genders[0].keyMap : ''
            })
        }
        if (prevProps.dataModal !== dataModal) {
            if (dataModal && !_.isEmpty(dataModal)) {
                this.setState({ time: dataModal.time, date: dataModal.date })
            }
        }
    }
    resetModal = () => {
        let { genders } = this.props
        this.setState({
            fullNameErr: '', emailErr: '', addressErr: '', phoneNoErr: '', reasonErr: '', birthdayErr: '',
            fullName: '', email: '', address: '', phoneNo: '', reason: '',
            birthday: new Date(), genderId: genders && genders.length > 0 ? genders[0].keyMap : ''
        })
    }
    resetError = () => {
        this.setState({
            fullNameErr: '', emailErr: '', addressErr: '', phoneNoErr: '', reasonErr: '', birthdayErr: ''
        })
    }
    handleOpenModal = () => {
        this.resetModal()
        this.props.handleOpenModal()
    }
    handleChangeInput = (e, key) => {
        let value = e.target.value
        let copyState = { ...this.state }
        copyState[key] = value
        this.setState({ ...copyState })
    }
    handleChangeDate = (date) => {
        this.setState({
            birthday: date
        })
    }
    renderGenders = (genders, genderId, language) => {
        return (
            <select value={genderId} onChange={(e) => this.handleChangeInput(e, 'genderId')} className="custom-select">
                {genders && genders.length > 0 ?
                    genders.map((item, index) => {
                        return (
                            <option key={index} value={item.keyMap}>{language === utils.LANGUAGES.EN ? item.valueEn : item.valueVi}</option>
                        )
                    }) : <option>Something went wrong..</option>}
            </select>
        )
    }
    validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true
        }
        return false
    }
    validatePhoneNo = (phone) => {
        if (/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(phone)) {
            return true
        }
        return false
    }
    validate = () => {
        let { fullName, email, address, phoneNo, reason, birthday } = this.state
        let isOk = true
        if (fullName === '') {
            this.setState({ fullNameErr: <FormattedMessage id='modal-booking.error1' /> })
            isOk = false
        }
        if (email === '') {
            this.setState({ emailErr: <FormattedMessage id='modal-booking.error4' /> })
            isOk = false
        }
        if (!this.validateEmail(email) && email !== '') {
            this.setState({ emailErr: <FormattedMessage id='modal-booking.error8' /> })
            isOk = false
        }
        if (address === '') {
            this.setState({ addressErr: <FormattedMessage id='modal-booking.error5' /> })
            isOk = false
        }
        if (phoneNo === '') {
            this.setState({ phoneNoErr: <FormattedMessage id='modal-booking.error2' /> })
            isOk = false
        }
        if (!this.validatePhoneNo(phoneNo) && phoneNo !== '') {
            this.setState({ phoneNoErr: <FormattedMessage id='modal-booking.error7' /> })
            isOk = false
        }
        if (reason === '') {
            this.setState({ reasonErr: <FormattedMessage id='modal-booking.error6' /> })
            isOk = false
        }
        if (birthday === null) {
            this.setState({ fullNameErr: <FormattedMessage id='modal-booking.error3' /> })
            isOk = false
        }
        return isOk
    }
    buildDateTimeBooking = (dataModal) => {
        let { language } = this.props
        if (dataModal && !_.isEmpty(dataModal)) {
            let dateMail = language === utils.LANGUAGES.VI ? moment(dataModal.date, utils.DATE_FORMAT.SEND_TO_SERVER).format(utils.DATE_FORMAT.DATE_IN_MODAL).toLowerCase().replace(/\b[a-z]/, function (letter) {
                return letter.toUpperCase();
            }) : moment(dataModal.date, utils.DATE_FORMAT.SEND_TO_SERVER).locale('en').format(utils.DATE_FORMAT.DATE_IN_MODAL)
            if (dataModal.timeScheduleData && !_.isEmpty(dataModal.timeScheduleData)) {
                let timeMail = language === utils.LANGUAGES.VI ? dataModal.timeScheduleData.valueVi : dataModal.timeScheduleData.valueEn
                return `${timeMail}, ${dateMail}`
            } else {
                return `${dateMail}`
            }
        }
        return ''
    }
    buildDoctorNameBooking = (dataModal) => {
        let { language } = this.props
        if (dataModal && !_.isEmpty(dataModal) && dataModal.userScheduleDoctorIdData && !_.isEmpty(dataModal.userScheduleDoctorIdData)) {
            let name = language === utils.LANGUAGES.VI ? `${dataModal.userScheduleDoctorIdData.fNameVi} ${dataModal.userScheduleDoctorIdData.lNameVi}` : `${dataModal.userScheduleDoctorIdData.fNameEn} ${dataModal.userScheduleDoctorIdData.lNameEn}`
            return name
        }
        return ''
    }
    buildPriceBooking = (dataModal) => {
        let { language } = this.props
        if (dataModal && !_.isEmpty(dataModal) && dataModal.userScheduleDoctorIdData && !_.isEmpty(dataModal.userScheduleDoctorIdData) && dataModal.userScheduleDoctorIdData.doctorInfoData && !_.isEmpty(dataModal.userScheduleDoctorIdData.doctorInfoData) && dataModal.userScheduleDoctorIdData.doctorInfoData.priceDoctorData && !_.isEmpty(dataModal.userScheduleDoctorIdData.doctorInfoData.priceDoctorData)) {
            let price = language === utils.LANGUAGES.VI ? `${dataModal.userScheduleDoctorIdData.doctorInfoData.priceDoctorData.valueVi} đồng` : `${dataModal.userScheduleDoctorIdData.doctorInfoData.priceDoctorData.valueEn} dong`
            return price
        }
        return ''
    }
    handleConfirm = () => {

        let { createAppointmentStart, language, dataModal } = this.props
        let { doctorId, fullName, email, address, phoneNo, genderId, reason, birthday, time, date } = this.state
        this.resetError()
        let dateTimeBooking = this.buildDateTimeBooking(dataModal)
        let nameBooking = this.buildDoctorNameBooking(dataModal)
        let priceBooking = this.buildPriceBooking(dataModal)
        let isValidate = this.validate()
        if (isValidate) {
            birthday = moment(birthday).format(utils.DATE_FORMAT.SEND_TO_SERVER)
            createAppointmentStart({
                priceBooking, nameBooking, date, dateTimeBooking, language, doctorId, fullName, email, address, phoneNo, genderId, reason, birthday, time
            })
        }
    }
    render() {

        let { doctorId, fullName, email, address, phoneNo, genderId, reason, birthday, genders, fullNameErr, emailErr, addressErr, phoneNoErr, reasonErr, birthdayErr } = this.state
        let { language, openModal, dataModal } = this.props
        return (
            <Modal isOpen={openModal} backdrop='static' keyboard={false} size='lg' >
                <ModalHeader toggle={() => this.handleOpenModal()}><FormattedMessage id='modal-booking.title' /></ModalHeader>
                <ModalBody>
                    <DoctorProfile
                        dataModal={dataModal}
                        isShowDescript={false}
                        modal={true}
                        doctorId={doctorId} />
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label><FormattedMessage id='modal-booking.text1' /></label>
                            <input value={fullName} onChange={(e) => this.handleChangeInput(e, 'fullName')} type="text" className="form-control" />
                            <span className='text-danger'>{fullNameErr}</span>
                        </div>
                        <div className="form-group col-md-6">
                            <label><FormattedMessage id='modal-booking.text2' /></label>
                            <input value={phoneNo} onChange={(e) => this.handleChangeInput(e, 'phoneNo')} type="text" className="form-control" />
                            <span className='text-danger'>{phoneNoErr}</span>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label><FormattedMessage id='modal-booking.text3' /></label>
                            <DatePickerCustom
                                selectedDate={birthday}
                                handleChangeDate={this.handleChangeDate}
                                language={language} />
                            <span className='text-danger'>{birthdayErr}</span>
                        </div>
                        <div className="form-group col-md-6">
                            <label><FormattedMessage id='modal-booking.text4' /></label>
                            {this.renderGenders(genders, genderId, language)}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label><FormattedMessage id='modal-booking.text5' /></label>
                            <input value={email} onChange={(e) => this.handleChangeInput(e, 'email')} type="text" className="form-control" />
                            <span className='text-danger'>{emailErr}</span>
                        </div>
                        <div className="form-group col-md-6">
                            <label><FormattedMessage id='modal-booking.text6' /></label>
                            <input value={address} onChange={(e) => this.handleChangeInput(e, 'address')} type="text" className="form-control" />
                            <span className='text-danger'>{addressErr}</span>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label><FormattedMessage id='modal-booking.text7' /></label>
                            <input value={reason} onChange={(e) => this.handleChangeInput(e, 'reason')} type="text" className="form-control" />
                            <span className='text-danger'>{reasonErr}</span>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleConfirm()}>
                        <FormattedMessage id='modal-booking.btn-1' />
                    </Button>{' '}
                    <Button color="secondary" onClick={() => this.handleOpenModal()}>
                        <FormattedMessage id='modal-booking.btn-2' />
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        genders: state.patient.genders,
        language: state.app.language
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createAppointmentStart: (data) => dispatch(actions.createAppointmentStart(data)),
        fetchGenderStart: () => dispatch(actions.fetchGenderStart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

import React, { Component } from 'react'
import { connect } from "react-redux"
import * as actions from '../../../store/actions'
import * as utils from '../../../utils'
import moment from 'moment'
import vi from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl'
import BookingModal from './BookingModal'
class Schedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            options: [],
            doctorSchedule: [],
            openModal: false,
            dataModal: {},
            doctorId: null
        }
    }
    componentDidMount() {
        let options = this.handleCreateDateOptions()
        this.setState({ options })
    }
    async componentDidUpdate(prevProps, prevState) {
        let { options } = this.state
        let { language, doctorSchedule, doctorId, fetchScheduleDoctorStart } = this.props
        if (prevProps.language !== language) {
            let options = this.handleCreateDateOptions()
            this.setState({ options })
        }
        if (prevProps.doctorSchedule !== doctorSchedule) {
            this.setState({ doctorSchedule })
        }
        if (prevProps.doctorId !== doctorId) {
            if (options) {
                this.setState({ doctorId })
                await fetchScheduleDoctorStart(doctorId, options[0].value)
            }
        }
    }
    handleCreateDateOptions = () => {
        let curDate = moment(new Date()).format(utils.DATE_FORMAT.SEND_TO_SERVER)
        let { language } = this.props
        let options = []
        for (let i = 0; i < 7; i++) {
            let obj = {}
            obj.label = language === utils.LANGUAGES.VI ? moment(new Date()).add(i, 'days').format(utils.DATE_FORMAT.SELECT_DATE_VI).toLowerCase().replace(/\b[a-z]/, function (letter) {
                return letter.toUpperCase();
            }) : moment(new Date()).locale('en').add(i, 'days').format(utils.DATE_FORMAT.SELECT_DATE_EN)
            obj.value = moment(new Date()).add(i, 'days').format(utils.DATE_FORMAT.SEND_TO_SERVER)
            // if (obj.label.search('Chủ nhật') === 0 || obj.label.search('Sun') === 0) {
            //     continue
            // }
            if (curDate === obj.value) {
                let curDDMM = moment(new Date()).format(utils.DATE_FORMAT.DATE_DD_MM)
                obj.label = language === utils.LANGUAGES.VI ? `Hôm nay - ${curDDMM}` : `Today - ${curDDMM}`
            }
            options.push(obj)
        }
        return options
    }
    handleClickDate = async (e) => {
        let { doctorId, fetchScheduleDoctorStart } = this.props
        await fetchScheduleDoctorStart(doctorId, e.target.value)
    }
    handleOpenModal = (data) => {
        this.setState({ openModal: !this.state.openModal, dataModal: data })
    }
    render() {
        let { options, doctorSchedule, openModal, dataModal, doctorId } = this.state
        let { language } = this.props

        return (
            <>
                <div className='left-container'>
                    <div className='select-date'>
                        <select onChange={(e) => this.handleClickDate(e)}>{options && options.length > 0 &&
                            options.map((item, index) => {
                                return (<option key={index} value={item.value}>{item.label}</option>)
                            })
                        }
                        </select>
                    </div>
                    <div className='select-time'>
                        <div className='text mt-2'>
                            <span><i className="fa-solid fa-calendar-days mr-2"></i><FormattedMessage id='doctor-detail.calender' /></span>
                        </div>
                        <div className='mt-3'>
                            {doctorSchedule && doctorSchedule.length > 0 ?
                                <>
                                    <div className='available-time'>
                                        {doctorSchedule.map((item, index) => {
                                            let timeDisplay = language === utils.LANGUAGES.VI ? item.timeScheduleData.valueVi : item.timeScheduleData.valueEn
                                            return (
                                                <button onClick={() => { this.handleOpenModal(item) }} className={language === utils.LANGUAGES.VI ? 'vi' : 'en'} key={index}>{timeDisplay}</button>
                                            )
                                        })}
                                    </div>
                                    <div className='text-choose mt-3'>
                                        <span><FormattedMessage id='doctor-detail.text-choose' /> <i className="far fa-hand-point-up"></i> <FormattedMessage id='doctor-detail.text-book' /> <sup><FormattedMessage id='doctor-detail.currency' /></sup>&#41;</span>
                                    </div>
                                </>
                                : <span className='text-danger'><FormattedMessage id='doctor-detail.text-no-calendar' /></span>}
                        </div>

                    </div>
                </div>
                <BookingModal
                    doctorId={doctorId}
                    openModal={openModal}
                    handleOpenModal={this.handleOpenModal}
                    dataModal={dataModal} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctorSchedule: state.doctor.doctorSchedule
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchScheduleDoctorStart: (doctorId, date) => dispatch(actions.fetchScheduleDoctorStart(doctorId, date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

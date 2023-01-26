import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux"
import Select from 'react-select';
import * as actions from '../../../store/actions'
import * as utils from '../../../utils'
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import DatePickerCustom from '../../../components/MyCustom/DatePickerCustom';
class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            choosenDate: new Date(),
            nameDoctors: [],
            selectedDoctor: null,
            times: []
        }
    }
    componentDidMount() {
        this.props.getNameDoctorsStart('')
        this.props.fetchTimeStart()
    }
    componentDidUpdate(prevProps, prevState) {
        let { nameDoctors, language, times, success } = this.props
        if (prevProps.nameDoctors !== nameDoctors || prevProps.language !== language) {
            let nameOptions = this.handleCreateNameDoctorOptions(nameDoctors)
            this.setState({
                nameDoctors: nameOptions,
                selectedDoctor: null
            })
        }
        if (prevProps.times !== times) {
            if (times && times.length > 0) {
                times.forEach((times) => {
                    times.active = false
                })
            }
            this.setState({
                times
            })
        }
        if (prevProps.success !== success) {
            if (times && times.length > 0) {
                times.forEach((times) => {
                    times.active = false
                })
            }
            this.setState({
                selectedDoctor: null, times, choosenDate: new Date()
            })
        }
    }
    handleCreateNameDoctorOptions = (data) => {
        let result = []
        let { language } = this.props
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {}
                let labelVi = `${item.fNameVi} ${item.lNameVi}`
                let labelEn = `${item.fNameEn} ${item.lNameEn}`
                object.label = language === utils.LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }
    handleChange = (selectedDoctor) => {
        this.setState({
            selectedDoctor
        })
    }
    handleChangeDate = (date) => {
        this.setState({
            choosenDate: date
        })
    }
    handleChooseTime = (data) => {
        let { times } = this.state
        if (times && times.length > 0) {
            times.forEach((times) => {
                if (times.id === data.id)
                    times.active = !times.active
            })
        }
        this.setState({ times })
    }
    handleSaveSchedule = async () => {
        let result = []
        let { times, selectedDoctor, choosenDate } = this.state
        if (selectedDoctor && !_.isEmpty(selectedDoctor)) {
            if (choosenDate !== null) {
                choosenDate = moment(choosenDate).format(utils.DATE_FORMAT.SEND_TO_SERVER)
                if (times && times.length > 0) {
                    let timeActive = times.filter(item => item.active)
                    if (timeActive && timeActive.length > 0) {
                        timeActive.map(item => {
                            let obj = {}
                            obj.doctorId = selectedDoctor.value
                            obj.date = choosenDate
                            obj.time = item.keyMap
                            result.push(obj)
                        })
                        this.props.createBulkScheduleStart({
                            schedule: result,
                            doctorId: selectedDoctor.value,
                            date: choosenDate
                        })
                    } else { toast.warning(<FormattedMessage id='users.manage-schedule.alerts.alert3' />) }
                }
            } else { toast.warning(<FormattedMessage id='users.manage-schedule.alerts.alert2' />) }
        } else { toast.warning(<FormattedMessage id='users.manage-schedule.alerts.alert1' />) }
    }
    // isWeekday = (date) => {
    //     const day = date.getDay();
    //     return day !== 0
    // }
    render() {
        let { language } = this.props
        let { choosenDate, selectedDoctor, nameDoctors, times } = this.state

        return (
            <div className='content-wrapper'>
                <div className="content-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h6 className="m-0 text-info"><FormattedMessage id='menu.admin.manage1' /> / <FormattedMessage id='menu.doctor.manage1' /></h6>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                <div className='content'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h3 className='card-title'><FormattedMessage id='menu.doctor.manage1' /></h3>
                                        <div className="card-tools">
                                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                <i className="fas fa-minus" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row mb-3'>
                                            <div className='col-6 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label1' /></label>
                                                <Select
                                                    placeholder={language === utils.LANGUAGES.VI ? <div>Nhập tên Bác sĩ..</div> : <div>Type to search..</div>}
                                                    value={selectedDoctor}
                                                    onChange={this.handleChange}
                                                    options={nameDoctors} />
                                            </div>
                                            <div className='col-6 form-group'>
                                                <label><FormattedMessage id='users.manage-schedule.label1' /></label>
                                                <DatePickerCustom
                                                    selectedDate={choosenDate}
                                                    minDate={new Date()}
                                                    handleChangeDate={this.handleChangeDate}
                                                    language={language} />
                                            </div>
                                        </div>
                                        <div className='row mb-5'>
                                            <div className='col-12 mb-5'>
                                                {times && times.length > 0 &&
                                                    times.map((item, index) => {
                                                        return (
                                                            <button style={{ minWidth: '220px' }} onClick={() => this.handleChooseTime(item)} className={item.active ? 'btn btn-primary mr-3 mb-3' : 'btn btn-outline-primary mr-3 mb-3'} key={index}>{language === utils.LANGUAGES.VI ? item.valueVi : item.valueEn}</button>)
                                                    })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card-footer'>
                                        <button onClick={() => this.handleSaveSchedule()} className='btn btn-primary'><FormattedMessage id='users.manage-doctors.footer.button1' /></button>{' '}
                                        <button className='btn btn-secondary'><FormattedMessage id='users.manage-doctors.footer.button3' /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        nameDoctors: state.doctor.nameDoctors,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        times: state.doctor.times,
        success: state.doctor.success
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createBulkScheduleStart: (data) => dispatch(actions.createBulkScheduleStart(data)),
        getNameDoctorsStart: (id) => dispatch(actions.getNameDoctorsStart(id)),
        fetchTimeStart: () => dispatch(actions.fetchTimeStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

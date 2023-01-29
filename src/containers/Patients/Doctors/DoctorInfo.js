import React, { Component } from 'react'
import { connect } from "react-redux"
import { FormattedMessage } from 'react-intl'
import * as actions from '../../../store/actions'
import * as utils from '../../../utils'
import * as services from '../../../services'
class DoctorInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false,
            nameClinicVi: '', nameClinicEn: '', addressClinicVi: '', addressClinicEn: '', noteVi: '', noteEn: '',
            priceVi: '', priceEn: '', paymentVi: '', paymentEn: ''
        }
    }
    async componentDidMount() {
        let { doctorId, fetchDoctorInfoStart } = this.props
        if (doctorId) {
            // await fetchDoctorInfoStart(doctorId)
            let res = await services.fetchDoctorInfoService(doctorId)
            if (res && res.errCode === '0') {
                let { nameClinicVi, nameClinicEn, addressClinicVi, addressClinicEn, noteVi, noteEn } = res.data
                if (res.data.priceDoctorData) {
                    let prices = res.data.priceDoctorData
                    this.setState({ priceVi: prices.valueVi, priceEn: prices.valueEn })
                }
                if (res.data.paymentData) {
                    let payments = res.data.paymentData
                    this.setState({ paymentVi: payments.valueVi, paymentEn: payments.valueEn })
                }
                this.setState({ nameClinicVi, nameClinicEn, addressClinicVi, addressClinicEn, noteVi, noteEn })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        let { doctorInfo, doctorId, fetchDoctorInfoStart } = this.props
        if (prevProps.doctorId !== doctorId) {
            let res = await services.fetchDoctorInfoService(doctorId)
            if (res && res.errCode === '0') {
                let { nameClinicVi, nameClinicEn, addressClinicVi, addressClinicEn, noteVi, noteEn } = res.data
                if (res.data.priceDoctorData) {
                    let prices = res.data.priceDoctorData
                    this.setState({ priceVi: prices.valueVi, priceEn: prices.valueEn })
                }
                if (res.data.paymentData) {
                    let payments = res.data.paymentData
                    this.setState({ paymentVi: payments.valueVi, paymentEn: payments.valueEn })
                }
                this.setState({ nameClinicVi, nameClinicEn, addressClinicVi, addressClinicEn, noteVi, noteEn })
            }
        }
        if (prevProps.doctorInfo !== doctorInfo) {
            // using redux
            // let { nameClinicVi, nameClinicEn, addressClinicVi, addressClinicEn, noteVi, noteEn } = doctorInfo
            // if (doctorInfo.priceDoctorData) {
            //     let prices = doctorInfo.priceDoctorData
            //     this.setState({ priceVi: prices.valueVi, priceEn: prices.valueEn })
            // }
            // if (doctorInfo.paymentData) {
            //     let payments = doctorInfo.paymentData
            //     this.setState({ paymentVi: payments.valueVi, paymentEn: payments.valueEn })
            // }
            // this.setState({ nameClinicVi, nameClinicEn, addressClinicVi, addressClinicEn, noteVi, noteEn })
        }
    }
    showHide = () => {
        this.setState({ isShow: !this.state.isShow })
    }
    render() {
        let { isShow, nameClinicVi, nameClinicEn, addressClinicVi, addressClinicEn, noteVi, noteEn, priceVi, priceEn, paymentVi, paymentEn } = this.state
        let { language, modal, specialty } = this.props
        return (<div className={specialty ? 'doctor-info-container in-specialty' : 'doctor-info-container'}>
            {modal ?
                <div>
                    <span className='title-text text-bold'><FormattedMessage id='doctor-info.text2' />:</span>&ensp;<span className='text-danger'>{language === utils.LANGUAGES.VI ? priceVi : priceEn}<sup>{language === utils.LANGUAGES.VI ? 'đ' : 'd'}</sup>.</span>
                </div> :
                <>
                    <div className={specialty ? 'up up-specialty' : 'up'}>
                        <table>
                            <tbody>
                                <tr>
                                    <td className='title-text'><FormattedMessage id='doctor-info.text1' /></td>
                                </tr>
                                <tr>
                                    <td className='clinic-name'>{language === utils.LANGUAGES.VI ? nameClinicVi : nameClinicEn}</td>
                                </tr>
                                <tr>
                                    <td>{language === utils.LANGUAGES.VI ? addressClinicVi : addressClinicEn}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='down'>
                        {!isShow ?
                            <div>
                                <span className='title-text'><FormattedMessage id='doctor-info.text2' />:</span>&ensp;<span>{language === utils.LANGUAGES.VI ? priceVi : priceEn}<sup>{language === utils.LANGUAGES.VI ? 'đ' : 'd'}</sup>.</span>&ensp;<span onClick={() => this.showHide()} className='hide-tbl'><FormattedMessage id='doctor-info.text3' /></span>
                            </div> :
                            <div>
                                <span className='title-text'><FormattedMessage id='doctor-info.text2' />:</span>
                                <table className='tbl'>
                                    <tbody>
                                        <tr className='bg-1'>
                                            <td className='foot'><FormattedMessage id='doctor-info.text2' /> <br />
                                                <span className='sub'>{language === utils.LANGUAGES.VI ? noteVi : noteEn}</span>
                                            </td>
                                            <td className='foot'>{language === utils.LANGUAGES.VI ? priceVi : priceEn}<sup>{language === utils.LANGUAGES.VI ? 'đ' : 'd'}</sup></td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className='foot'><FormattedMessage id='doctor-info.text4' /> {language === utils.LANGUAGES.VI ? paymentVi : paymentEn}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <span onClick={() => this.showHide()} className='hide-tbl'><FormattedMessage id='doctor-info.text5' /></span>
                            </div>}
                    </div></>}</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        // doctorInfo: state.doctor.doctorInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // fetchDoctorInfoStart: (doctorId) => dispatch(actions.fetchDoctorInfoStart(doctorId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo);

import React, { Component } from 'react'
import { connect } from "react-redux"
import { FormattedMessage } from 'react-intl'
import Header from '../../HomePage/Header';
import * as actions from '../../../store/actions'
import Schedule from '../Doctors/Schedule';
import Footer from '../../HomePage/Footer';
import DoctorInfo from '../Doctors/DoctorInfo';
import DoctorProfile from '../Doctors/DoctorProfile';
import _ from 'lodash';
import * as utils from '../../../utils'
import * as services from '../../../services'
class SpecialtyDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: [],
            arrProvince: [],
            showName: false, nameVi: '', nameEn: '', contentHtml: ''
        }
    }
    async componentDidMount() {
        window.addEventListener('scroll', this.scrollFunction)
        let { match, fetchAllNameSpecialtiesStart, fetchSpecialtyDetailStart } = this.props

        if (match && match.params && match.params.id) {
            await fetchAllNameSpecialtiesStart(match.params.id)
            await fetchSpecialtyDetailStart(match.params.id, 'ALL')
        }
        let res = await services.getAllCodeService('province')
        if (res && res.errCode === '0') {
            this.setState({ arrProvince: res.data })
        }
    }
    scrollFunction = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            this.setState({ showName: true })
        } else {
            this.setState({ showName: false })
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        let { allNameSpecialties, specialtyDetail, language } = this.props
        if (prevProps.allNameSpecialties !== allNameSpecialties) {
            this.setState({
                nameVi: allNameSpecialties.nameVi,
                nameEn: allNameSpecialties.nameEn
            })
        }
        if (prevProps.specialtyDetail !== specialtyDetail || prevProps.language !== language) {
            if (specialtyDetail.arrDoctorId && !_.isEmpty(specialtyDetail.arrDoctorId)) {
                this.setState({ arrDoctor: specialtyDetail.arrDoctorId })
            }
            if (specialtyDetail.data && !_.isEmpty(specialtyDetail.data)) {
                let data = specialtyDetail.data
                let { contentHtmlEn, contentHtmlVi } = data
                let { language } = this.props
                if (language === utils.LANGUAGES.VI) {
                    this.setState({ contentHtml: contentHtmlVi })

                } else {
                    this.setState({ contentHtml: contentHtmlEn })
                }

            }
        }
    }
    handleOnchangeLocation = async (e) => {
        let { match, fetchSpecialtyDetailStart } = this.props
        if (match && match.params && match.params.id) {
            await fetchSpecialtyDetailStart(match.params.id, e.target.value)
        }
    }

    render() {
        let { showName, nameVi, nameEn, arrDoctor, arrProvince, contentHtml } = this.state
        let { language } = this.props
        return (<>
            <Header
                showName={showName}
                nameVi={nameVi}
                nameEn={nameEn}
            />

            <div className='specialty-container'>

                <div dangerouslySetInnerHTML={{ __html: contentHtml }} className='specialty-description'></div>
                <div className='specialty-select'>
                    <select onChange={(e) => { this.handleOnchangeLocation(e) }}>
                        <option value='ALL'>{language === utils.LANGUAGES.VI ? 'Toàn Quốc' : 'Nationwide'}</option>
                        {arrProvince && arrProvince.length > 0 &&
                            arrProvince.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}>{language === utils.LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                )
                            })}
                    </select>
                </div>
                <div className='specialty-body'>
                    {arrDoctor && arrDoctor.length > 0 &&
                        arrDoctor.map((item, index) => {
                            return (
                                <div className='doctor-in-specialty' key={index}>
                                    <div className='left'>
                                        <DoctorProfile
                                            specialty={true}
                                            isShowDescript={true}
                                            doctorId={item} />
                                    </div>
                                    <div className='right'>
                                        <Schedule doctorId={item} specialty={true} />

                                        <DoctorInfo doctorId={item} specialty={true} />
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
            <Footer />
        </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allNameSpecialties: state.specialty.allNameSpecialties,
        specialtyDetail: state.specialty.specialtyDetail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllNameSpecialtiesStart: (id) => dispatch(actions.fetchAllNameSpecialtiesStart(id)),
        fetchSpecialtyDetailStart: (id, location) => dispatch(actions.fetchSpecialtyDetailStart(id, location))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);

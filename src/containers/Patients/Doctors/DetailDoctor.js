import React, { Component } from 'react'
import { connect } from "react-redux"
import Header from '../../HomePage/Header';
import Footer from '../../HomePage/Footer'
import * as actions from '../../../store/actions'
import * as utils from '../../../utils'

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doctorDetailInfo: [],
            imageURL: '',
            showName: false
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.scrollFunction)
        let { match, fetchDoctorDetailInfoByIDStart } = this.props
        if (match && match.params && match.params.id) {
            fetchDoctorDetailInfoByIDStart(match.params.id)
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
        let { doctorDetailInfo } = this.props
        let imageBase64 = '', objectUrl = ''
        if (prevProps.doctorDetailInfo !== doctorDetailInfo) {
            if (doctorDetailInfo.image && doctorDetailInfo.image.data.length === 0) {
                imageBase64 = ''
                objectUrl = ''
            } else {
                imageBase64 = Buffer.from(doctorDetailInfo.image, 'base64').toString('ascii')
                let blob = utils.CommonUtils.b64toBlob(imageBase64)
                objectUrl = URL.createObjectURL(blob)
            }
            this.setState({
                doctorDetailInfo,
                imageURL: objectUrl
            })
        }
    }
    render() {
        let { language } = this.props
        let { doctorDetailInfo, imageURL, showName } = this.state
        let nameVi = '', nameEn = ''
        if (doctorDetailInfo && doctorDetailInfo.positionData) {
            nameVi = `${doctorDetailInfo.positionData.valueVi}, ${doctorDetailInfo.fNameVi} ${doctorDetailInfo.lNameVi}`
            nameEn = `${doctorDetailInfo.positionData.valueEn}, ${doctorDetailInfo.fNameEn} ${doctorDetailInfo.lNameEn}`
        }
        let descriptionVi = '', descriptionEn = ''
        if (doctorDetailInfo && doctorDetailInfo.userPostData && doctorDetailInfo.userPostData.descriptionVi && doctorDetailInfo.userPostData.descriptionEn) {
            descriptionVi = `${doctorDetailInfo.userPostData.descriptionVi}`.split('\n').join('</br>')
            descriptionEn = `${doctorDetailInfo.userPostData.descriptionEn}`.split('\n').join('</br>')
        }
        let detailVi = '', detailEn = ''
        if (doctorDetailInfo && doctorDetailInfo.userPostData && doctorDetailInfo.userPostData.contentHtmlVi && doctorDetailInfo.userPostData.contentHtmlEn) {
            detailVi = doctorDetailInfo.userPostData.contentHtmlVi
            detailEn = doctorDetailInfo.userPostData.contentHtmlEn
        }
        return (
            <>
                <Header
                    showName={showName}
                    nameVi={nameVi}
                    nameEn={nameEn} />
                <div className='doctor-detail-info-container'>
                    <div className='doctor-description'>
                        <div style={{ backgroundImage: `url(${imageURL})` }} className='content-left'></div>
                        <div className='content-right'>
                            <div className='doctor-name'>
                                {language === utils.LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='doctor-info'>
                                {language === utils.LANGUAGES.VI ? <div dangerouslySetInnerHTML={{ __html: descriptionVi }}></div> : <div dangerouslySetInnerHTML={{ __html: descriptionEn }}></div>}
                            </div>
                        </div>
                    </div>
                    <div className='doctor-schedule'></div>
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
        language: state.app.language,
        doctorDetailInfo: state.homepage.doctorDetailInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorDetailInfoByIDStart: (id) => dispatch(actions.fetchDoctorDetailInfoByIDStart(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);

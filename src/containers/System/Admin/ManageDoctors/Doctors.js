import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Select from 'react-select';
import './Doctor.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import * as actions from '../../../../store/actions'
import * as utils from '../../../../utils'
import Lightbox from 'react-image-lightbox';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class Doctors extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nameDoctors: [],
            contentHtmlVi: '',
            contentMarkDownVi: '',
            descriptionVi: '',
            contentHtmlEn: '',
            contentMarkDownEn: '',
            descriptionEn: '',
            selectedDoctor: null,
            saveData: true,
            previewImgURL: '',
            isOpenImg: false
        }
    }
    componentDidMount() {
        this.props.getNameDoctorsStart()
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

    componentDidUpdate(prevProps, prevState) {
        let { nameDoctors, language, isCreatingOrUpdatingDoctorInfo, doctorDetailInfo } = this.props
        if (prevProps.nameDoctors !== nameDoctors || prevProps.language !== language) {
            let nameOptions = this.handleCreateNameDoctorOptions(nameDoctors)
            this.setState({
                nameDoctors: nameOptions,
                selectedDoctor: null,
                contentMarkDownVi: '',
                descriptionVi: '',
                contentMarkDownEn: '',
                descriptionEn: '',
                saveData: true
            })
        }
        if (prevProps.isCreatingOrUpdatingDoctorInfo !== isCreatingOrUpdatingDoctorInfo && prevProps.isCreatingOrUpdatingDoctorInfo === true && isCreatingOrUpdatingDoctorInfo === false) {
            this.handleCancel()
        }
        if (prevProps.doctorDetailInfo !== doctorDetailInfo) {
            if (doctorDetailInfo.userPostData) {
                let imageBase64 = '', objectUrl = ''

                if (doctorDetailInfo.image && doctorDetailInfo.image.data.length === 0) {
                    imageBase64 = ''
                    objectUrl = ''
                } else {
                    imageBase64 = Buffer.from(doctorDetailInfo.image, 'base64').toString('ascii')
                    let blob = utils.CommonUtils.b64toBlob(imageBase64)
                    objectUrl = URL.createObjectURL(blob)
                }
                let detail = doctorDetailInfo.userPostData
                this.setState({
                    contentHtmlVi: detail.contentHtmlVi,
                    contentMarkDownVi: detail.contentMarkDownVi,
                    descriptionVi: detail.descriptionVi,
                    contentHtmlEn: detail.contentHtmlEn,
                    contentMarkDownEn: detail.contentMarkDownEn,
                    descriptionEn: detail.descriptionEn,
                    saveData: false,
                    previewImgURL: objectUrl
                }, () => console.log(this.state.previewImgURL))
            }
        }
    }
    // Finish!
    handleEditorChangeVi = ({ html, text }) => {
        this.setState({
            contentHtmlVi: html,
            contentMarkDownVi: text
        })
    }
    handleEditorChangeEn = ({ html, text }) => {
        this.setState({
            contentHtmlEn: html,
            contentMarkDownEn: text
        })
    }
    handleChange = (selectedDoctor) => {
        this.setState({
            selectedDoctor,
            contentMarkDownVi: '',
            descriptionVi: '',
            contentMarkDownEn: '',
            descriptionEn: '',
            saveData: true
        })
        this.props.fetchDoctorDetailInfoByIDStart(selectedDoctor.value)
    };

    handleCreateOrUpdateDoctorInfo = () => {
        let { contentHtmlVi, contentMarkDownVi, descriptionVi, contentHtmlEn, contentMarkDownEn, descriptionEn, selectedDoctor, saveData } = this.state
        this.props.createOrUpdateDoctorInfoStart({
            contentHtmlVi, contentMarkDownVi, descriptionVi, contentHtmlEn, contentMarkDownEn, descriptionEn,
            doctorId: selectedDoctor.value,
            action: saveData ? utils.CRUD.CREATE : utils.CRUD.UPDATE
        })
    }
    handleChangeIntroduction = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }
    handleOpenImg = () => {
        if (this.state.previewImgURL === '') return
        this.setState({ isOpenImg: true })
    }
    handleCancel = () => {
        this.setState({
            contentMarkDownVi: '',
            descriptionVi: '',
            contentMarkDownEn: '',
            descriptionEn: '',
            selectedDoctor: null,
            previewImgURL: '', saveData: true
        })
    }

    render() {
        let { isOpenImg, selectedDoctor, descriptionVi, descriptionEn, nameDoctors, contentMarkDownVi, contentMarkDownEn, saveData, previewImgURL } = this.state
        let { language, doctorDetailInfo } = this.props
        console.log(doctorDetailInfo)
        return (<>
            {isOpenImg &&
                <Lightbox
                    mainSrc={previewImgURL}
                    onCloseRequest={() => this.setState({ isOpenImg: false })}
                />
            }
            <div className='content-wrapper'>
                <div className="content-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h6 className="m-0 text-info"><FormattedMessage id='menu.admin.manage1' /> / <FormattedMessage id='menu.admin.manage1-details.detail4' /></h6>
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
                                        <h3 className='card-title'><FormattedMessage id='users.manage-doctors.title.title1' /></h3>
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
                                                    options={nameDoctors}
                                                />
                                            </div>
                                            <div className='col-6 manage-doctor-preview-image'>
                                                <div onClick={() => this.handleOpenImg()} style={{ backgroundImage: `url(${previewImgURL})` }} className={previewImgURL !== '' ? 'preview exist' : 'preview'}></div>
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <div className='col-6 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label2' /></label>
                                                <textarea onChange={(e) => this.handleChangeIntroduction(e, 'descriptionVi')} value={descriptionVi} className='form-control' rows={5}>
                                                </textarea>
                                            </div>
                                            <div className='col-6 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label3' /></label>
                                                <textarea onChange={(e) => this.handleChangeIntroduction(e, 'descriptionEn')} value={descriptionEn} className='form-control' rows={5}>
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label4' /></label>
                                                <MdEditor value={contentMarkDownVi} style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChangeVi} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label5' /></label>
                                                <MdEditor value={contentMarkDownEn} style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChangeEn} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card-footer'>
                                        <Button onClick={() => this.handleCreateOrUpdateDoctorInfo()} color={saveData ? 'primary' : 'success'}>
                                            {saveData ? <FormattedMessage id='users.manage-doctors.footer.button1' /> : <FormattedMessage id='users.manage-doctors.footer.button2' />}
                                        </Button>&ensp;
                                        <Button onClick={() => this.handleCancel()} color="secondary" >
                                            <FormattedMessage id='users.manage-doctors.footer.button3' />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        nameDoctors: state.doctor.nameDoctors,
        isCreatingOrUpdatingDoctorInfo: state.doctor.isCreatingOrUpdatingDoctorInfo,
        doctorDetailInfo: state.homepage.doctorDetailInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getNameDoctorsStart: () => dispatch(actions.getNameDoctorsStart()),
        createOrUpdateDoctorInfoStart: (data) => dispatch(actions.createOrUpdateDoctorInfoStart(data)),
        fetchDoctorDetailInfoByIDStart: (id) => dispatch(actions.fetchDoctorDetailInfoByIDStart(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Doctors);

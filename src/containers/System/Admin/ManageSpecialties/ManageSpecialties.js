import React, { Component } from 'react'
import { connect } from "react-redux"
import { FormattedMessage } from 'react-intl'
import { Button } from 'reactstrap';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Lightbox from 'react-image-lightbox';
import * as utils from '../../../../utils'
import { toast } from 'react-toastify';
import * as actions from '../../../../store/actions'
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialties extends Component {
    constructor(props) {
        super(props)
        this.state = {
            previewImgURL: '', image: '', contentMarkDownVi: '', contentMarkDownEn: '', contentHtmlVi: '', contentHtmlEn: '', nameVi: '', nameEn: '',
            isOpenImg: false,
            contentMarkDownVi_err: '', contentMarkDownEn_err: '', nameVi_err: '', nameEn_err: ''
        }
        this.listenEmitter()
    }
    listenEmitter = () => {
        utils.emitter.on('CREATE SPECIALTY SUCCESSFULLY', () => {
            this.resetForm()
        })
    }
    resetForm = () => {
        this.setState({
            previewImgURL: '', image: '', contentMarkDownVi: '', contentMarkDownEn: '', contentHtmlVi: '', contentHtmlEn: '', nameVi: '', nameEn: '',
            isOpenImg: false, contentMarkDownVi_err: '', contentMarkDownEn_err: '', nameVi_err: '', nameEn_err: ''
        })
    }
    componentDidMount() {
    }
    async componentDidUpdate(prevProps, prevState) {
    }
    handleOnChangeImage = async (e) => {
        let img = e.target.files[0]
        if (img) {
            let imgBase64 = await utils.CommonUtils.getBase64(img)
            let objectUrl = URL.createObjectURL(img)
            this.setState({
                previewImgURL: objectUrl,
                image: imgBase64
            })
        }
    }
    handleOpenImg = () => {
        if (this.state.previewImgURL === '') return
        this.setState({ isOpenImg: true })
    }
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
    handleChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }
    validate = () => {
        let isValid = true
        let { contentMarkDownVi, contentMarkDownEn, nameVi, nameEn } = this.state
        if (contentMarkDownVi === '') {
            isValid = false
            this.setState({ contentMarkDownVi_err: <FormattedMessage id="users.manage-doctors.error.e8" /> })
        }
        if (contentMarkDownEn === '') {
            isValid = false
            this.setState({ contentMarkDownEn_err: <FormattedMessage id="users.manage-doctors.error.e9" /> })
        }
        if (nameVi === '') {
            isValid = false
            this.setState({ nameVi_err: <FormattedMessage id='manage-specialties.error1' /> })
        }
        if (nameEn === '') {
            isValid = false
            this.setState({ nameEn_err: <FormattedMessage id='manage-specialties.error2' /> })
        }
        return isValid
    }
    resetError = () => {
        this.setState({
            contentMarkDownVi_err: '', contentMarkDownEn_err: '', nameVi_err: '', nameEn_err: ''
        })
    }
    handleSave = () => {
        let { createSpecialtyStart } = this.props
        this.resetError()
        let isValid = this.validate()
        if (isValid) {
            let { contentHtmlVi, contentHtmlEn, image, contentMarkDownVi, contentMarkDownEn, nameVi, nameEn } = this.state
            createSpecialtyStart({
                contentHtmlVi, contentHtmlEn, image, contentMarkDownVi, contentMarkDownEn, nameVi, nameEn
            })
        } else {
            toast.error(<FormattedMessage id='manage-specialties.toast-error' />)
        }
    }

    render() {
        let { contentMarkDownVi_err, contentMarkDownEn_err, nameVi_err, nameEn_err, isOpenImg, previewImgURL, contentMarkDownVi, contentMarkDownEn, nameVi, nameEn } = this.state
        return (
            <div className='content-wrapper'>
                <div className="content-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h6 className="m-0 text-info"><FormattedMessage id='menu.admin.manage2' /> / <FormattedMessage id='menu.admin.manage2-details.detail1' /></h6>
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
                                        <h3 className='card-title'><FormattedMessage id='menu.admin.manage2-details.detail1' /></h3>
                                        <div className="card-tools">
                                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                <i className="fas fa-minus" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row mb-3'>
                                            <div className='col-4 form-group'>
                                                <label><FormattedMessage id="manage-specialties.text1" /></label>
                                                <input value={nameVi} onChange={(e) => { this.handleChangeInput(e, 'nameVi') }} className='form-control' />
                                                <span className='text-danger'>{nameVi_err}</span>
                                            </div>
                                            <div className='col-4 form-group'>
                                                <label><FormattedMessage id="manage-specialties.text2" /></label>
                                                <input value={nameEn} onChange={(e) => { this.handleChangeInput(e, 'nameEn') }} className='form-control' />
                                                <span className='text-danger'>{nameEn_err}</span>
                                            </div>
                                            <div className='col-4 form-group'>
                                                <label><FormattedMessage id="manage-specialties.text3" /></label>
                                                <div className='upload-avatar'>
                                                    <input onChange={(e) => this.handleOnChangeImage(e)} id='input-file' type='file' hidden />
                                                    <label className='cus-btn-upload-image btn btn-warning' htmlFor='input-file'><FormattedMessage id="users.user-redux.body.text14" /> <i className="fa-solid fa-upload"></i></label>
                                                    <div onClick={() => this.handleOpenImg()} style={{ backgroundImage: `url(${previewImgURL})` }} className={previewImgURL !== '' ? 'preview exist' : 'preview'}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <div className='col-12 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label13' /></label>{' '}<span className='text-danger'>{contentMarkDownVi_err}</span>
                                                <MdEditor value={contentMarkDownVi} style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChangeVi} />
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <div className='col-12 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label14' /></label>{' '}<span className='text-danger'>{contentMarkDownEn_err}</span>
                                                <MdEditor value={contentMarkDownEn} style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChangeEn} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card-footer'>
                                        <Button onClick={() => this.handleSave()} color={'primary'}>
                                            Lưu
                                        </Button>&ensp;
                                        <Button onClick={() => this.resetForm()} color="secondary" >
                                            <FormattedMessage id='users.manage-doctors.footer.button3' />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isOpenImg &&
                    <Lightbox
                        mainSrc={previewImgURL}
                        onCloseRequest={() => this.setState({ isOpenImg: false })}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createSpecialtyStart: (data) => dispatch(actions.createSpecialtyStart(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialties);

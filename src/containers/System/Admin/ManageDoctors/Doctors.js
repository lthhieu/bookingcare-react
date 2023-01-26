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
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class Doctors extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //posts table
            contentHtmlVi: '', contentHtmlEn: '', contentMarkDownVi: '', descriptionVi: '', descriptionEn: '', contentMarkDownEn: '',
            //doctor-infos table
            prices: [],
            payments: [],
            provinces: [],
            selectedPrice: null, selectedPayment: null, selectedProvince: null,
            nameClinicVi: '', nameClinicEn: '', addressClinicVi: '', addressClinicEn: '', noteVi: '', noteEn: '',
            //error msg
            selectedDoctor_err: '', nameClinicVi_err: '', nameClinicEn_err: '', addressClinicVi_err: '', addressClinicEn_err: '', contentMarkDownVi_err: '', descriptionVi_err: '', descriptionEn_err: '', contentMarkDownEn_err: '',
            //
            nameDoctors: [],
            selectedDoctor: null,
            saveData: true,
            previewImgURL: '',
            isOpenImg: false
        }
    }
    componentDidMount() {
        this.props.getNameDoctorsStart()
        this.props.fetchDoctorInfoFromDoctorInfosTableStart()
    }

    handleBuildOptions = (data, type) => {
        let result = []
        let { language } = this.props
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {}
                let labelVi = type === 'Name' ? `${item.fNameVi} ${item.lNameVi}` : item.valueVi
                let labelEn = type === 'Name' ? `${item.fNameEn} ${item.lNameEn}` : item.valueEn
                object.label = language === utils.LANGUAGES.VI ? labelVi : labelEn
                object.value = type === 'Name' ? item.id : item.keyMap
                result.push(object)
            })
        }
        return result
    }

    componentDidUpdate(prevProps, prevState) {
        let { nameDoctors, language, isCreatingOrUpdatingDoctorInfo, doctorDetailInfo, doctorInfoFromDoctorInfosTable } = this.props
        if (prevProps.nameDoctors !== nameDoctors || prevProps.language !== language) {
            let nameOptions = this.handleBuildOptions(nameDoctors, 'Name')
            this.setState({
                nameDoctors: nameOptions,
                selectedDoctor: null,
                contentMarkDownVi: '',
                descriptionVi: '',
                contentMarkDownEn: '',
                descriptionEn: '',
                saveData: true,
                previewImgURL: ''
            })
        }
        if (prevProps.isCreatingOrUpdatingDoctorInfo !== isCreatingOrUpdatingDoctorInfo && prevProps.isCreatingOrUpdatingDoctorInfo === true && isCreatingOrUpdatingDoctorInfo === false) {
            this.handleCancel()
        }
        if (prevProps.doctorDetailInfo !== doctorDetailInfo) {
            if (doctorDetailInfo.doctorInfoData) {
                let doctor_info = doctorDetailInfo.doctorInfoData
                let res = this.handleBuildPricePaymentProvince()
                let priceOptions = res[0].filter(x => x.value === doctor_info.priceId)
                let paymentOptions = res[1].filter(x => x.value === doctor_info.paymentId)
                let provinceOptions = res[2].filter(x => x.value === doctor_info.provinceId)
                this.setState({
                    nameClinicVi: doctor_info.nameClinicVi,
                    nameClinicEn: doctor_info.nameClinicEn,
                    addressClinicVi: doctor_info.addressClinicVi,
                    addressClinicEn: doctor_info.addressClinicEn,
                    noteVi: doctor_info.noteVi, noteEn: doctor_info.noteEn,
                    selectedPrice: priceOptions,
                    selectedPayment: paymentOptions,
                    selectedProvince: provinceOptions
                })
            }
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
                })
            }
        }
        if (prevProps.doctorInfoFromDoctorInfosTable !== doctorInfoFromDoctorInfosTable || prevProps.language !== language) {
            let res = this.handleBuildPricePaymentProvince()
            this.setState({
                selectedPrice: res[0][0],
                selectedPayment: res[1][0],
                selectedProvince: res[2][0],
                prices: res[0],
                payments: res[1],
                provinces: res[2]
            })
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
    handleBuildPricePaymentProvince = () => {
        let { doctorInfoFromDoctorInfosTable } = this.props
        let { prices, payments, provinces } = doctorInfoFromDoctorInfosTable
        let priceOptions = this.handleBuildOptions(prices)
        let paymentOptions = this.handleBuildOptions(payments)
        let provinceOptions = this.handleBuildOptions(provinces)
        return [priceOptions, paymentOptions, provinceOptions]
    }
    handleChange = (selectedOption, action) => {
        let res = this.handleBuildPricePaymentProvince()
        let name = action.name
        if (name === 'selectedDoctor') {
            this.setState({
                selectedDoctor: selectedOption,
                selectedPrice: res[0][0],
                selectedPayment: res[1][0],
                selectedProvince: res[2][0],
                contentMarkDownVi: '',
                descriptionVi: '',
                contentMarkDownEn: '',
                descriptionEn: '',
                nameClinicVi: '',
                nameClinicEn: '',
                addressClinicVi: '',
                addressClinicEn: '',
                noteVi: '',
                noteEn: '',
                saveData: true,
                previewImgURL: ''
            })
            this.props.fetchDoctorDetailInfoByIDStart(selectedOption.value)
        } else {
            let copyState = { ...this.state }
            copyState[name] = selectedOption
            this.setState({
                ...copyState
            })
        }
    }

    handleValidateData = () => {
        let isValid = true
        let { contentMarkDownVi, descriptionVi, contentMarkDownEn, descriptionEn, selectedDoctor, nameClinicVi, nameClinicEn, addressClinicVi, addressClinicEn } = this.state
        if (!selectedDoctor) {
            this.setState({ selectedDoctor_err: <FormattedMessage id="users.manage-doctors.error.e1" /> })
            isValid = false
        }
        if (!descriptionVi) {
            this.setState({ descriptionVi_err: <FormattedMessage id="users.manage-doctors.error.e2" /> })
            isValid = false
        }
        if (!descriptionEn) {
            this.setState({ descriptionEn_err: <FormattedMessage id="users.manage-doctors.error.e3" /> })
            isValid = false
        }
        if (!nameClinicVi) {
            this.setState({ nameClinicVi_err: <FormattedMessage id="users.manage-doctors.error.e4" /> })
            isValid = false
        }
        if (!addressClinicVi) {
            this.setState({ addressClinicVi_err: <FormattedMessage id="users.manage-doctors.error.e5" /> })
            isValid = false
        }
        if (!nameClinicEn) {
            this.setState({ nameClinicEn_err: <FormattedMessage id="users.manage-doctors.error.e6" /> })
            isValid = false
        }
        if (!addressClinicEn) {
            this.setState({ addressClinicEn_err: <FormattedMessage id="users.manage-doctors.error.e7" /> })
            isValid = false
        }
        if (!contentMarkDownVi) {
            this.setState({ contentMarkDownVi_err: <FormattedMessage id="users.manage-doctors.error.e8" /> })
            isValid = false
        }
        if (!contentMarkDownEn) {
            this.setState({ contentMarkDownEn_err: <FormattedMessage id="users.manage-doctors.error.e9" /> })
            isValid = false
        }
        return isValid
    }

    handleCreateOrUpdateDoctorInfo = () => {

        let { contentHtmlVi, contentMarkDownVi, descriptionVi, contentHtmlEn, contentMarkDownEn, descriptionEn, selectedDoctor, saveData, nameClinicVi, nameClinicEn, addressClinicVi, addressClinicEn, noteVi, noteEn, selectedPrice, selectedPayment, selectedProvince } = this.state
        let res = this.handleValidateData()
        if (res) {
            this.props.createOrUpdateDoctorInfoStart({
                contentHtmlVi, contentMarkDownVi, descriptionVi, contentHtmlEn, contentMarkDownEn, descriptionEn,
                nameClinicVi, nameClinicEn, addressClinicVi, addressClinicEn, noteVi, noteEn,
                priceId: selectedPrice.value,
                paymentId: selectedPayment.value,
                provinceId: selectedProvince.value,
                doctorId: selectedDoctor.value,
                action: saveData ? utils.CRUD.CREATE : utils.CRUD.UPDATE
            })
        } else {
            toast.error(<FormattedMessage id="users.manage-doctors.toast.error2" />)
        }
    }
    handleChangeInput = (e, id) => {
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
        let { doctorInfoFromDoctorInfosTable } = this.props
        let { prices, payments, provinces } = doctorInfoFromDoctorInfosTable
        let priceOptions = this.handleBuildOptions(prices)
        let paymentOptions = this.handleBuildOptions(payments)
        let provinceOptions = this.handleBuildOptions(provinces)
        this.setState({
            selectedDoctor_err: '', nameClinicVi_err: '', nameClinicEn_err: '', addressClinicVi_err: '', addressClinicEn_err: '', contentMarkDownVi_err: '', descriptionVi_err: '', descriptionEn_err: '', contentMarkDownEn_err: '',
            contentMarkDownVi: '', descriptionVi: '', contentMarkDownEn: '', descriptionEn: '',
            nameClinicVi: '', nameClinicEn: '', addressClinicVi: '', addressClinicEn: '', noteVi: '', noteEn: '',
            selectedDoctor: null,
            selectedPrice: priceOptions && priceOptions[0],
            selectedPayment: paymentOptions && paymentOptions[0],
            selectedProvince: provinceOptions && provinceOptions[0],
            previewImgURL: '', saveData: true
        })
    }

    render() {

        let { selectedDoctor_err, nameClinicVi_err, nameClinicEn_err, addressClinicVi_err, addressClinicEn_err, contentMarkDownVi_err, descriptionVi_err, descriptionEn_err, contentMarkDownEn_err, isOpenImg, selectedDoctor, descriptionVi, descriptionEn, nameDoctors, contentMarkDownVi, contentMarkDownEn, saveData, previewImgURL, provinces, payments, prices, selectedPrice, selectedPayment, selectedProvince, nameClinicVi, nameClinicEn, addressClinicVi, addressClinicEn, noteVi, noteEn } = this.state
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
                                                    name='selectedDoctor'
                                                    placeholder={<FormattedMessage id='users.manage-doctors.body.label1' />}
                                                    value={selectedDoctor}
                                                    onChange={this.handleChange}
                                                    options={nameDoctors}
                                                />
                                                <span className='text-danger'>{selectedDoctor_err}</span>
                                            </div>
                                            <div className='col-6 manage-doctor-preview-image'>
                                                <div onClick={() => this.handleOpenImg()} style={{ backgroundImage: `url(${previewImgURL})` }} className={previewImgURL !== '' ? 'preview exist' : 'preview'}></div>
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <div className='col-6 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label2' /></label>
                                                <textarea onChange={(e) => this.handleChangeInput(e, 'descriptionVi')} value={descriptionVi} className='form-control' rows={5}>
                                                </textarea>
                                                <span className='text-danger'>{descriptionVi_err}</span>
                                            </div>
                                            <div className='col-6 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label3' /></label>
                                                <textarea onChange={(e) => this.handleChangeInput(e, 'descriptionEn')} value={descriptionEn} className='form-control' rows={5}>
                                                </textarea>
                                                <span className='text-danger'>{descriptionEn_err}</span>
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <div className='col-4 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label4' /></label>
                                                <Select
                                                    placeholder={<FormattedMessage id='users.manage-doctors.body.label4' />}
                                                    value={selectedPrice}
                                                    name='selectedPrice'
                                                    onChange={this.handleChange}
                                                    options={prices}
                                                />
                                            </div>
                                            <div className='col-4 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label5' /></label>
                                                <Select
                                                    placeholder={<FormattedMessage id='users.manage-doctors.body.label5' />}
                                                    value={selectedPayment}
                                                    name='selectedPayment'
                                                    onChange={this.handleChange}
                                                    options={payments}
                                                />
                                            </div>
                                            <div className='col-4 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label6' /></label>
                                                <Select
                                                    placeholder={<FormattedMessage id='users.manage-doctors.body.label6' />}
                                                    value={selectedProvince}
                                                    onChange={this.handleChange}
                                                    name='selectedProvince'
                                                    options={provinces}
                                                />
                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <div className='col-4 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label7' /></label>
                                                <input onChange={(e) => this.handleChangeInput(e, 'nameClinicVi')} value={nameClinicVi} className='form-control' />
                                                <span className='text-danger'>{nameClinicVi_err}</span>
                                            </div>
                                            <div className='col-4 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label8' /></label>
                                                <input onChange={(e) => this.handleChangeInput(e, 'addressClinicVi')} value={addressClinicVi} className='form-control' />
                                                <span className='text-danger'>{addressClinicVi_err}</span>
                                            </div>
                                            <div className='col-4 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label9' /></label>
                                                <input onChange={(e) => this.handleChangeInput(e, 'noteVi')} value={noteVi} className='form-control' />

                                            </div>
                                        </div>
                                        <div className='row mb-3'>
                                            <div className='col-4 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label10' /></label>
                                                <input onChange={(e) => this.handleChangeInput(e, 'nameClinicEn')} value={nameClinicEn} className='form-control' />
                                                <span className='text-danger'>{nameClinicEn_err}</span>
                                            </div>
                                            <div className='col-4 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label11' /></label>
                                                <input onChange={(e) => this.handleChangeInput(e, 'addressClinicEn')} value={addressClinicEn} className='form-control' />
                                                <span className='text-danger'>{addressClinicEn_err}</span>
                                            </div>
                                            <div className='col-4 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label12' /></label>
                                                <input onChange={(e) => this.handleChangeInput(e, 'noteEn')} value={noteEn} className='form-control' />

                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label13' /></label>{' '}<span className='text-danger'>{contentMarkDownVi_err}</span>
                                                <MdEditor value={contentMarkDownVi} style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChangeVi} />

                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 form-group'>
                                                <label><FormattedMessage id='users.manage-doctors.body.label14' /></label>{' '}<span className='text-danger'>{contentMarkDownEn_err}</span>
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
        doctorInfoFromDoctorInfosTable: state.doctor.doctorInfoFromDoctorInfosTable,
        language: state.app.language,
        nameDoctors: state.doctor.nameDoctors,
        isCreatingOrUpdatingDoctorInfo: state.doctor.isCreatingOrUpdatingDoctorInfo,
        doctorDetailInfo: state.homepage.doctorDetailInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorInfoFromDoctorInfosTableStart: () => dispatch(actions.fetchDoctorInfoFromDoctorInfosTableStart()),
        getNameDoctorsStart: () => dispatch(actions.getNameDoctorsStart()),
        createOrUpdateDoctorInfoStart: (data) => dispatch(actions.createOrUpdateDoctorInfoStart(data)),
        fetchDoctorDetailInfoByIDStart: (id) => dispatch(actions.fetchDoctorDetailInfoByIDStart(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Doctors);

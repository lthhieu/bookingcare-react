import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss'
import UserReduxTable from './UserReduxTable';
import * as actions from '../../../store/actions'

import CircularProgress from '@mui/material/CircularProgress';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import * as utils from '../../../utils'


import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genders: [],
            roles: [],
            positions: [],
            previewImgURL: '',
            isOpenImg: false,

            fNameVi: '', fNameEn: '', lNameVi: '', lNameEn: '', email: '', password: '', addressVi: '', addressEn: '', phoneNo: '', gender: '', roleId: '', positionId: '', image: '',
            fNameVi_ERR: '', fNameEn_ERR: '', lNameVi_ERR: '', lNameEn_ERR: '', email_ERR: '', password_ERR: '', addressVi_ERR: '', addressEn_ERR: '', phoneNo_ERR: '',

            action: '',
            update_id: '',
            openModal: false

        }
    }

    async componentDidMount() {

        this.props.fetchGenderStart()
        this.props.fetchRoleStart()
        this.props.fetchPositionStart()

    }
    componentDidUpdate = (prevProps, prevState) => {
        let { genders, roles, positions, usersFromRedux } = this.props
        if (this.props.genders !== prevProps.genders || this.props.roles !== prevProps.roles || this.props.positions !== prevProps.positions) {
            this.setState({
                genders: genders,
                gender: genders && genders.length > 0 ? genders[0].key : '',
                roles: roles,
                roleId: roles && roles.length > 0 ? roles[0].key : '',
                positions: positions,
                positionId: positions && positions.length > 0 ? positions[0].key : ''
            })
        }
        if (prevProps.usersFromRedux !== usersFromRedux) {
            this.setState({
                fNameVi: '', fNameEn: '', lNameVi: '', lNameEn: '', email: '', password: '', addressVi: '', addressEn: '', phoneNo: '', image: '',
                gender: genders && genders.length > 0 ? genders[0].key : '',
                roleId: roles && roles.length > 0 ? roles[0].key : '',
                positionId: positions && positions.length > 0 ? positions[0].key : '',
                action: utils.CRUD.CREATE,
                openModal: false
            })
        }
    }

    handleOnChangeAvatar = async (e) => {
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
    checkValidData = () => {
        let isValid = true
        let { fNameVi, fNameEn, lNameVi, lNameEn, email, password, addressVi, addressEn, phoneNo } = this.state
        if (!fNameVi) {
            this.setState({ fNameVi_ERR: <FormattedMessage id="users.user-redux.body.error1" /> })
            isValid = false
        }
        if (!fNameEn) {
            this.setState({ fNameEn_ERR: <FormattedMessage id="users.user-redux.body.error2" /> })
            isValid = false
        }
        if (!lNameVi) {
            this.setState({ lNameVi_ERR: <FormattedMessage id="users.user-redux.body.error3" /> })
            isValid = false
        }
        if (!lNameEn) {
            this.setState({ lNameEn_ERR: <FormattedMessage id="users.user-redux.body.error4" /> })
            isValid = false
        }
        if (!email) {
            this.setState({ email_ERR: <FormattedMessage id="users.user-redux.body.error5" /> })
            isValid = false
        }
        if (!password) {
            this.setState({ password_ERR: <FormattedMessage id="users.user-redux.body.error6" /> })
            isValid = false
        }
        if (!addressVi) {
            this.setState({ addressVi_ERR: <FormattedMessage id="users.user-redux.body.error7" /> })
            isValid = false
        }
        if (!addressEn) {
            this.setState({ addressEn_ERR: <FormattedMessage id="users.user-redux.body.error8" /> })
            isValid = false
        }
        if (!phoneNo) {
            this.setState({ phoneNo_ERR: <FormattedMessage id="users.user-redux.body.error9" /> })
            isValid = false
        }
        return isValid
    }
    handleSaveOrUpdateUser = () => {
        this.setState({
            fNameVi_ERR: '', fNameEn_ERR: '', lNameVi_ERR: '', lNameEn_ERR: '', email_ERR: '', password_ERR: '', addressVi_ERR: '', addressEn_ERR: '', phoneNo_ERR: ''
        })
        let checkValid = this.checkValidData()
        if (checkValid) {
            let { fNameVi, fNameEn, lNameVi, lNameEn, email, password, addressVi, addressEn, phoneNo, gender, roleId, positionId, image, action, update_id } = this.state

            if (action === utils.CRUD.CREATE) {
                this.props.addNewUserReduxStart({
                    fNameVi, fNameEn, lNameVi, lNameEn, email, password, addressVi, addressEn, phoneNo, gender, roleId, positionId, image
                })
            } else {
                this.props.updateUserReduxStart({
                    id: update_id,
                    fNameVi, fNameEn, lNameVi, lNameEn, email, addressVi, addressEn, phoneNo, gender, roleId, positionId, image
                })
            }
        }
    }

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }
    handleResetError = () => {
        let { genders, roles, positions } = this.props
        this.setState({
            fNameVi_ERR: '', fNameEn_ERR: '', lNameVi_ERR: '', lNameEn_ERR: '', email_ERR: '', password_ERR: '', addressVi_ERR: '', addressEn_ERR: '', phoneNo_ERR: '', fNameVi: '', fNameEn: '', lNameVi: '', lNameEn: '', email: '', password: '', addressVi: '', addressEn: '', phoneNo: '', previewImgURL: '',
            action: utils.CRUD.CREATE,
            gender: genders && genders.length > 0 ? genders[0].key : '',
            roleId: roles && roles.length > 0 ? roles[0].key : '',
            positionId: positions && positions.length > 0 ? positions[0].key : ''
        })
    }



    handleUpdateUserFromParents = async (user) => {
        let { id, fNameVi, fNameEn, lNameVi, lNameEn, email, addressVi, addressEn, phoneNo, gender, roleId, positionId, image } = user
        let imageBase64 = '', objectUrl = ''
        imageBase64 = Buffer(image, 'base64').toString('ascii')
        let blob = await utils.CommonUtils.b64toBlob(imageBase64);
        objectUrl = URL.createObjectURL(blob)

        this.setState({
            fNameVi, fNameEn, lNameVi, lNameEn, email, password: 'HARDCODE', addressVi, addressEn, phoneNo, gender, roleId, positionId,
            image: imageBase64,
            action: utils.CRUD.UPDATE,
            update_id: id,
            openModal: !this.state.openModal,
            previewImgURL: objectUrl
        })
    }

    handleOpenModal = () => {
        this.setState({ openModal: !this.state.openModal })
        this.handleResetError()
    }

    render() {
        let { genders, roles, positions, previewImgURL, isOpenImg, fNameVi, fNameEn, lNameVi, lNameEn, email, password, addressVi, addressEn, phoneNo, fNameVi_ERR, fNameEn_ERR, lNameVi_ERR, lNameEn_ERR, email_ERR, password_ERR, addressVi_ERR, addressEn_ERR, phoneNo_ERR, gender, roleId, positionId, action, openModal } = this.state
        let { language, isLoadingGender, isLoadingRole, isLoadingPosition } = this.props
        return (
            <div className="content-wrapper">
                <Modal zIndex={1} keyboard={false} backdrop='static' size='lg' isOpen={openModal}>
                    <ModalHeader toggle={() => this.handleOpenModal()}>
                        {action === utils.CRUD.UPDATE ? <FormattedMessage id="users.user-redux.title.title3" /> : <FormattedMessage id="users.user-redux.title.title1" />}
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label><FormattedMessage id="users.user-redux.body.text1" /></label>
                                <input value={fNameVi} onChange={(e) => this.handleOnChangeInput(e, 'fNameVi')} type="text" className="form-control" />
                                <span className='text-danger'>{fNameVi_ERR}</span>
                            </div>
                            <div className="form-group col-md-6">
                                <label><FormattedMessage id="users.user-redux.body.text2" /></label>
                                <input value={fNameEn} onChange={(e) => this.handleOnChangeInput(e, 'fNameEn')} type="text" className="form-control" />
                                <span className='text-danger'>{fNameEn_ERR}</span>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label><FormattedMessage id="users.user-redux.body.text3" /></label>
                                <input value={lNameVi} onChange={(e) => this.handleOnChangeInput(e, 'lNameVi')} type="text" className="form-control" />
                                <span className='text-danger'>{lNameVi_ERR}</span>
                            </div>
                            <div className="form-group col-md-6">
                                <label><FormattedMessage id="users.user-redux.body.text4" /></label>
                                <input value={lNameEn} onChange={(e) => this.handleOnChangeInput(e, 'lNameEn')} type="text" className="form-control" />
                                <span className='text-danger'>{lNameEn_ERR}</span>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label><FormattedMessage id="users.user-redux.body.text5" /></label>
                                <input value={email} onChange={(e) => this.handleOnChangeInput(e, 'email')} type="text" className="form-control" />

                                <span className='text-danger'>{email_ERR}</span>
                            </div>
                            <div className="form-group col-md-6">
                                <label><FormattedMessage id="users.user-redux.body.text6" /></label>
                                <input disabled={action === utils.CRUD.UPDATE} value={password} onChange={(e) => this.handleOnChangeInput(e, 'password')} type="password" className="form-control" />
                                <span className='text-danger'>{password_ERR}</span>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label><FormattedMessage id="users.user-redux.body.text7" /></label>
                                <input value={addressVi} onChange={(e) => this.handleOnChangeInput(e, 'addressVi')} type="text" className="form-control" />
                                <span className='text-danger'>{addressVi_ERR}</span>
                            </div>
                            <div className="form-group col-md-6">
                                <label><FormattedMessage id="users.user-redux.body.text8" /></label>
                                <input value={addressEn} onChange={(e) => this.handleOnChangeInput(e, 'addressEn')} type="text" className="form-control" />
                                <span className='text-danger'>{addressEn_ERR}</span>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label><FormattedMessage id="users.user-redux.body.text9" /></label>
                                <input value={phoneNo} onChange={(e) => this.handleOnChangeInput(e, 'phoneNo')} type="text" className="form-control" />
                                <span className='text-danger'>{phoneNo_ERR}</span>
                            </div>
                            <div className="form-group col-md-4">
                                <label><FormattedMessage id="users.user-redux.body.text10" /> {isLoadingGender === true ? <CircularProgress size="1rem" /> : ''}</label>
                                <select value={gender} onChange={(e) => this.handleOnChangeInput(e, 'gender')} className="custom-select">
                                    {genders && genders.length > 0 ?
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === 'en' ? item.valueEn : item.valueVi}</option>
                                            )
                                        }) : <option>Something went wrong..</option>}
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label><FormattedMessage id="users.user-redux.body.text11" /> {isLoadingRole === true ? <CircularProgress size="1rem" /> : ''}</label>

                                <select value={roleId} onChange={(e) => this.handleOnChangeInput(e, 'roleId')} className="custom-select">
                                    {roles && roles.length > 0 ?
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === 'en' ? item.valueEn : item.valueVi}</option>
                                            )
                                        }) : <option>Something went wrong..</option>}
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label><FormattedMessage id="users.user-redux.body.text12" /> {isLoadingPosition === true ? <CircularProgress size="1rem" /> : ''}</label>

                                <select value={positionId} onChange={(e) => this.handleOnChangeInput(e, 'positionId')} className="custom-select">
                                    {positions && positions.length > 0 ?
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>{language === 'en' ? item.valueEn : item.valueVi}</option>
                                            )
                                        }) : <option>Something went wrong..</option>}
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label><FormattedMessage id="users.user-redux.body.text13" /></label>
                                <div className='upload-avatar'>
                                    <input onChange={(e) => this.handleOnChangeAvatar(e)} id='input-file' type='file' hidden />
                                    <label className='cus-btn-upload-image btn btn-warning' htmlFor='input-file'><FormattedMessage id="users.user-redux.body.text14" /> <i className="fa-solid fa-upload"></i></label>
                                    <div onClick={() => this.handleOpenImg()} style={{ backgroundImage: `url(${previewImgURL})` }} className={previewImgURL !== '' ? 'preview exist' : 'preview'}></div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => { this.handleSaveOrUpdateUser() }} color={action === utils.CRUD.UPDATE ? "success" : "primary"}>
                            {action === utils.CRUD.UPDATE ? <FormattedMessage id="users.user-redux.footer.button2" /> : <FormattedMessage id="users.user-redux.footer.button1" />}
                        </Button>{' '}
                        <Button color="secondary" onClick={() => this.handleOpenModal()}>
                            {action === utils.CRUD.UPDATE ? <FormattedMessage id="users.user-redux.footer.button3" /> : <FormattedMessage id="users.user-redux.footer.button3" />}
                        </Button>
                    </ModalFooter>
                </Modal>
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h6 className="m-0 text-info"><FormattedMessage id='menu.admin.manage1' /> / <FormattedMessage id='menu.admin.manage1-details.detail2' /></h6>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                <div className="content cus-font">
                    <div className="container">
                        <UserReduxTable
                            language={this.props.language}
                            handleUpdateUserFromParents={this.handleUpdateUserFromParents}
                            action={action}
                            handleOpenModalFromParents={this.handleOpenModal} />
                        {/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {isOpenImg &&
                    <Lightbox
                        mainSrc={previewImgURL}
                        onCloseRequest={() => this.setState({ isOpenImg: false })}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        roles: state.admin.roles,
        isLoadingRole: state.admin.isLoadingRole,
        positions: state.admin.positions,
        isLoadingPosition: state.admin.isLoadingPosition,
        usersFromRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        addNewUserReduxStart: (data) => dispatch(actions.addNewUserReduxStart(data)),
        updateUserReduxStart: (data) => dispatch(actions.updateUserReduxStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import UserReduxTable from './UserReduxTable';
import * as actions from '../../../../store/actions'
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import * as utils from '../../../../utils'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genders: [],
            roles: [],
            positions: [],
            previewImgURL: '',
            isOpenImg: false,

            fNameVi: '', fNameEn: '', lNameVi: '', lNameEn: '', email: '', password: '', addressVi: '', addressEn: '', phoneNo: '', genderId: '', roleId: '', positionId: '', image: '',
            fNameVi_ERR: '', fNameEn_ERR: '', lNameVi_ERR: '', lNameEn_ERR: '', email_ERR: '', password_ERR: '', addressVi_ERR: '', addressEn_ERR: '', phoneNo_ERR: '',

            action: '',
            update_id: '',
            openModal: false

        }
    }

    async componentDidMount() {

        this.props.fetchGenderRolePositionStart()

    }
    componentDidUpdate = (prevProps, prevState) => {
        let { gendersRolesPositionsData, usersFromRedux } = this.props
        if (gendersRolesPositionsData !== prevProps.gendersRolesPositionsData) {
            if (gendersRolesPositionsData) {
                let genders = gendersRolesPositionsData.genders
                let roles = gendersRolesPositionsData.roles
                let positions = gendersRolesPositionsData.positions
                this.setState({
                    genders, roles, positions,
                    genderId: genders && genders.length > 0 ? genders[0].keyMap : '',
                    roleId: roles && roles.length > 0 ? roles[0].keyMap : '',
                    positionId: positions && positions.length > 0 ? positions[0].keyMap : ''
                })
            }

        }
        if (prevProps.usersFromRedux !== usersFromRedux) {
            if (gendersRolesPositionsData) {
                let genders = gendersRolesPositionsData.genders
                let roles = gendersRolesPositionsData.roles
                let positions = gendersRolesPositionsData.positions
                this.setState({
                    fNameVi: '', fNameEn: '', lNameVi: '', lNameEn: '', email: '', password: '', addressVi: '', addressEn: '', phoneNo: '', image: '',
                    genderId: genders && genders.length > 0 ? genders[0].keyMap : '',
                    roleId: roles && roles.length > 0 ? roles[0].keyMap : '',
                    positionId: positions && positions.length > 0 ? positions[0].keyMap : '',
                    action: utils.CRUD.CREATE,
                    openModal: false
                })
            }
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
            let { fNameVi, fNameEn, lNameVi, lNameEn, email, password, addressVi, addressEn, phoneNo, genderId, roleId, positionId, image, action, update_id } = this.state
            if (action === utils.CRUD.CREATE) {
                this.props.addNewUserReduxStart({
                    fNameVi, fNameEn, lNameVi, lNameEn, email, password, addressVi, addressEn, phoneNo, genderId, roleId, positionId, image
                })
            } else {
                this.props.updateUserReduxStart({
                    id: update_id,
                    fNameVi, fNameEn, lNameVi, lNameEn, email, addressVi, addressEn, phoneNo, genderId, roleId, positionId, image
                })
            }
        } else {
            toast.error(<FormattedMessage id='manage-specialties.toast-error' />)
        }
    }

    handleOnChangeInput = (e, key) => {
        let value = e.target.value
        let copyState = { ...this.state }
        copyState[key] = value
        this.setState({ ...copyState })
    }
    handleResetError = () => {
        let { gendersRolesPositionsData } = this.props
        let { genders, roles, positions } = gendersRolesPositionsData
        this.setState({
            fNameVi_ERR: '', fNameEn_ERR: '', lNameVi_ERR: '', lNameEn_ERR: '', email_ERR: '', password_ERR: '', addressVi_ERR: '', addressEn_ERR: '', phoneNo_ERR: '', fNameVi: '', fNameEn: '', lNameVi: '', lNameEn: '', email: '', password: '', addressVi: '', addressEn: '', phoneNo: '', previewImgURL: '',
            action: utils.CRUD.CREATE,
            genderId: genders && genders.length > 0 ? genders[0].keyMap : '',
            roleId: roles && roles.length > 0 ? roles[0].keyMap : '',
            positionId: positions && positions.length > 0 ? positions[0].keyMap : ''
        })
    }
    handleUpdateUserFromParents = (user) => {
        let { id, fNameVi, fNameEn, lNameVi, lNameEn, email, addressVi, addressEn, phoneNo, genderId, roleId, positionId, image } = user
        let imageBase64 = '', objectUrl = ''
        // no image
        if (image.data.length === 0) {
            imageBase64 = ''
            objectUrl = ''
        } else {
            imageBase64 = Buffer.from(image, 'base64').toString('ascii')
            let blob = utils.CommonUtils.b64toBlob(imageBase64)
            objectUrl = URL.createObjectURL(blob)
        }
        this.setState({
            fNameVi, fNameEn, lNameVi, lNameEn, email, password: 'HARDCODE', addressVi, addressEn, phoneNo, genderId, roleId, positionId,
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
        let { genders, roles, positions, previewImgURL, isOpenImg, fNameVi, fNameEn, lNameVi, lNameEn, email, password, addressVi, addressEn, phoneNo, fNameVi_ERR, fNameEn_ERR, lNameVi_ERR, lNameEn_ERR, email_ERR, password_ERR, addressVi_ERR, addressEn_ERR, phoneNo_ERR, genderId, roleId, positionId, action, openModal } = this.state
        let { language } = this.props
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
                                <label><FormattedMessage id="users.user-redux.body.text10" /></label>
                                <select value={genderId} onChange={(e) => this.handleOnChangeInput(e, 'genderId')} className="custom-select">
                                    {genders && genders.length > 0 ?
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === 'en' ? item.valueEn : item.valueVi}</option>
                                            )
                                        }) : <option>Something went wrong..</option>}
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label><FormattedMessage id="users.user-redux.body.text11" /></label>

                                <select value={roleId} onChange={(e) => this.handleOnChangeInput(e, 'roleId')} className="custom-select">
                                    {roles && roles.length > 0 ?
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === 'en' ? item.valueEn : item.valueVi}</option>
                                            )
                                        }) : <option>Something went wrong..</option>}
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label><FormattedMessage id="users.user-redux.body.text12" /></label>
                                <select value={positionId} onChange={(e) => this.handleOnChangeInput(e, 'positionId')} className="custom-select">
                                    {positions && positions.length > 0 ?
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === 'en' ? item.valueEn : item.valueVi}</option>
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
        gendersRolesPositionsData: state.admin.gendersRolesPositionsData,
        usersFromRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderRolePositionStart: () => dispatch(actions.fetchGenderRolePositionStart()),
        addNewUserReduxStart: (data) => dispatch(actions.addNewUserReduxStart(data)),
        updateUserReduxStart: (data) => dispatch(actions.updateUserReduxStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

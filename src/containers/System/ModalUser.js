import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { emitter } from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fNameVi: '', fNameEn: '', lNameVi: '', lNameEn: '', email: '', password: '', addressVi: '', addressEn: '', phoneNo: '', gender: 'M', roleId: 'R1', showPassword: false,
            err_fNameVi: '', err_fNameEn: '', err_lNameVi: '', err_lNameEn: '', err_email: '', err_password: '', err_addressVi: '', err_addressEn: '', err_phoneNo: '',
            no_msg: ''
        }
        this.listenEmitter()
    }
    listenEmitter() {
        emitter.on('CLEAR_MODAL_DATA', () => {
            this.setState({
                fNameVi: '', fNameEn: '', lNameVi: '', lNameEn: '', email: '', password: '', addressVi: '', addressEn: '', phoneNo: '', gender: 'M', roleId: 'R1', showPassword: false,
                err_fNameVi: '', err_fNameEn: '', err_lNameVi: '', err_lNameEn: '', err_email: '', err_password: '', err_addressVi: '', err_addressEn: '', err_phoneNo: ''
            })
        })
    }
    componentDidMount() {
    }
    toogle = () => {
        this.props.toogleFromParent()
    }
    handleOnChangeInput = (e) => {
        let copyState = { ...this.state }
        copyState[e.target.name] = e.target.value
        this.setState({
            ...copyState
        })
    }
    checkValidData = () => {
        let isValid = true
        let { fNameVi, fNameEn, lNameVi, lNameEn, email, password, addressVi, addressEn, phoneNo } = this.state
        if (!fNameVi) {
            this.setState({ err_fNameVi: 'Please enter your First name Vi' })
            isValid = false
        }
        if (!fNameEn) {
            this.setState({ err_fNameEn: 'Please enter your First name En' })
            isValid = false
        }
        if (!lNameVi) {
            this.setState({ err_lNameVi: 'Please enter your Last name Vi' })
            isValid = false
        }
        if (!lNameEn) {
            this.setState({ err_lNameEn: 'Please enter your Last name En' })
            isValid = false
        }
        if (!email) {
            this.setState({ err_email: 'Please enter your Email' })
            isValid = false
        }
        if (!password) {
            this.setState({ err_password: 'Please enter your Password' })
            isValid = false
        }
        if (!addressVi) {
            this.setState({ err_addressVi: 'Please enter your Address Vi' })
            isValid = false
        }
        if (!addressEn) {
            this.setState({ err_addressEn: 'Please enter your Adrress En' })
            isValid = false
        }
        if (!phoneNo) {
            this.setState({ err_phoneNo: 'Please enter your Phone number' })
            isValid = false
        }
        return isValid
    }
    handleClickCreateButton = () => {
        let { createNewUser } = this.props
        this.setState({
            err_fNameVi: '', err_fNameEn: '', err_lNameVi: '', err_lNameEn: '', err_email: '', err_password: '', err_addressVi: '', err_addressEn: '', err_phoneNo: ''
        })
        let checkValid = this.checkValidData()
        if (checkValid) {
            createNewUser(this.state)
        }
    }
    handleShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    render() {
        let { isOpen, msg } = this.props
        let { no_msg, fNameVi, err_fNameVi, fNameEn, err_fNameEn, lNameVi, err_lNameVi, lNameEn, err_lNameEn, email, err_email, password, err_password, addressVi, err_addressVi, addressEn, err_addressEn, phoneNo, err_phoneNo, gender, roleId, showPassword } = this.state
        return (
            <Modal isOpen={isOpen} toggle={() => this.toogle()} >
                <ModalHeader toggle={() => this.toogle()}>Add New User</ModalHeader>
                <ModalBody>
                    <div className="card-body">
                        <div className='row'>
                            <div className="col-6">
                                <div className='form-group'>
                                    <label>First Name Vi</label>
                                    <input name='fNameVi' value={fNameVi} onChange={(e) => this.handleOnChangeInput(e)} type="text" className="form-control" placeholder="Enter First Name Vi" />
                                    <span className='text-danger'>{err_fNameVi}</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='form-group'>
                                    <label>First Name En</label>
                                    <input name='fNameEn' value={fNameEn} onChange={(e) => this.handleOnChangeInput(e)} type="text" className="form-control" placeholder="Enter First Name En" />
                                    <span className='text-danger'>{err_fNameEn}</span>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-6">
                                <div className='form-group'>
                                    <label>Last Name Vi</label>
                                    <input name='lNameVi' value={lNameVi} onChange={(e) => this.handleOnChangeInput(e)} type="text" className="form-control" placeholder="Enter Last Name Vi" />
                                    <span className='text-danger'>{err_lNameVi}</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='form-group'>
                                    <label>Last Name En</label>
                                    <input name='lNameEn' value={lNameEn} onChange={(e) => this.handleOnChangeInput(e)} type="text" className="form-control" placeholder="Enter Last Name Vi" />
                                    <span className='text-danger'>{err_lNameEn}</span>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-6">
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input name='email' value={email} onChange={(e) => this.handleOnChangeInput(e)} type="text" className="form-control" placeholder="Enter Email" />
                                    <span className='text-danger'>{err_email}</span>
                                    <span className='text-danger'>{msg === '' ? no_msg : msg}</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='form-group'>
                                    <label>Password</label>
                                    <input name='password' value={password} onChange={(e) => this.handleOnChangeInput(e)} type={showPassword ? 'text' : 'password'} className="form-control" placeholder="Enter Password" />
                                    <span onClick={() => this.handleShowPassword()}>{!showPassword ? <i className="custom-position-eye hover fas fa-eye"></i> : <i className="custom-position-eye hover fas fa-eye-slash"></i>}</span>
                                    <span className='text-danger'>{err_password}</span>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-6">
                                <div className='form-group'>
                                    <label>Address Vi</label>
                                    <textarea name='addressVi' value={addressVi} onChange={(e) => this.handleOnChangeInput(e)} type="text" className="form-control" placeholder="Enter Address Vi"></textarea>
                                    <span className='text-danger'>{err_addressVi}</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='form-group'>
                                    <label>Address En</label>
                                    <textarea name='addressEn' value={addressEn} onChange={(e) => this.handleOnChangeInput(e)} type="text" className="form-control" placeholder="Enter Address En"></textarea>
                                    <span className='text-danger'>{err_addressEn}</span>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-4">
                                <div className='form-group'>
                                    <label>Phone No</label>
                                    <input name='phoneNo' value={phoneNo} onChange={(e) => this.handleOnChangeInput(e)} type="text" className="form-control" placeholder="Enter Phone No" />
                                    <span className='text-danger'>{err_phoneNo}</span>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className='form-group'>
                                    <label>Gender</label>
                                    <select name='gender' value={gender} onChange={(e) => this.handleOnChangeInput(e)} className="form-control">
                                        <option value='M'>Male</option>
                                        <option value='F'>Female</option>
                                        <option value='O'>Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className='form-group'>
                                    <label>Role</label>
                                    <select name='roleId' value={roleId} onChange={(e) => this.handleOnChangeInput(e)} className="form-control">
                                        <option value={'R1'}>Admin</option>
                                        <option value={'R2'}>Doctor</option>
                                        <option value={'R3'}>Patient</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => this.handleClickCreateButton()} color="primary">
                        Create
                    </Button>{' '}
                    <Button color="secondary" onClick={() => this.toogle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

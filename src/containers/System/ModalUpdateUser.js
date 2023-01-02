import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
class ModalUpdateUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            fNameVi: '', fNameEn: '', lNameVi: '', lNameEn: '', email: '', addressVi: '', addressEn: '', phoneNo: '', gender: 'M', roleId: 'R1',
            err_fNameVi: '', err_fNameEn: '', err_lNameVi: '', err_lNameEn: '', err_email: '', err_password: '', err_addressVi: '', err_addressEn: '', err_phoneNo: '',
            no_msg: ''
        }
    }
    componentDidMount() {
    }
    async componentDidUpdate(prevProps, prevState) {
        let { user } = this.props
        if (user && !_.isEmpty(user) && user !== prevProps.user && this.state === prevState) {
            this.setState({
                id: user.id, fNameVi: user.fNameVi, fNameEn: user.fNameEn, lNameVi: user.lNameVi, lNameEn: user.lNameEn, email: user.email, addressVi: user.addressVi, addressEn: user.addressEn, phoneNo: user.phoneNo, gender: user.gender, roleId: user.roleId
            })
        }
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
        let { fNameVi, fNameEn, lNameVi, lNameEn, email, addressVi, addressEn, phoneNo } = this.state
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
    handleClickUpdateButton = () => {
        let { updateUser } = this.props
        this.setState({
            err_fNameVi: '', err_fNameEn: '', err_lNameVi: '', err_lNameEn: '', err_email: '', err_addressVi: '', err_addressEn: '', err_phoneNo: ''
        })
        let checkValid = this.checkValidData()
        if (checkValid) {
            updateUser(this.state)
        }
    }

    render() {
        let { isOpen, msg } = this.props
        let { no_msg, fNameVi, err_fNameVi, fNameEn, err_fNameEn, lNameVi, err_lNameVi, lNameEn, err_lNameEn, email, err_email, addressVi, err_addressVi, addressEn, err_addressEn, phoneNo, err_phoneNo, gender, roleId } = this.state
        return (
            <Modal backdrop={'static'} keyboard={false} size={'lg'} isOpen={isOpen} toggle={() => this.toogle()} className={'modal-user-container'}>
                <ModalHeader toggle={() => this.toogle()}>Update User</ModalHeader>
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
                            <div className="col-12">
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input name='email' value={email} onChange={(e) => this.handleOnChangeInput(e)} type="text" className="form-control" placeholder="Enter Email" />
                                    <span className='text-danger'>{err_email}</span>
                                    <span className='text-danger'>{msg === '' ? no_msg : msg}</span>
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
                    <Button color="success" onClick={() => this.handleClickUpdateButton()}>
                        Update
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUpdateUser);

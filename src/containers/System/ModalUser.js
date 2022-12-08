import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
    }
    toogle = () => {
        this.props.toogleFromParent()
    }

    render() {
        console.log('>>>', this.props)
        let { isOpen } = this.props
        return (
            <Modal size={'lg'} isOpen={isOpen} toggle={() => this.toogle()} className={'modal-user-container'}>
                <ModalHeader toggle={() => this.toogle()}>Add New User</ModalHeader>
                <ModalBody>
                    <div className="card-body">
                        <div className='row'>
                            <div className="col-6">
                                <div className='form-group'>
                                    <label>First Name Vi</label>
                                    <input type="text" className="form-control" placeholder="Enter First Name Vi" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='form-group'>
                                    <label>First Name En</label>
                                    <input type="text" className="form-control" placeholder="Enter First Name En" />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-6">
                                <div className='form-group'>
                                    <label>Last Name Vi</label>
                                    <input type="text" className="form-control" placeholder="Enter Last Name Vi" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='form-group'>
                                    <label>Last Name Vi</label>
                                    <input type="text" className="form-control" placeholder="Enter Last Name Vi" />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-6">
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input type="text" className="form-control" placeholder="Enter Email" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='form-group'>
                                    <label>Password</label>
                                    <input type="text" className="form-control" placeholder="Enter Password" />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-6">
                                <div className='form-group'>
                                    <label>Address Vi</label>
                                    <textarea type="text" className="form-control" placeholder="Enter Address Vi"></textarea>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='form-group'>
                                    <label>Address En</label>
                                    <textarea type="text" className="form-control" placeholder="Enter Address En"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-4">
                                <div className='form-group'>
                                    <label>Phone No</label>
                                    <input type="text" className="form-control" placeholder="Enter Phone No" />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className='form-group'>
                                    <label>Gender</label>
                                    <select className="form-control">
                                        <option value={0}>Male</option>
                                        <option value={1}>Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-4">

                                <div className='form-group'>
                                    <label>Role</label>
                                    <select className="form-control">
                                        <option value={0}>Admin</option>
                                        <option value={1}>Doctor</option>
                                        <option value={2}>Patient</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.toogle()}>
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

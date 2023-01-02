import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import * as services from '../../services'
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import { toast } from 'react-toastify';
import ModalUpdateUser from './ModalUpdateUser';
class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            stateOfModal: false,
            stateOfUpdateModal: false,
            msg: '',
            userInfo: {}
        }
    }

    async componentDidMount() {
        await this.handleGetAllUsers()
    }
    handleGetAllUsers = async () => {
        let response = await services.getAllUsers('ALL')
        if (response && response.errCode === '0') {
            this.setState({
                users: response.users
            })
        }
    }

    handleCLickAddUser = () => {
        this.setState({
            stateOfModal: true, msg: ''
        })
        emitter.emit('CLEAR_MODAL_DATA')
    }

    toogle = () => {
        this.setState({
            stateOfModal: !this.state.stateOfModal
        })
    }
    toogleUpdate = () => {
        this.setState({
            stateOfUpdateModal: !this.state.stateOfUpdateModal
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await services.createNewUser(data)

            if (response && response.errCode) {
                if (response.errCode === '1') {
                    this.setState({ msg: response.msg })
                }
                else {
                    toast.success(response.msg)
                    this.setState({ stateOfModal: false, msg: '' })
                    await this.handleGetAllUsers()

                    emitter.emit('CLEAR_MODAL_DATA')
                }
            }
        } catch (e) { console.log(e) }
    }
    updateUser = async (data) => {
        try {
            let response = await services.updateUser(data)
            if (response && response.errCode) {
                if (response.errCode === '1') {
                    this.setState({ msg: response.msg })
                }
                else {
                    toast.success(response.msg)
                    this.setState({ stateOfUpdateModal: false, msg: '' })
                    await this.handleGetAllUsers()
                }
            }
        } catch (e) { console.log(e) }
    }
    handleClickDeleteIcon = async (data) => {
        try {
            let response = await services.deleteUser(data.id)
            if (response && response.errCode) {
                if (response.errCode === '1') {
                    alert(response.msg)
                }
                else {
                    await this.handleGetAllUsers()
                    toast.success(response.msg)
                }
            }
        } catch (e) { console.log(e) }
    }
    handleClickUpdateIcon = (data) => {
        this.setState({
            stateOfUpdateModal: true,
            userInfo: data
        })
    }

    render() {
        let { users, stateOfModal, stateOfUpdateModal, msg, userInfo } = this.state
        return (
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Manage Users</h1>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <div className="content cus-font">
                    <div className="container">
                        <div className="row">
                            <div className='col-12'>
                                <div className='card'>
                                    <div className='card-header'>
                                        <h3 className='card-title'>User List</h3>
                                    </div>
                                    <div className='card-body'>
                                        <table className='table table-hover'>
                                            <tbody>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Email</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Address</th>
                                                    <th className='text-center' colSpan="2"><i onClick={() => this.handleCLickAddUser()} className="far fa-plus-square text-primary custom-fs-lg hover"></i></th>
                                                </tr>
                                                {users && users.length > 0 &&
                                                    users.map((item, index) => {
                                                        return (
                                                            <tr key={item.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.fNameVi}</td>
                                                                <td>{item.lNameVi}</td>
                                                                <td>{item.addressVi}</td>
                                                                <td className='text-center'><i onClick={() => this.handleClickUpdateIcon(item)} className="fas fa-pen text-success custom-fs-md hover"></i></td>
                                                                <td className='text-center'><i onClick={() => this.handleClickDeleteIcon(item)} className="fas fa-trash text-danger custom-fs-md hover"></i></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                <ModalUser
                    isOpen={stateOfModal}
                    toogleFromParent={this.toogle}
                    createNewUser={this.createNewUser}
                    msg={msg} />
                <ModalUpdateUser
                    isOpen={stateOfUpdateModal}
                    toogleFromParent={this.toogleUpdate}
                    updateUser={this.updateUser}
                    msg={msg}
                    user={userInfo} />

                {/* /.content */}
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

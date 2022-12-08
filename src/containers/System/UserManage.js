import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import * as services from '../../services'
import ModalUser from './ModalUser';
class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            stateOfModal: false
        }
    }

    async componentDidMount() {
        let response = await services.getAllUsers('ALL')
        // console.log('response from backend: ', response)
        if (response && response.errCode === 0) {
            this.setState({
                users: response.users
            })
        }
    }

    handleCLickAddUser = () => {
        this.setState({
            stateOfModal: true
        })
    }

    toogle = () => {
        this.setState({
            stateOfModal: !this.state.stateOfModal
        })
    }

    render() {
        let { users, stateOfModal } = this.state
        return (
            <div className="users-container">
                <div className='title'>Manage Users</div>
                <div className='users-table mt-3 mx-3'>
                    <table className='table table-hover'>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th className='text-center' colSpan="2"><i onClick={() => this.handleCLickAddUser()} className="far fa-plus-square text-primary fs-4 hover"></i></th>
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
                                            <td className='text-center'><i className="fas fa-pen text-success fs-5 hover"></i></td>
                                            <td className='text-center'><i className="fas fa-trash text-danger fs-5 hover"></i></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody></table>

                </div>
                <ModalUser
                    isOpen={stateOfModal}
                    toogleFromParent={this.toogle} />
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

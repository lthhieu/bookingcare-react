import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">User Redux</h1>
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
                                        <h3 className='card-title'>User Redux List</h3>
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
                                                <tr>
                                                    <td>1</td>
                                                    <td>Email 1</td>
                                                    <td>Fname 1</td>
                                                    <td>Lname 1</td>
                                                    <td>Address 1</td>
                                                    <td className='text-center'><i className="fas fa-pen text-success custom-fs-md hover"></i></td>
                                                    <td className='text-center'><i className="fas fa-trash text-danger custom-fs-md hover"></i></td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Email 2</td>
                                                    <td>Fname 2</td>
                                                    <td>Lname 2</td>
                                                    <td>Address 2</td>
                                                    <td className='text-center'><i className="fas fa-pen text-success custom-fs-md hover"></i></td>
                                                    <td className='text-center'><i className="fas fa-trash text-danger custom-fs-md hover"></i></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* <ModalUser
                    isOpen={stateOfModal}
                    toogleFromParent={this.toogle}
                    createNewUser={this.createNewUser}
                    msg={msg} />
                <ModalUpdateUser
                    isOpen={stateOfUpdateModal}
                    toogleFromParent={this.toogleUpdate}
                    updateUser={this.updateUser}
                    msg={msg}
                    user={userInfo} /> */}

                {/* /.content */}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

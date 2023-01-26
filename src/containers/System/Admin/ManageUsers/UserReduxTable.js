import React, { Component, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions'
import * as utils from '../../../../utils'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'
import ReactPaginate from 'react-paginate';
class UserReduxTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        this.props.fetchUsersStart()
    }

    componentDidUpdate(prevProps, prevState) {
        let { usersFromRedux } = this.props
        if (prevProps.usersFromRedux !== usersFromRedux) {
            this.setState({
                users: usersFromRedux
            })
        }
    }
    handleDeleteUser = (data) => {
        this.props.deleteUserReduxStart(data)
    }

    handleUpdateUser = (data) => {
        let { handleUpdateUserFromParents } = this.props
        handleUpdateUserFromParents(data)
    }

    handleOpenModal = () => {
        this.props.handleOpenModalFromParents()
    }
    render() {
        let { language, isFetchingUsers } = this.props
        let { users } = this.state
        return (<>
            <div className="row">
                <div className='col-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className='card-title'><FormattedMessage id='users.user-redux.title.title2' /> {isFetchingUsers === true ? <CircularProgress size="1rem" /> : ''}</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>
                        </div>
                        <div className='card-body'>
                            <table className='table table-hover'>
                                <tbody>
                                    <tr>
                                        <th>#</th>
                                        <th><FormattedMessage id='users.user-redux.body.tableheader1' /></th>
                                        <th><FormattedMessage id='users.user-redux.body.tableheader2' /></th>
                                        <th><FormattedMessage id='users.user-redux.body.tableheader3' /></th>
                                        <th><FormattedMessage id='users.user-redux.body.tableheader4' /></th>
                                        <th className='text-center' colSpan={2}>
                                            <Tooltip placement='right' title={language === utils.LANGUAGES.VI ? 'Thêm mới' : 'Add new'}>
                                                <i onClick={() => this.handleOpenModal()} className='far fa-plus-square text-primary custom-fs-lg hover'></i>
                                            </Tooltip>
                                        </th>
                                    </tr>
                                    {users && users.length > 0 ?
                                        users.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.email}</td>
                                                    <td>{language === utils.LANGUAGES.VI ? item.fNameVi : item.fNameEn}</td>
                                                    <td>{language === utils.LANGUAGES.VI ? item.lNameVi : item.lNameEn}</td>
                                                    <td>{language === utils.LANGUAGES.VI ? item.addressVi : item.addressEn}</td>
                                                    <td onClick={() => this.handleUpdateUser(item)} className='text-center'>
                                                        <Tooltip placement='left' title={language === utils.LANGUAGES.VI ? 'Cập nhật' : 'Update'}>
                                                            <i className="fas fa-pen text-success custom-fs-md hover"></i>
                                                        </Tooltip>
                                                    </td>
                                                    <td onClick={() => this.handleDeleteUser(item.id)} className='text-center'>
                                                        <Tooltip placement='right' title={language === utils.LANGUAGES.VI ? 'Xóa' : 'Delete'}>
                                                            <i className="fas fa-trash text-danger custom-fs-md hover"></i>
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        : <tr><td>Something went wrong</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div></>
        )
    }

}

const mapStateToProps = state => {
    return {
        isFetchingUsers: state.admin.isFetchingUsers,
        usersFromRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersStart: () => dispatch(actions.fetchUsersStart()),
        deleteUserReduxStart: (data) => dispatch(actions.deleteUserReduxStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserReduxTable);

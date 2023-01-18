import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import * as menuApp from './menuApp';
import './Header.scss';
import bookingcareLogo from '../../assets/images/logo.svg'
import * as utils from '../../utils'
import { FormattedMessage } from 'react-intl';
import Tooltip from '@mui/material/Tooltip';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuHeader: [],
            time: new Date()
        }
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language)
    }
    componentDidMount() {
        let menu = []
        let { userInfo } = this.props
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId
            if (role === utils.USER_ROLE.ADMIN) {
                menu = menuApp.adminMenu
            } else if (role === utils.USER_ROLE.DOCTOR) {
                menu = menuApp.doctorMenu
            }
        }
        this.setState({
            menuHeader: menu
        })
        let hour = this.state.time.getHours()
        this.setState({ time: hour })
    }

    render() {
        let { menuHeader, time } = this.state
        let greeting = ''
        if (time >= 5 && time <= 12) {

        }
        else if (time >= 13 && time <= 18) {
            greeting = <FormattedMessage id="header-content-right.title3" />
        } else greeting = <FormattedMessage id="header-content-right.title4" />
        const { processLogout, language, userInfo } = this.props
        let welcome = ''
        if (userInfo && userInfo.fNameVi && userInfo.lNameVi && language === 'vi') { welcome = userInfo.fNameVi + ' ' + userInfo.lNameVi }
        else if (userInfo && userInfo.fNameEn && userInfo.lNameEn && language === 'en') { welcome = userInfo.fNameEn + ' ' + userInfo.lNameEn }
        else { welcome = '' }
        return (
            <nav style={{ zIndex: '1' }} className="cus-font main-header navbar navbar-expand-md navbar-light navbar-white" >
                <div className="container">
                    <a href="#" className="navbar-brand">
                        <img src={bookingcareLogo} className="brand-image" />
                    </a>
                    <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse order-3">
                        {/* Left navbar links */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <div className='nav-link'>
                                    <Navigator menus={menuHeader} />
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* Right navbar links */}
                    <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                        <li className="nav-item-cus">
                            <div className='welcome'>{greeting}, {welcome}!</div>
                        </li>
                        <li className="nav-item-cus">
                            <div className='flag'>
                                <Tooltip title={language === utils.LANGUAGES.VI ? 'Tiếng Việt' : 'Vietnamese'}>
                                    <div onClick={() => this.handleChangeLanguage(utils.LANGUAGES.VI)} className={language === utils.LANGUAGES.VI ? 'vi active' : 'vi'}></div>
                                </Tooltip>
                                <Tooltip title={language === utils.LANGUAGES.VI ? 'Tiếng Anh' : 'English'}>
                                    <div onClick={() => this.handleChangeLanguage(utils.LANGUAGES.EN)} className={language === utils.LANGUAGES.EN ? 'en active' : 'en'}></div>
                                </Tooltip>
                            </div>
                        </li>
                        <li className="nav-item-cus">
                            <Tooltip title={language === utils.LANGUAGES.VI ? 'Đăng xuất' : 'Log out'}>
                                <div className="btn btn-logout" onClick={processLogout}>
                                    <i className="fas fa-sign-out-alt cus-sign-out"></i>
                                </div>
                            </Tooltip>
                        </li>

                    </ul>
                </div>
            </nav>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguage: (data) => dispatch(actions.changeLanguage(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

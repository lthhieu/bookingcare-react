import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import bookingcareLogo from '../../assets/images/logo.svg'

import * as utils from '../../utils'
import { FormattedMessage } from 'react-intl';
import Tooltip from '@mui/material/Tooltip';

class Header extends Component {
    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language)
    }

    render() {
        const { processLogout, language, userInfo } = this.props
        let welcome = ''
        if (userInfo && userInfo.fNameVi && userInfo.lNameVi && language === 'vi') { welcome = userInfo.fNameVi + ' ' + userInfo.lNameVi }
        else if (userInfo && userInfo.fNameEn && userInfo.lNameEn && language === 'en') { welcome = userInfo.fNameEn + ' ' + userInfo.lNameEn }
        else { welcome = '' }
        return (
            // <>
            //     <div className='header-container'>
            //         <div className='header-content'>
            //             <div className='left-content left-content-admin'>
            //                 <div className='logo'></div>
            //             </div>
            //             <div className='center-content center-content-admin cus-font'>
            //                 <div className='child-content'>
            //                     <div className='title title-admin'><b>
            //                         <Navigator menus={adminMenu} />
            //                     </b></div>
            //                 </div>
            //             </div>
            //             <div className='right-content'>
            //                 <div className="btn btn-logout" onClick={processLogout}>
            //                     <i title={language === 'vi' ? 'Đăng xuất' : 'Log out'} className="fas fa-sign-out-alt cus-sign-out"></i>
            //                 </div>
            //                 <div className='flag'>
            //                     <div title='Việt Nam' onClick={() => this.handleChangeLanguage(utils.LANGUAGES.VI)} className={language === utils.LANGUAGES.VI ? 'vi active' : 'vi'}></div>
            //                     <div title='English' onClick={() => this.handleChangeLanguage(utils.LANGUAGES.EN)} className={language === utils.LANGUAGES.EN ? 'en active' : 'en'}></div>
            //                 </div>

            //             </div>
            //         </div>
            //     </div>
            // </>
            <nav style={{ zIndex: '1' }} className="cus-font main-header navbar navbar-expand-md navbar-light navbar-white" >
                <div className="container">
                    <a href="../../index3.html" className="navbar-brand">
                        <img src={bookingcareLogo} className="brand-image" />
                    </a>
                    <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse order-3" id="navbarCollapse">
                        {/* Left navbar links */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <div className='nav-link'>
                                    <Navigator menus={adminMenu} />
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* Right navbar links */}
                    <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                        <li className="nav-item-cus">
                            <div className='welcome'><FormattedMessage id="header-content-right.title2" />, {welcome}!</div>
                            {/* <div className='welcome'><FormattedMessage id="header-content-right.title2" />, {language === 'vi' ? userInfo.fNameVi + " " + userInfo.lNameVi : userInfo.fNameEn + '' + userInfo.lNameEn}!</div> */}
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

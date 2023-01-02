import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import bookingcareLogo from '../../assets/images/logo.svg'

import * as utils from '../../utils'

class Header extends Component {
    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language)
    }
    render() {
        const { processLogout, language } = this.props;

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
            <nav className="cus-font main-header navbar navbar-expand-md navbar-light navbar-white sticky-top">
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
                            <li className="nav-item dropdown">
                                <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">Dropdown</a>
                                <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow">
                                    <li><a href="#" className="dropdown-item">Some action </a></li>
                                    <li><a href="#" className="dropdown-item">Some other action</a></li>
                                    <li className="dropdown-divider" />
                                    {/* Level two dropdown*/}
                                    <li className="dropdown-submenu dropdown-hover">
                                        <a id="dropdownSubMenu2" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">Hover for action</a>
                                        <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
                                            <li>
                                                <a tabIndex={-1} href="#" className="dropdown-item">level 2</a>
                                            </li>
                                            {/* Level three dropdown*/}
                                            <li className="dropdown-submenu">
                                                <a id="dropdownSubMenu3" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">level 2</a>
                                                <ul aria-labelledby="dropdownSubMenu3" className="dropdown-menu border-0 shadow">
                                                    <li><a href="#" className="dropdown-item">3rd level</a></li>
                                                    <li><a href="#" className="dropdown-item">3rd level</a></li>
                                                </ul>
                                            </li>
                                            {/* End Level three */}
                                            <li><a href="#" className="dropdown-item">level 2</a></li>
                                            <li><a href="#" className="dropdown-item">level 2</a></li>
                                        </ul>
                                    </li>
                                    {/* End Level two */}
                                </ul>
                            </li>
                        </ul>
                    </div>
                    {/* Right navbar links */}
                    <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">

                        <li>
                            <div className='flag'>
                                <div title='Việt Nam' onClick={() => this.handleChangeLanguage(utils.LANGUAGES.VI)} className={language === utils.LANGUAGES.VI ? 'vi active' : 'vi'}></div>
                                <div title='English' onClick={() => this.handleChangeLanguage(utils.LANGUAGES.EN)} className={language === utils.LANGUAGES.EN ? 'en active' : 'en'}></div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="btn btn-logout" onClick={processLogout}>
                                <i title={language === 'vi' ? 'Đăng xuất' : 'Log out'} className="fas fa-sign-out-alt cus-sign-out"></i>
                            </div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguage: (data) => dispatch(actions.changeLanguage(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
